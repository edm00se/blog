<template>
  <Layout>
    <div class="flex items-center h-screen fourohfour">
      <div class="w-full mx-auto">
        <section class="mx-auto text-center">
          <h1>Page Not Found</h1>
          <p>The tumbeasts are to be blamed, as your destination couldn't be found.</p>
          <br />
          <figure>
            <img class="tumbeast" alt="thar be tumbeasts" src="../assets/images/tumbeast.svg" />
            <figcaption>
              <a
                href="https://theoatmeal.com/comics/state_web_summer#tumblr"
              >Tumbeasts provided, courtesy of The Oatmeal</a>.
            </figcaption>
          </figure>
          <g-link to="/">&larr; Back to the site</g-link>
        </section>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: `404 OMG!`
    };
  }
};
</script>

<style lang="scss">
figure {
  margin-bottom: 1em;
}
.footer {
  margin-top: 2rem;
}
.h-screen {
  height: 80vh;
}
.items-center {
  align-items: center;
}
.flex {
  display: flex;
}
.w-full {
  width: 100%;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.text-center {
  text-align: center;
}
.fourohfour {
  a {
    color: var(--body-color);
  }
}
</style>
