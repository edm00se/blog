<template>
  <div class="author">
    <g-image
      alt="Author image"
      class="author__image"
      src="https://secure.gravatar.com/avatar/397da8c5ae99b2f89a207d9beda6984d?size=180"
      width="180"
      height="180"
      blur="5"
    />

    <h1 v-if="showTitle" class="author__site-title">{{ $static.metadata.siteName }}</h1>

    <p class="author__intro">{{ $static.metadata.siteDescription }}</p>

    <p class="author__links">
      <a href="https://twitter.com/edm00se"><font-awesome :icon="['fab', 'twitter']" /> Twitter</a>
      <a href="https://github.com/edm00se"><font-awesome :icon="['fab', 'github']" /> GitHub</a>
    </p>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
		siteDescription
  }
}
</static-query>

<script>
export default {
  props: ['showTitle']
};
</script>

<style lang="scss">
.author {
  margin: 0 auto;
  max-width: 500px;
  text-align: center;
  padding: calc(var(--space) / 2) 0;

  &__image {
    border-radius: 100%;
    width: 90px;
    height: 90px;
    margin-bottom: 1em;
  }

  &__intro {
    opacity: 0.8;
  }

  &__site-title {
    font-size: 1.5em;
  }

  &__links {
    margin-top: -0.5em;
    a {
      margin: 0 0.5em;
    }
  }
}
</style>
