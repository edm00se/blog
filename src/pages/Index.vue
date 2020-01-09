<template>
  <Layout :show-logo="false">
    <!-- Author intro -->
    <Author :show-title="true"/>

    <!-- List posts -->
    <div class="posts">
      <PostCard v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node"/>
      <pagination :info="$page.posts.pageInfo" v-if="$page.posts.pageInfo.totalPages > 1" />
    </div>
    
  </Layout>
</template>

<page-query>
query($page: Int) {
  posts: allPost(filter: { published: { eq: true }}, perPage: 6, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        date (format: "D. MMMM YYYY")
        timeToRead
        description
        cover_image (width: 770, height: 380, blur: 10)
        path
        tags {
          id
          title
          path
        }
      }
    }
  }
}
</page-query>

<script>
import Author from '~/components/Author.vue';
import PostCard from '~/components/PostCard.vue';
import Pagination from '~/components/Pagination.vue';

export default {
  components: {
    Author,
    PostCard,
    Pagination
  },
  metaInfo: {
    title: 'Home'
  }
};
</script>
