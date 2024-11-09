// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '雙龍體育幫助',
  tagline: '雙龍體育幫助中心',
  url: 'https://ssports-site-git-main-ssangyongsportsorg.vercel.app/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'https://i.imgur.com/CfQiMkp.png',

  // GitHub pages deployment config.
  organizationName: 'ssangyongsportsorg', // GitHub organization/user name
  projectName: 'ssport-site', // Repository name

  // Internationalization configuration
  i18n: {
    defaultLocale: 'zh-tw',
    locales: ['zh-tw'],
  },
 
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        blog: {
          showReadingTime: true,
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
          src: 'https://cdn.ssangyongsports.eu.org/image/https://ssangyongsports.eu.org/supportlogo.png',
          href: '/support',
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
      docs: {
        sidebar: {
        hideable: true,
        },
      },
      algolia: {
        apiKey: "c2e792c2e75fe1dd3e40574f8b4c9a80",
        indexName: "help",
        appId: "70GEOCJCSX",
        contextualSearch: true,
        searchParameters: {},
      },
      footer: {
        style: 'light',
        logo: {
          alt: '雙龍體育',
          src: 'https://cdn.ssangyongsports.eu.org/image/https://ssangyongsports.eu.org/supportlogo.png',
          href: '/support',
          width: 160,
          height: 51,
        },
        links: [
          {
            title: '體育',
            items: [
              { label: '雙龍職棒', href: 'https://slb.ssangyongsports.eu.org' },
              { label: '雙龍職籃', href: 'https://sba.ssangyongsports.eu.org' },
              { label: '雙龍足球', href: 'https://js.ssangyongsports.eu.org' },
            ],
          },
          {
            title: '組織',
            items: [
              { label: 'blog', href: 'https://ssangyongsports.eu.org/blog' },
              { label: '狀態', href: 'https://status.ssangyongsports.eu.org/' },
            ],
          },
          {
            title: '幫助',
            items: [
              { label: '幫助', href: 'https://help.ssangyongsports.eu.org/' },
              { label: '社區', href: 'https://forum.ssangyongsports.eu.org/' },
              { label: '聯繫', href: 'https://ssangyongsports.eu.org/contact' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 雙龍體育保留一切權利。`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: lightCodeTheme,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
    }),
};

module.exports = config;
