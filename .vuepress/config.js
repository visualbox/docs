module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/favicon-32x32.png' }]
  ],
  locales: {
    '/': {
      lang: 'en-US',
      title: 'VisualBox',
      description: 'Integration and visualization toolbox'
    }
  },
  serviceWorker: true,
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-136014271-1'
      }
    ]
  ],
  themeConfig: {
    repo: 'visualbox',
    docsRepo: 'visualbox/visualbox-docs',
    editLinks: true,
    lastUpdated: true,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        nav: [
          {
            text: 'Guide',
            link: '/guide/'
          },
          {
            text: 'Integrations',
            link: '/integrations/'
          },
          {
            text: 'Widgets',
            link: '/widgets/'
          },
          {
            text: 'Configuration Model',
            link: '/configmodel/'
          }
        ],
        sidebar: [
          '/',
          '/guide/'
        ]
      }
    }
  }
}
