<template>
  <section class="content-box">
    <nav role="navigation" aria-label="pagination">
      <ul class="pagination">
        <li class="twenty-pct">
          <g-link :to="previousPage(info.currentPage)"
              :class="{'pointer-events-none opacity-0': info.currentPage == 1}"
              :rel="info.currentPage == 1 ? 'nofollow' : 'prev'">
            &larr; Previous
          </g-link>
        </li>
        <li class="text-center">Page {{ info.currentPage }} of {{ info.totalPages }}</li>
        <li class="twenty-pct text-right">
          <g-link :to="nextPage(info.currentPage,info.totalPages)"
              :class="{'pointer-events-none opacity-0': info.currentPage == info.totalPages}"
              :rel="info.currentPage == info.totalPages ? 'nofollow' : 'next'">
            Next &rarr;
          </g-link>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
export default {
  props: ['base','info'],
  methods: {
    previousPage(currentPage) {
      return [0, 1].includes(currentPage - 1) ? `${this.basePath}/` : `${this.basePath}/${currentPage - 1}/`;
    },
    nextPage(currentPage, totalPages) {
      return totalPages > currentPage ? `${this.basePath}/${currentPage + 1}/` : `${this.basePath}/${currentPage}/`;
    }
  },
  computed: {
    basePath() {
      return this.base || ''
    }
  }
}
</script>

<style lang="scss" scoped>
section.content-box {
  background-color: initial;
  padding: 0px 1rem 1rem;

  ul.pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    margin: 0px;

    li {
      margin-bottom: inherit;

      a {
        color: var(--body-color);
        text-decoration: none;
      }
    }
  }
}
.twenty-pct {
  width: 20%;
}
.text-right {
  text-align: right;
}
.pointer-events-none {
  pointer-events: none;
}
.opacity-0 {
  opacity: 0;
}
</style>