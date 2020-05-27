<template>
  <Layout>

    <header>
      <div class="max-w-xl md:max-w-3xl xl:max-w-4xl mx-auto text-center px-6 py-10 md:py-32 border-b border-gray-300">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-sans font-bold mb-1">
          <font-awesome :icon="['fas', 'tags']" :class="'w-5 sm:w-6 fill-current mx-auto mb-1'" size="3x" />
          Tags
        </h1>
      </div>
    </header>
    
    <tag-item v-for="edge in tagsByCount" :key="edge.node.title" :tag="edge.node" />
    
  </Layout>
</template>

<script>
import config from '~/../gridsome.config.js'
import TagItem from '@/components/TagItem'

export default {
  components: {
    TagItem
  },
  metaInfo () {
    return {
      title: this.config.siteName,
      meta: [
        { property: "og:type", content: 'website' },
        { property: "og:title", content: this.config.siteName },
        { property: "og:description", content: this.config.siteDescription },
        { property: "og:url", content: this.config.siteUrl },
        { property: "og:image", content: this.ogImageUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: this.config.siteName },
        { name: "twitter:description", content: this.config.siteDescription },
        { name: "twitter:site", content: "@edm00se" },
        { name: "twitter:creator", content: "@edm00se" },
        { name: "twitter:image", content: this.ogImageUrl },
      ],
    }
  },
  computed: {
    config () {
      return config;
    },
    tagsByCount () {
      return this.$page.tags.edges.sort((a, b) => a.node.belongsTo.totalCount < b.node.belongsTo.totalCount)
    }
  }
}
</script>

<page-query>
  query Tags {
    tags: allTag {
      edges {
        node {
          title
          path
          belongsTo(filter:{typeName:{eq:Post}}){
            totalCount
          }
        }
      }
    }
  }
</page-query>

<style></style>
