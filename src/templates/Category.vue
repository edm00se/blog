<template>
  <Layout>
    <h1 class="tag-title text-center space-bottom">
      {{ $page.category.title }} /
    </h1>

    <div class="posts">
      <PostCard v-for="edge in $page.category.belongsTo.edges" :key="edge.node.id" :post="edge.node"/>
    </div>
  </Layout>
</template>

<page-query>
query Category ($id: ID!) {
  category (id: $id) {
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
      title: `'${this.$page.category.title}' posts`
    };
  }
}
</script>

<style lang="scss">

</style>

