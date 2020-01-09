<template>
  <Layout :show-logo="false">
    <!-- Author intro -->
    <Author :show-title="true"/>

    <!-- List posts -->
    <div class="posts">
      <PostCard v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node"/>
      <Pager :class="'pager'" :info="$page.posts.pageInfo"/>
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
        date (format: "D MMMM, YYYY")
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
import { Pager } from 'gridsome';

export default {
  components: {
    Author,
    PostCard,
    Pager
  },
  metaInfo: {
    title: 'Home'
  }
};
</script>

<style lang="scss" scoped>
nav.pager {
  display: flex;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-evenly;

  a {
    color: var(--title-text);
    text-decoration: none;

    &.active {
      font-weight: bolder;
      text-decoration: underline;
    }
    &:hover {
      color: var(--link-color);
    }
  }
}
</style>
