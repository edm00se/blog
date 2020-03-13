<template>
  <div class="series">
    <details>
      <summary>
        <h3>Posts in This Series</h3>
      </summary>
      <ul class="series-list">
        <li v-for="post in series" :key="post.node.id">
          <g-link class="post-tags__link" :to="post.node.path" :disabled="current === post.node.id">
            {{ post.node.title }}
          </g-link>
        </li>
      </ul>
    </details>
  </div>
</template>

<script>
export default {
  props: ['series','current']
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
