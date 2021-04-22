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
  console.log('service worker time baby');
  const { Workbox, messageSkipWaiting } = require('workbox-window');
  const wb = new Workbox('/sw.js');
  let registration;

  const showSkipWaitingPrompt = event => {
    const prompt = window.confirm(
      'New content is available. Reload to view the latest?'
    );
    if (prompt) {
      wb.addEventListener('controlling', event => {
        window.location.reload();
      });

      messageSkipWaiting();
    }
  };

  wb.addEventListener('waiting', showSkipWaitingPrompt);
  wb.register();
}
