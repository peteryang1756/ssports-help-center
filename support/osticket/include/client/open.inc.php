<?php
if(!defined('OSTCLIENTINC')) die('Access Denied!');
$info=array();
if($thisclient && $thisclient->isValid()) {
    $info=array('name'=>$thisclient->getName(),
                'email'=>$thisclient->getEmail(),
                'phone'=>$thisclient->getPhoneNumber());
}

$requestData = $_POST ? $_POST : array();
if (!$requestData && !empty($_SESSION['open:prefill']))
    $requestData = (array) $_SESSION['open:prefill'];

if (!empty($_SESSION['open:prefill'])) {
    foreach ((array) $_SESSION['open:prefill'] as $k => $v) {
        if (!isset($requestData[$k]) || $requestData[$k] === '')
            $requestData[$k] = $v;
    }
}

$info = $requestData ? array_merge($info, Format::htmlchars($requestData)) : $info;

$form = null;
if (!$info['topicId']) {
    if (array_key_exists('topicId',$_GET) && preg_match('/^\d+$/',$_GET['topicId']) && Topic::lookup($_GET['topicId']))
        $info['topicId'] = intval($_GET['topicId']);
    else
        $info['topicId'] = $cfg->getDefaultTopicId();
}

$forms = array();
if ($info['topicId'] && ($topic=Topic::lookup($info['topicId']))) {
    foreach ($topic->getForms() as $F) {
        if (!$F->hasAnyVisibleFields())
            continue;
        if ($_POST) {
            $F = $F->instanciate();
            $F->isValidForClient();
        }
        $forms[] = $F->getForm();
    }
}
?>

