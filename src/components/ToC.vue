<template>
  <div v-if="subtitles.length > 0" class="sidebar sidebar--right hide-for-small">
    <details>
      <summary>
        <h3>Table of Contents</h3>
      </summary>
      <ul v-if="subtitles.length" class="toc-menu">
        <li class="toc-menu-item" :class="'toc-menu-item-depth-' + subtitle.depth" v-for="subtitle in subtitles" :key="subtitle.value">
          <a class="toc-menu-item__link" :href="subtitle.anchor">
            {{ subtitle.value }}
          </a>
        </li>
      </ul>
    </details>
  </div>
</template>

<script>
export default {
  props: {
    subtitles: { type: Array, default: () => [] }
  }
}
</script>

<style scoped>
  .toc-menu {
    margin-left: inherit;
  }
  .toc-menu-item-depth-2 {
    margin-left: 2em;
  }
  .toc-menu-item-depth-3 {
    margin-left: 4em;
  }
  .toc-menu-item-depth-4 {
    margin-left: 6em;
  }
  .toc-menu-item-depth-5 {
    margin-left: 8em;
  }
  .toc-menu-item-depth-6 {
    margin-left: 10em;
  }
  code {
    line-break: auto;
    break-inside: auto;
  }
  details {
    margin-bottom: 1em;
  }
  details summary {
    cursor: pointer;
  }
  details summary h3 {
    display: inline;
  }
</style>
