import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faLink, faSearch, faTag, faTags } from '@fortawesome/free-solid-svg-icons';
import { faMastodon, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';

config.autoAddCss = false;
library.add(faLink, faMastodon, faGithub, faInstagram, faSearch, faTag, faTags);

export default function (Vue) {
  Vue.component('font-awesome', FontAwesomeIcon);
}
