// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const paramCase = require('param-case');

module.exports = {
  siteName: 'Dev | Blog',
  siteDescription:
    'software development, operations, tooling, and musings on technology',
  siteUrl: 'https://edm00se.io',
  icon: './src/favicon.png',
  titleTemplate: '%s',

  templates: {
    Post: [{
      path: (node) => {
        return node.permalink ? node.permalink : `/${paramCase(node.title)}`;
      }
    }],
    Tag: '/tag/:id',
    Category: '/categories/:id',
    Series: '/series/:id'
  },

  plugins: [
    {
      // Create posts from markdown files
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Post',
        path: 'content/posts/*.md',
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: 'Tag',
            create: true
          },
          category: {
            typeName: 'Category',
            create: true
          },
          series: {
            typeName: 'Series',
            create: true
          }
        }
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
        exclude: ['https://gist.github.com/*'],
        config: {}
      }
    },
    {
      use: 'gridsome-plugin-flexsearch',
      options: {
        flexsearch: {
          profile: 'balance'
        },
        collections: [
          {
            typeName: 'Post',
            indexName: 'Post',
            fields: ['title', 'description', 'tags', 'date', 'path']
          }
        ],
        searchFields: ['title', 'description', 'tags']
      }
    },
    {
      use: 'gridsome-plugin-gtag',
      options: {
        config: {
          id: process.env.GRIDSOME_ANALYTICS_ID
        }
      }
    },
    {
      use: 'gridsome-plugin-feed',
      options: {
        contentTypes: ['Post'],
        feedOptions: {
          title: `Eric McCormick's Dev Blog`,
          description: 'software development, operations, tooling, and tech musings',
          copyright: `Copyright 2014–${new Date().getFullYear()} Eric McCormick`,
          image:
            "https://edm00se.io/logo_600.png",
          favicon: "https://edm00se.io/logo_180.png",
          author: {
            name: "Eric McCormick",
            link: "https://edm00se.codes/"
          }
        },
        rss: {
          enabled: true,
          output: '/rss.xml'
        },
        atom: {
          enabled: true,
          output: '/feed.atom'
        },
        json: {
          enabled: true,
          output: '/feed.json'
        },
        maxItems: 25,
        htmlFields: null,
        enforceTrailingSlashes: false,
        filterNodes: (node) => true
      }
    },
    {
      use: 'gridsome-plugin-manifest',
      options: {
        background_color: '#0d2538',
        icon_path: './static/logo_600.png',
        name: 'Dev | Blog',
        short_name: 'devblog',
        theme_color: '#FFFFFF',
        lang: 'en',
      },
    }
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        '@gridsome/remark-prismjs',
        'remark-attr',
        [
          '@noxify/gridsome-plugin-remark-embed',
          {
            enabledProviders: ['Youtube', 'Twitter', 'Gist', 'JSFiddle', 'CodeSandbox'],
            'JSFiddle': {
              secureConnection: true
            }
          }
        ]
      ]
    }
  }
};
