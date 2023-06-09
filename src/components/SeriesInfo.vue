<template>
  <div class="series">
    <details>
      <summary>
        <h3>Posts in This Series</h3>
      </summary>
      <ul class="series-list">
        <li v-for="post in orderedSeries" :key="post.node.id">
          <span v-if="post.node.id == current">
            <font-awesome :icon="['fas', 'chevron-right']" :class="'w-5 sm:w-6 fill-current mx-auto mb-1'" size="3x" style="vertical-align: middle;color: var(--link-color);" />
            &nbsp;
          </span>
          <g-link class="post-tags__link" :to="post.node.path" :disabled="current === post.node.id">
            {{ post.node.title }}
          </g-link>
        </li>
      </ul>
    </details>
  </div>
</template>

<script>
import PostTags from '~/components/PostTags';
export default {
  components: {
    PostTags
  },
  props: ['series','current'],
  computed: {
    orderedSeries: function() {
      return this.series?.reverse();
    }
  }
}
</script>

<style scoped>
  details {
    margin-bottom: 1em;
  }
  details summary {
    cursor: pointer;
    padding-bottom: 1em;
  }
  details summary h3 {
    display: inline;
  }
  .series-list {
    list-style: none;
  }
  .series-list li a:hover {
    border-bottom: 2px solid var(--link-color);
  }
</style>
