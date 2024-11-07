// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '雙龍體育支援中心',
  tagline: '雙龍體育支援中心',
  url: 'https://www.ssangyongsports.eu.org/support',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'https://i.imgur.com/CfQiMkp.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ssangyongsportsorg', // Usually your GitHub org/user name.
  projectName: 'ssport-site', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
   i18n: {
    defaultLocale: 'zh-tw',
    locales: ['zh-tw'],
  },
 
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: {
          showReadingTime: true,

          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.         
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
                },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        hideOnScroll: true,
        
        logo: {
          alt: '雙龍體育 Logo',
          src: 'https://img.ssangyongsports.eu.org/logo2.png',
        className: 'custom-navbar-logo-class',
             },
        items: [
           {
            href: 'https://www.ssangyongsports.org/',
            label: '回首頁',
            position: 'left',
          },
        ],
      },
              announcementBar: {
      id: 'announcementBar-2',
      content:
        '新年快樂2023',
      backgroundColor: '#84C1FF',
      textColor: '#091E42',
      isCloseable: false,
    },
          algolia: {
      apiKey: "c2e792c2e75fe1dd3e40574f8b4c9a80",
      indexName: "help",
      appId: "70GEOCJCSX",
      // Optional: see doc section bellow
      contextualSearch: true,

      // Optional: Algolia search parameters
      searchParameters: {},

      //... other Algolia params
    },
  
  
      footer: {
        style: 'dark',
        logo: {
        alt: '雙龍體育',
        src: 'https://img.ssangyongsports.eu.org/logo2.png',
        href: '/',
        width: 160,
        height: 51,
      },
        links: [
          {
          title: '體育',
            items: [
              {
                  label: '雙龍職棒',
                  href: 'https://slbtw.cf',
              },
              {
                label: '雙龍職籃',
                href: 'https://sbatw.ml',
              },
              {
                label: '雙龍足球',
                href: '/',
              },
            ],
          },
          {
           title: '組織',
            items: [
              {
                label: 'blog',
                href: '/blog',
              },
              {
                label: '狀態',
                href: 'https://status.ssangyongsports.eu.org/',
              },              
            ],
          },
          {
            title: '幫助',
            items: [
              {
                label: '幫助',
                href: 'https://help.ssangyongsports.eu.org/',
              },
              {
                label: '社區',
                href: 'https://discuss.ssangyongsports.eu.org/',
              },
              {
                label: '聯繫',
            href: 'https://ssangyongsports.eu.org/c',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 雙龍體育, org. 維護團隊：雙龍體育.`,
      },
       prism: {
        theme: lightCodeTheme,
        darkTheme: lightCodeTheme
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false
      },
    }),
};

module.exports = config;
