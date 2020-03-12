import VueAnalytics from 'vue-analytics';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

config.autoAddCss = false;
library.add(faLink, faTwitter, faGithub, faSearch);

export default function (Vue) {
  Vue.component('font-awesome', FontAwesomeIcon);
}
