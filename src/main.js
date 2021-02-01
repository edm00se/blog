// Import main css
import '~/assets/style/index.scss';

// Import default layout so we don't need to import it to every page
import DefaultLayout from '~/layouts/Default.vue';

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);
}

// if (process.isClient && process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
//   const {Workbox} = require('workbox-window');
//   console.log('service worker time baby!');
//   const wb = new Workbox('/sw.js');
//   wb.addEventListener('installed', event => {
//     console.log('sw installed, event.isUpdate? ', event.isUpdate);
//   });
//   wb.addEventListener('activated', (event) => {
//     console.log('sw activated, event.isUpdate? ', event.isUpdate);
//     if (!event.isUpdate) {
//       console.log('Service worker activated for the first time!');
//     }
//   });
//   wb.addEventListener('waiting', (event) => {
//     console.log(`A new service worker has installed, but it can't activate` +
//         `until all tabs running the current version have fully unloaded.`);
//   });
//   wb.addEventListener('installing', (event) => {
//     console.log('new content on its way');
//   });

// wb.addEventListener('message', (event) => {
//   console.log('message: ', event);
//   if (event.data.type === 'CACHE_UPDATED') {
//     const {updatedURL} = event.data.payload;

//     if (window.confirm(`New content for ${updatedURL} is available. Reload to view the latest?`)) {
//       window.location.reload();
//     }
//   }
// });
//   wb.register();
// }
