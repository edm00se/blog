<template>
  <Layout>
    <div class="search-box">
      <input
        id="search"
        v-model="searchTerm"
        class="input"
        type="text"
        placeholder="Search">
    </div>
    <div class="search-results">
      <PostCard v-for="result in searchResults" :key="result.id" :post="transformPost(result)"/>
    </div>
  </Layout>
</template>

<script>
import Search from 'gridsome-plugin-flexsearch/SearchMixin';
import PostCard from '~/components/PostCard.vue';
const dateformat = require('dateformat');

export default {
  components: {
    PostCard
  },
  mixins: [Search],
  mounted() {
    let queryParm = (this.$route.query.q||this.$route.query.query||'');
    if(queryParm){
      this.searchTerm = decodeURIComponent(queryParm);
    }
  },
  methods: {
    transformPost: (raw) => {
      let tmp = {
        ...raw
      };
      const transformedTags = JSON.parse(raw.tags).map(tag => {
        return {
          id:tag,
          path:`/tag/${tag}/`,
          title:tag
        };
      });
      tmp.date = dateformat(tmp.date, "dd mmmm, yyyy");
      tmp.tags = transformedTags;
      return tmp;
    }
  }
}
</script>

<style lang="scss">
.search-box {
  margin-bottom: 2rem;

  input {
    width: 100%;
    font-size: 4em;
  }
}
</style>
