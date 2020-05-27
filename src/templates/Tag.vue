<template>
  <Layout>
    <h1 class="tag-title text-center space-bottom">
      <font-awesome :icon="['fas', 'tag']" :class="'w-5 sm:w-6 fill-current mx-auto mb-1'" size="3x" />
       {{ $page.tag.title }}
    </h1>

    <div class="posts">
      <PostCard v-for="edge in $page.tag.belongsTo.edges" :key="edge.node.id" :post="edge.node"/>
    </div>
  </Layout>
</template>

<page-query>
query Tag ($id: ID!) {
  tag (id: $id) {
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
      title: `'${this.$page.tag.title}' posts`
    };
  }
}
</script>

<style lang="scss">

</style>

