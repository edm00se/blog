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
  data: () => ({
    searchTerm: ''
  }),
  computed: {
    searchResults () {
      const searchTerm = this.searchTerm
      if (searchTerm.length < 3) return []
      return this.$search.search({ query: searchTerm, limit: 5 })
    }
  },
  mounted() {
    let queryParm = (this.$route.query.q||this.$route.query.query||'');
    if(queryParm){
      this.searchTerm = decodeURIComponent(queryParm);
    }
  },
  methods: {
    transformPost: (raw) => {
      let tmp = {
        ...raw,
        ...raw.node
      };
      const transformedTags = JSON.parse(raw.tags).map(tag => {
        // console.log(tag);
        return {
          id:tag.id,
          path:tag.path,
          title:tag.title
        };
      });
      if(tmp.date){
        tmp.date = dateformat(Date(tmp.date.split('T')[0]), "dd mmmm, yyyy");
      }
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
