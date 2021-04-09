// Import main css
import '~/assets/style/index.scss';

// Import default layout so we don't need to import it to every page
import DefaultLayout from '~/layouts/Default.vue';

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);
}

if (
  process.isClient &&
  process.env.NODE_ENV === 'production' &&
  'serviceWorker' in navigator
) {
  console.log('no service worker time... baby');
  /*
  const {Workbox} = require('workbox-window');
  console.log('service worker time baby!');
  const wb = new Workbox('/sw.js');
  wb.addEventListener('installed', event => {
    if (event.isUpdate) {
      if (window.confirm('New content is available. Reload to view the latest?')) {
        window.location.reload();
      }
    }
  });
  wb.register();
  */
}
