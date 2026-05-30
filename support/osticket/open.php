<?php
/*********************************************************************
    open.php

    New tickets handle.

    Peter Rotich <peter@osticket.com>
    Copyright (c)  2006-2013 osTicket
    http://www.osticket.com

    Released under the GNU General Public License WITHOUT ANY WARRANTY.
    See LICENSE.TXT for details.

    vim: expandtab sw=4 ts=4 sts=4:
**********************************************************************/
require('client.inc.php');
define('SOURCE','Web'); //Ticket source.
$ticket = null;
$errors=array();
$prefillVars = array();
$prefillKeys = array('topicId', 'subject', 'message');

if (strtoupper($_SERVER['REQUEST_METHOD'] ?: 'GET') !== 'POST') {
    if (isset($_GET['tickettopic']) && preg_match('/^\d+$/', $_GET['tickettopic'])
            && Topic::lookup($_GET['tickettopic'])) {
        $prefillVars['topicId'] = intval($_GET['tickettopic']);
    }
    if (isset($_GET['subject'])) {
        $prefillVars['subject'] = trim((string)$_GET['subject']);
    }
    if (isset($_GET['description'])) {
        $prefillVars['message'] = trim((string)$_GET['description']);
    }
    if ($prefillVars) {
        $_SESSION['open:prefill'] = array_intersect_key($prefillVars, array_flip($prefillKeys));
    }
    else {
        // Plain /open.php visits should start with an empty form. Previously the
        // last query-string prefill was kept in the session, so every later visit
        // showed the old OAuth error subject again.
        unset($_SESSION['open:prefill']);
    }
}
elseif (!empty($_SESSION['open:prefill'])) {
    $prefillVars = (array) $_SESSION['open:prefill'];
}


$turnstileSiteKey = getenv('TURNSTILE_SITE_KEY') ?: '0x4AAAAAACpES4Mpx7oJsaTc';
$turnstileSecretKey = getenv('TURNSTILE_SECRET_KEY') ?: '0x4AAAAAACpES0TgS_umpieWpTwDnYJTZVg';

function getClientIpAddress() {
    if (!empty($_SERVER['HTTP_CF_CONNECTING_IP']))
        return trim($_SERVER['HTTP_CF_CONNECTING_IP']);
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
        return trim(explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0]);
    return trim($_SERVER['REMOTE_ADDR'] ?: '0.0.0.0');
}

function verifyTurnstileToken($secret, $token, $ip='') {
    if (!$secret || !$token)
        return false;

    $post = http_build_query(array(
        'secret' => $secret,
        'response' => $token,
        'remoteip' => $ip,
    ));

    $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $resp = curl_exec($ch);
    curl_close($ch);

    if (!$resp) return false;
    $json = json_decode($resp, true);
    return !empty($json['success']);
}

function isIpRateLimitedForTicket($ip) {
    $ip = db_input($ip);
    $sql = 'SELECT COUNT(*) AS total FROM '.TICKET_TABLE
        ." WHERE ip_address='".$ip."' AND created >= DATE_SUB(NOW(), INTERVAL 10 MINUTE)";
    if (!($res = db_query($sql)))
        return false;
    $row = db_fetch_array($res);
    return ((int)$row['total'] >= 2);
}

if (!$thisclient && isset($_GET['do']) && $_GET['do'] === 'login') {
    $destParams = $_GET;
    unset($destParams['do']);
    $dest = ROOT_PATH.'open.php';
    if (!empty($destParams))
        $dest .= '?'.Http::build_query($destParams);

    if (!empty($prefillVars))
        $_SESSION['open:prefill'] = $prefillVars;

    // Dedicated return target for open.php flow
    $_SESSION['open:return_to'] = $dest;
    $_SESSION['_client']['auth']['dest'] = $dest;

    Http::redirect('login.php?do=ext&bk=oauth2.user.p1i1');
}

if ($_POST) {
    $vars = $_POST;
    if (!empty($_SESSION['open:prefill'])) {
        foreach ((array) $_SESSION['open:prefill'] as $k => $v) {
            if ((!isset($vars[$k]) || $vars[$k] === '') && in_array($k, $prefillKeys))
                $vars[$k] = $v;
        }
    }
    $vars['deptId']=$vars['emailId']=0; //Just Making sure we don't accept crap...only topicId is expected.
    $clientIp = getClientIpAddress();

    if (isIpRateLimitedForTicket($clientIp)) {
        $errors['err'] = '同一 IP 10 分鐘內最多只能建立 2 筆工單，請稍後再試。';
    }

    if (!$errors && $turnstileSiteKey && $turnstileSecretKey) {
        $turnstileToken = $_POST['cf-turnstile-response'] ?: '';
        if (!verifyTurnstileToken($turnstileSecretKey, $turnstileToken, $clientIp)) {
            $errors['err'] = 'Turnstile 驗證失敗，請重新驗證後再送出。';
        }
    }

    if ($thisclient) {
        $vars['uid']=$thisclient->getId();
    } elseif($cfg->isCaptchaEnabled()) {
        if(!$_POST['captcha'])
            $errors['captcha']='請輸入圖片中的驗證碼';
        elseif(strcmp($_SESSION['captcha'], md5(strtoupper($_POST['captcha']))))
            $errors['captcha']='驗證碼錯誤 - 請再試一次！';
    }

    $tform = TicketForm::objects()->one()->getForm($vars);
    $messageField = $tform->getField('message');
    $attachments = $messageField->getWidget()->getAttachments();
    if (!$errors) {
        $vars['message'] = $messageField->getClean();
        if ($messageField->isAttachmentsEnabled())
            $vars['files'] = $attachments->getFiles();
    }

    // Drop the draft.. If there are validation errors, the content
    // submitted will be displayed back to the user
    Draft::deleteForNamespace('ticket.client.'.substr(session_id(), -12));
    //Ticket::create...checks for errors..
    if (($ticket=Ticket::create($vars, $errors, SOURCE))){
        $msg='支援工單已成功建立';
        // Drop session-backed form data
        unset($_SESSION[':form-data']);
        //Logged in...simply view the newly created ticket.
        if ($thisclient && $thisclient->isValid()) {
            // Regenerate session id
            $thisclient->regenerateSession();
            @header('Location: tickets.php?id='.$ticket->getId());
        } else
            $ost->getCSRF()->rotate();
    }else{
        $errors['err'] = $errors['err'] ?: '無法建立工單。請修正下方錯誤後再試一次。';
    }
}

//page
$nav->setActiveNav('new');
if ($cfg->isClientLoginRequired()) {
    if ($cfg->getClientRegistrationMode() == 'disabled') {
        Http::redirect('view.php');
    }
    elseif (!$thisclient) {
        require_once 'secure.inc.php';
    }
    elseif ($thisclient->isGuest()) {
        require_once 'login.php';
        exit();
    }
}

require(CLIENTINC_DIR.'header.inc.php');
if ($ticket
    && (
        (($topic = $ticket->getTopic()) && ($page = $topic->getPage()))
        || ($page = $cfg->getThankYouPage())
    )
) {
    // Thank the user and promise speedy resolution!
    echo Format::viewableImages(
        $ticket->replaceVars(
            $page->getLocalBody()
        ),
        ['type' => 'P']
    );
}
else {
    require(CLIENTINC_DIR.'open.inc.php');
}
require(CLIENTINC_DIR.'footer.inc.php');
?>
