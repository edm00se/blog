<template>
  <Layout>
    <h1 class="tag-title text-center space-bottom">
      <font-awesome :icon="['fas', 'link']"/> {{ $page.series.title }} <font-awesome :icon="['fas', 'link']"/>
    </h1>

    <div class="posts">
      <PostCard v-for="edge in $page.series.belongsTo.edges" :key="edge.node.id" :post="edge.node"/>
    </div>
  </Layout>
</template>

<page-query>
query Series ($id: ID!) {
  series (id: $id) {
    title
    belongsTo {
      edges {
        node {
          ...on Post {
            title
            path
            date (format: "D. MMMM YYYY")
            timeToRead
            description
            content
          }
        }
      }
    }
  }
}
</page-query>

<script>
import Author from '~/components/Author.vue'
import PostCard from '~/components/PostCard.vue'

export default {
  components: {
    Author,
    PostCard
  },
  metaInfo() {
    return {
      title: `'${this.$page.series.title}' posts`
    };
  }
}
</script>

<style lang="scss">
svg.svg-inline--fa {
  width: auto;
  height: 1em;
}
</style>

