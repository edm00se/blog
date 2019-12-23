// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Dev | Blog',
  siteDescription:
    'software development, operations, tooling, and musings on technology',

  templates: {
    Post: '/:title',
    Tag: '/tag/:id'
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
          }
        },
        remark: {
          plugins: [
            'remark-attr',
            [ 'gridsome-plugin-remark-codesandbox' ],
            [
              '@noxify/gridsome-plugin-remark-embed',
              {
                enabledProviders: ['Youtube', 'Twitter', 'Gist', 'JSFiddle']
              }
            ]
          ]
        }
      }
    }
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: ['@gridsome/remark-prismjs']
    }
  }
};
