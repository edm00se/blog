<template>
  <Layout>
    <div class="post-title">
      <h1 class="post-title__text">{{ $page.post.title }}</h1>

      <PostMeta :post="$page.post"/>
    </div>

    <div class="post content-box">
      <div class="post__header">
        <g-image alt="Cover image" v-if="$page.post.cover_image" :src="$page.post.cover_image"/>
      </div>

      <div class="post__content" v-html="$page.post.content"/>

      <div class="post__footer">
        <PostTags :post="$page.post"/>
      </div>
    </div>

    <div v-if="isProd" class="post-comments">
      <vue-disqus shortname="em-devblog" :identifier="$page.post.title"></vue-disqus>
    </div>

    <Author class="post-author"/>
  </Layout>
</template>

<script>
import PostMeta from '~/components/PostMeta';
import PostTags from '~/components/PostTags';
import Author from '~/components/Author.vue';

export default {
  components: {
    Author,
    PostMeta,
    PostTags
  },
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        {
          name: 'description',
          content: this.$page.post.description
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://github.githubassets.com/assets/gist-embed-123720f37c57ce9a8f29de081c38ed61.css'
            // 'https://unpkg.com/github-syntax-light@0.5.0/lib/github-light.css'
            // 'https://unpkg.com/github-syntax-dark@0.5.0/lib/github-dark.css'
        } // TODO: switch to local styles, to accomodate for dark/light theme
      ]
    };
  },
  computed: {
    isProd: function() {
      return process.env.NODE_ENV !== 'development';
    }
  },
  mounted() {
    require(`prismjs/themes/prism${window.__theme == 'dark' ? '-dark' : ''}.css`);
    
    // only load twitter embed script if twitter content detected
    if (this.$page.post.content.includes('https://twitter.com')) {
      // twitter embed script: until gridsome-plugin-remark-twitter is fixed
      /* eslint-disable */
      (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0],
          t = window.twttr || {};
        if (d.getElementById(id)) return t.widgets.load();
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);
        t._e = [];
        t.ready = function(f) {
          t._e.push(f);
        };
        return t;
      })(document, 'script', 'twitter-wjs');
      /* eslint-enable */
    }
  }
};
</script>

<page-query>
query Post ($id: ID!) {
  post: post (id: $id) {
    title
    path
    date (format: "D. MMMM YYYY")
    timeToRead
    tags {
      id
      title
      path
    }
    description
    content
    cover_image (width: 860, blur: 10)
  }
}
</page-query>

<style lang="scss">
.post-title {
  padding: calc(var(--space) / 2) 0 calc(var(--space) / 2);
  text-align: center;
}

.post {

  &__header {
    width: calc(100% + var(--space) * 2);
    margin-left: calc(var(--space) * -1);
    margin-top: calc(var(--space) * -1);
    margin-bottom: calc(var(--space) / 2);
    overflow: hidden;
    border-radius: var(--radius) var(--radius) 0 0;

    img {
      width: 100%;
    }

    &:empty {
      display: none;
    }
  }

  &__content {
    h2:first-child {
      margin-top: 0;
    }

    p:first-of-type {
      font-size: 1.2em;
      color: var(--title-color);
    }

    img {
      width: calc(100% + var(--space) * 2);
      margin-left: calc(var(--space) * -1);
      display: block;
      max-width: none;
    }

    img.skinny {
      width: auto;
      height: auto;
      margin-left: auto;
      margin-right: auto;
    }

    img + em,
    img + noscript + em {
      text-align: center;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    table {
      margin-bottom: 1rem;
      margin-left: auto;
      margin-right: auto;
    }
    table, th, td {
      border: 1px solid var(--body-color);
      padding: 5px;
      text-align: left;
    }

    twitter-widget {
      margin-left: auto;
      margin-right: auto;
    }

    pre>code {
      font-family:'Courier New', Courier, monospace;
      background-color: initial;
      border: initial;
      word-wrap: break-word;
      word-break: break-all;
      white-space: pre-wrap;
    }

    .gist td {
      border: inherit;
    }
  }
}

.post-comments {
  padding: calc(var(--space) / 2);

  &:empty {
    display: none;
  }
}

.post-author {
  margin-top: calc(var(--space) / 2);
}
</style>
