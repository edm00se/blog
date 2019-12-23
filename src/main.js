// Import main css
import '~/assets/style/index.scss';

// comments
import VueDisqus from 'vue-disqus';

// Import default layout so we don't need to import it to every page
import DefaultLayout from '~/layouts/Default.vue';

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function(Vue, { router, head, isClient }) {
  // enable vue-disqus component
  Vue.use(VueDisqus);
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);
}