<style>
.zd-open-wrap { max-width: 1160px; margin: 0 auto; }
.zd-open-hero { margin: 6px 0 16px; }
.zd-open-hero h1 { margin: 0; font-size: clamp(30px, 4vw, 42px); letter-spacing: -.03em; line-height: 1.05; color: #0f172a; font-weight: 800; }
.zd-open-hero p { margin: 10px 0 0; color: #64748b; font-size: 15px; }

.zd-grid { display: grid; grid-template-columns: minmax(0,1fr) 320px; gap: 16px; align-items: start; }
.zd-panel { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 8px 24px rgba(15, 23, 42, .04); }
.zd-main { padding: 22px; }
.zd-side { padding: 16px; position: sticky; top: 86px; }

.zd-steps { display: flex; gap: 8px; margin-bottom: 14px; }
.zd-step { font-size: 12px; color: #334155; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 999px; padding: 5px 10px; }
.zd-step.active { background: #111827; color: #fff; border-color: #111827; }

.zd-section-title { font-size: 13px; text-transform: uppercase; letter-spacing: .08em; color: #64748b; margin: 18px 0 8px; font-weight: 700; }
.zd-divider { border: 0; border-top: 1px solid #eef2f7; margin: 14px 0; }
.zd-auth { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px; color: #334155; font-size: 13px; }

.zd-open-wrap label { font-weight: 600; color: #0f172a; margin-bottom: 6px; display: block; }
.zd-open-wrap .required { font-weight: 700; color: #0f172a; }
.zd-open-wrap .error, .zd-open-wrap .zd-error { color: #b91c1c; font-size: 12px; }

.zd-open-wrap input[type='text'],
.zd-open-wrap input[type='email'],
.zd-open-wrap input[type='tel'],
.zd-open-wrap input[type='password'],
.zd-open-wrap select,
.zd-open-wrap textarea {
  width: 100%;
  border: 1px solid #cbd5e1;
  background: #fff;
  border-radius: 12px;
  padding: 11px 12px;
  font-size: 14px;
  color: #0f172a;
  box-sizing: border-box;
}
.zd-open-wrap textarea { min-height: 140px; }
.zd-open-wrap input:focus,
.zd-open-wrap select:focus,
.zd-open-wrap textarea:focus {
  border-color: #111827;
  outline: 2px solid rgba(15,23,42,.08);
}

.zd-open-wrap table { width: 100% !important; }
.zd-open-wrap td { padding: 8px 0; vertical-align: top; }
.zd-open-wrap .captcha img { border-radius: 8px; border: 1px solid #e2e8f0; }
.zd-note { margin: 6px 0 0; color: #64748b; font-size: 12px; }

.zd-actions { margin-top: 16px; display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }
.zd-btn { border-radius: 10px; padding: 10px 14px; border: 1px solid #cbd5e1; background: #fff; color: #0f172a; font-size: 14px; }
.zd-btn-primary { background: #111827; border-color: #111827; color: #fff; }

.zd-side h3 { margin: 0 0 8px; font-size: 14px; }
.zd-side ul { margin: 0; padding-left: 18px; color: #475569; font-size: 13px; line-height: 1.6; }
.zd-side .meta { margin-top: 12px; padding-top: 10px; border-top: 1px solid #eef2f7; font-size: 12px; color: #64748b; }

@media (max-width: 960px) {
  .zd-grid { grid-template-columns: 1fr; }
  .zd-side { position: static; }
}
</style>

<div class="zd-open-wrap">
  <div class="zd-open-hero">
    <h1><?php echo '提交支援請求'; ?></h1>
    <p><?php echo '請描述您遇到的問題。提供越完整的細節，我們就能越快協助您處理。'; ?></p>
  </div>

  <div class="zd-grid">
    <section class="zd-panel zd-main">
      <div class="zd-steps">
        <span class="zd-step active"><?php echo '1. 填寫內容'; ?></span>
        <span class="zd-step"><?php echo '2. 確認資料'; ?></span>
        <span class="zd-step"><?php echo '3. 送出'; ?></span>
      </div>

      <form id="ticketForm" method="post" action="open.php<?php echo !empty($_SERVER['QUERY_STRING']) ? '?'.Format::htmlchars($_SERVER['QUERY_STRING']) : ''; ?>" enctype="multipart/form-data">
        <?php csrf_token(); ?>
        <input type="hidden" name="a" value="open">
        <input type="hidden" name="prefill_topicId" value="<?php echo Format::htmlchars($info['topicId']); ?>">
        <input type="hidden" name="prefill_subject" value="<?php echo Format::htmlchars($info['subject']); ?>">
        <input type="hidden" name="prefill_message" value="<?php echo Format::htmlchars($info['message']); ?>">

        <?php if (!$thisclient) { ?>
            <div class="zd-auth" style="margin-bottom:12px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;">
              <div>
                <strong>已經有雙龍體育帳號？</strong><br>
                <span style="font-size:12px;color:#64748b;">可先登入雙龍體育自動帶入資料，或直接填寫以下欄位送出。</span>
              </div>
              <a class="zd-btn zd-btn-primary" href="open.php?<?php
                $loginParams = array(
                  'do' => 'login',
                  'tickettopic' => $info['topicId'],
                  'subject' => $info['subject'],
                  'description' => $info['message'],
                );
                echo Http::build_query(array_filter($loginParams, function($v) { return $v !== null && $v !== ''; }));
              ?>">登入雙龍體育</a>
            </div>
            <?php
            $uform = UserForm::getUserForm()->getForm($requestData);
            if ($_SERVER['REQUEST_METHOD'] === 'POST') $uform->isValid(); ?>
            <div class="zd-section-title"><?php echo '您的資料'; ?></div>
            <?php $uform->render(array('staff' => false, 'mode' => 'create')); ?>
        <?php } else { ?>
            <div class="zd-auth">
              <strong><?php echo '目前登入身分'; ?></strong><br>
              <?php echo Format::htmlchars($thisclient->getName()); ?> · <?php echo $thisclient->getEmail(); ?>
            </div>
        <?php } ?>

        <hr class="zd-divider">
        <div class="zd-section-title"><?php echo '工單內容'; ?></div>

        <div style="margin-bottom:10px;">
          <label for="topicId"><?php echo '問題分類'; ?> <span style="color:#b91c1c">*</span></label>
          <select id="topicId" name="topicId" onchange="javascript:
                  var data = $(':input[name]', '#dynamic-form').serialize();
                  $.ajax(
                    'ajax.php/form/help-topic/' + this.value,
                    {
                      data: data,
                      dataType: 'json',
                      success: function(json) {
                        $('#dynamic-form').empty().append(json.html);
                        $(document.head).append(json.media);
                        if (typeof window.translateOpenForm === 'function') {
                          window.translateOpenForm();
                        }
                        if (typeof window.applyOpenPrefill === 'function') {
                          setTimeout(function(){ window.applyOpenPrefill(true); }, 50);
                          setTimeout(function(){ window.applyOpenPrefill(true); }, 500);
                          setTimeout(function(){ window.applyOpenPrefill(true); }, 1500);
                        }
                      }
                    });">
              <option value="" selected="selected">&mdash; <?php echo '請選擇問題分類';?> &mdash;</option>
              <?php
              if($topics=Topic::getPublicHelpTopics()) {
                  foreach($topics as $id =>$name) {
                      echo sprintf('<option value="%d" %s>%s</option>',
                              $id, ($info['topicId']==$id)?'selected="selected"':'', $name);
                  }
              } ?>
          </select>
          <span class="zd-error"><?php echo $errors['topicId']; ?></span>
        </div>

        <div id="dynamic-form">
            <?php
            $options = array('mode' => 'create');
            foreach ($forms as $form) {
                include(CLIENTINC_DIR . 'templates/dynamic-form.tmpl.php');
            } ?>
        </div>

        <?php if (!empty($turnstileSiteKey)) { ?>
          <hr class="zd-divider">
          <div class="zd-section-title">人機驗證</div>
          <div style="margin-bottom:10px;">
            <div class="cf-turnstile" data-sitekey="<?php echo Format::htmlchars($turnstileSiteKey); ?>"></div>
          </div>
        <?php } ?>

        <?php
        if($cfg && $cfg->isCaptchaEnabled() && (!$thisclient || !$thisclient->isValid())) {
            if($_POST && $errors && !$errors['captcha'])
                $errors['captcha']='請再次輸入驗證碼';
            ?>
          <hr class="zd-divider">
          <div class="zd-section-title"><?php echo '驗證'; ?></div>
          <div>
            <label for="captcha"><?php echo '驗證碼';?> <span style="color:#b91c1c">*</span></label>
            <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
              <span class="captcha"><img src="captcha.php" border="0" alt="captcha"></span>
              <input id="captcha" type="text" name="captcha" size="8" autocomplete="off" style="max-width:170px;">
            </div>
            <p class="zd-note"><?php echo '請輸入圖片中顯示的文字。';?></p>
            <span class="zd-error"><?php echo $errors['captcha']; ?></span>
          </div>
        <?php } ?>

        <div class="zd-actions">
          <input class="zd-btn" type="reset" name="reset" value="<?php echo '重設';?>">
          <input class="zd-btn" type="button" name="cancel" value="<?php echo '取消'; ?>" onclick="javascript:
              $('.richtext').each(function() {
                  var redactor = $(this).data('redactor');
                  if (redactor && redactor.opts.draftDelete)
                      redactor.plugin.draft.deleteDraft();
              });
              window.location.href='index.php';">
          <input class="zd-btn zd-btn-primary" type="submit" value="<?php echo '建立工單';?>">
        </div>
      </form>
    </section>

    <aside class="zd-panel zd-side">
      <h3><?php echo '加速處理的小建議'; ?></h3>
      <ul>
        <li><?php echo '請提供完整錯誤訊息，以及您原本預期的結果。'; ?></li>
        <li><?php echo '可行時請附上截圖或螢幕錄影。'; ?></li>
        <li><?php echo '若為緊急問題，請說明影響範圍與受影響使用者。'; ?></li>
      </ul>
      <div class="meta">
        <?php echo '一般首次回覆時間'; ?>: <strong style="color:#0f172a"><?php echo '1 個工作天內'; ?></strong>
      </div>
    </aside>
  </div>
</div>

<script>
(function(){
  const map = {
    'Contact Information': '聯絡資料',
    'Email Address': '電子郵件',
    'Full Name': '姓名',
    'Phone Number': '電話號碼',
    'Ext:': '分機：',
    'Issue Summary': '問題摘要',
    'Details on the reason(s) for opening the ticket.': '請說明您建立此工單的原因與詳細情況。',
    'Please Describe Your Issue': '請描述您遇到的問題',
    'Drag and drop files here': '將檔案拖曳到這裡',
    'or click to browse': '或點擊選擇檔案',
    'Drop files here': '將檔案拖放到此處'
  };

  function replaceTextNode(node) {
    const t = node.nodeValue;
    if (!t || !t.trim()) return;
    let out = t;
    Object.keys(map).forEach(function(k){
      out = out.replaceAll(k, map[k]);
    });
    if (out !== t) node.nodeValue = out;
  }

  window.translateOpenForm = function(){
    const root = document.getElementById('ticketForm') || document.body;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(replaceTextNode);

    root.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(function(el){
      const p = el.getAttribute('placeholder');
      if (!p) return;
      let out = p;
      Object.keys(map).forEach(function(k){ out = out.replaceAll(k, map[k]); });
      if (out !== p) el.setAttribute('placeholder', out);
    });
  };

  document.addEventListener('DOMContentLoaded', window.translateOpenForm);
  setTimeout(window.translateOpenForm, 80);
})();
</script>


<script>
(function(){
  var PREFILL_STORAGE_KEY = 'ssy:open-prefill:v1';

  function readStoredPrefill() {
    try {
      var raw = window.localStorage && localStorage.getItem(PREFILL_STORAGE_KEY);
      if (!raw) return {};
      var data = JSON.parse(raw);
      if (!data || !data.ts || Date.now() - data.ts > 60 * 60 * 1000) return {};
      return data;
    } catch(e) { return {}; }
  }

  function rememberPrefill(topic, subject, message) {
    if (!subject && !message) return;
    try {
      localStorage.setItem(PREFILL_STORAGE_KEY, JSON.stringify({
        ts: Date.now(),
        topic: topic || '',
        subject: subject || '',
        message: message || ''
      }));
    } catch(e) {}
  }

  function getPrefillData() {
    var topic = document.querySelector('input[name="prefill_topicId"]')?.value || '';
    var subject = document.querySelector('input[name="prefill_subject"]')?.value || '';
    var message = document.querySelector('input[name="prefill_message"]')?.value || '';
    var stored = readStoredPrefill();
    subject = subject || stored.subject || '';
    message = message || stored.message || '';
    topic = topic || stored.topic || '';
    rememberPrefill(topic, subject, message);
    return { topic: topic, subject: subject, message: message };
  }

  function setFieldValue(el, value, force) {
    if (!el || !value) return;
    if (el.dataset && el.dataset.openUserModified === '1') return;

    var current = (el.value || '').trim();
    var wanted = (value || '').trim();
    var wasAutoPrefilled = el.dataset && el.dataset.openPrefilled === '1';
    if (!force && current && !wasAutoPrefilled) return;
    if (current === wanted && wasAutoPrefilled) return;

    el.value = value;
    if (el.dataset) el.dataset.openPrefilled = '1';
    try { el.dispatchEvent(new Event('input', { bubbles: true })); } catch(e) {}
    try { el.dispatchEvent(new Event('change', { bubbles: true })); } catch(e) {}
  }

  function protectField(el) {
    if (!el || (el.dataset && el.dataset.openPrefillProtected === '1')) return;
    if (el.dataset) el.dataset.openPrefillProtected = '1';
    ['input', 'change', 'keydown', 'paste'].forEach(function(type) {
      el.addEventListener(type, function(event) {
        if (event && event.isTrusted && el.dataset && el.dataset.openPrefilled === '1') {
          el.dataset.openUserModified = '1';
        }
      }, { passive: true });
    });
  }

  function uniqueFields(fields) {
    var seen = [];
    return fields.filter(function(el) {
      if (!el || seen.indexOf(el) !== -1) return false;
      seen.push(el);
      return true;
    });
  }

  function findSubjectFields(root) {
    if (!root) return [];
    var fields = [];

    // Prefer the field whose label is Issue Summary / 問題摘要. This is more
    // reliable after OAuth redirects because logged-in forms no longer include
    // the contact-information fields, and osTicket dynamic field names are hashes.
    var labels = Array.prototype.slice.call(root.querySelectorAll('label'));
    labels.forEach(function(label) {
      var text = (label.textContent || '').replace(/\s+/g, ' ').trim();
      if (!/(Issue Summary|問題摘要|Summary|Subject|主旨|摘要)/i.test(text)) return;
      var id = label.getAttribute('for');
      var byId = id && document.getElementById(id);
      if (byId && byId.matches('input[type="text"], input:not([type]), textarea')) fields.push(byId);
      var near = label.parentElement && label.parentElement.querySelector('input[type="text"], input:not([type]), textarea');
      if (near) fields.push(near);
      var row = label.closest('tr, .form-field, .field, div');
      var inRow = row && row.querySelector('input[type="text"], input:not([type]), textarea');
      if (inRow) fields.push(inRow);
    });

    if (!fields.length) {
      var allText = Array.prototype.slice.call(root.querySelectorAll('input[type="text"], input:not([type])'));
      // Avoid contact fields if present in anonymous form.
      fields = allText.filter(function(el) {
        var name = (el.name || '').toLowerCase();
        var id = (el.id || '').toLowerCase();
        var ac = (el.autocomplete || '').toLowerCase();
        var label = '';
        if (el.id) { try { label = (document.querySelector('label[for="' + (window.CSS && CSS.escape ? CSS.escape(el.id) : el.id.replace(/"/g, '\"')) + '"]')?.textContent || '').toLowerCase(); } catch(e) {} }
        return !/(email|mail|name|phone|tel|姓名|電子|電話)/i.test(name + ' ' + id + ' ' + ac + ' ' + label);
      });
      if (!fields.length && allText.length) fields = [allText[allText.length - 1]];
    }

    return uniqueFields(fields);
  }

  function applyPrefill(force) {
    var data = getPrefillData();
    var subject = data.subject || '';
    var message = data.message || '';
    var dynForm = document.getElementById('dynamic-form');
    if (!dynForm) return;

    // Force on initial/server-provided prefill so OAuth login callbacks keep the
    // query-string/session/localStorage value instead of an empty osTicket draft value.
    var shouldForce = !!force || /[?&](subject|description)=/i.test(window.location.search) || !!readStoredPrefill().subject;

    if (subject) {
      findSubjectFields(dynForm).forEach(function(subjectEl) {
        protectField(subjectEl);
        setFieldValue(subjectEl, subject, shouldForce);
      });
    }

    // Message: textarea inside #dynamic-form (may be richtext/Redactor)
    if (message) {
      var msgEl = dynForm.querySelector('textarea');
      if (msgEl) {
        protectField(msgEl);
        setFieldValue(msgEl, message, shouldForce);
        // If Redactor already initialized, update via its API
        var $msg = window.jQuery && jQuery(msgEl);
        if ($msg && $msg.data && $msg.data('redactor')) {
          try {
            var r = $msg.data('redactor');
            var plain = r.code && r.code.get ? r.code.get().replace(/<[^>]*>/g,'').trim() : '';
            if (r.code && (shouldForce || !plain || msgEl.dataset.openPrefilled === '1')) {
              r.code.set('<p>' + message.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>') + '</p>');
              if (msgEl.dataset) msgEl.dataset.openPrefilled = '1';
            }
          } catch(e) {}
        }
      }
    }
  }
  window.applyOpenPrefill = applyPrefill;
  document.addEventListener('DOMContentLoaded', function(){ applyPrefill(true); });
  setTimeout(function(){ applyPrefill(true); }, 50);
  setTimeout(function(){ applyPrefill(true); }, 400);
  setTimeout(function(){ applyPrefill(true); }, 1200);
  setTimeout(function(){ applyPrefill(true); }, 2500);
  setTimeout(function(){ applyPrefill(true); }, 5000);

  // OAuth / osTicket dynamic forms can initialize drafts after page load and
  // clear the field again. Keep the server-provided prefill alive until the
  // user actually types in the field.
  var started = Date.now();
  var keeper = setInterval(function(){
    applyPrefill(true);
    if (Date.now() - started > 30000) clearInterval(keeper);
  }, 500);
  var dyn = document.getElementById('dynamic-form');
  if (dyn && window.MutationObserver) {
    new MutationObserver(function(){ applyPrefill(true); }).observe(dyn, { childList: true, subtree: true });
  }
})();
</script>

<script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" async defer></script>
<script>
(function(){
  function renderTurnstileSafe(){
    var box = document.querySelector('.cf-turnstile');
    if (!box) return;
    if (box.dataset.rendered === '1') return;
    if (window.turnstile && typeof window.turnstile.render === 'function') {
      try {
        window.turnstile.render(box, { sitekey: box.getAttribute('data-sitekey') });
        box.dataset.rendered = '1';
      } catch(e) {}
    }
  }
  document.addEventListener('DOMContentLoaded', renderTurnstileSafe);
  document.addEventListener('turbo:load', renderTurnstileSafe);
  setTimeout(renderTurnstileSafe, 300);
  setTimeout(renderTurnstileSafe, 1200);
})();
</script>
