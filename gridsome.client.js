import VueAnalytics from 'vue-analytics';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

config.autoAddCss = false;
library.add(faLink, faTwitter, faGithub);

export default function (Vue) {
  Vue.component('font-awesome', FontAwesomeIcon);
  Vue.use(VueAnalytics, {
    id: process.env.GRIDSOME_ANALYTICS_ID,
    customResourceURL: '/analyzer.js',
    debug: {
      sendHitTask: process.env.NODE_ENV === 'production'
    },
    disabled: process.isServer
  })
}
