import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { config, library } from '@fortawesome/fontawesome-svg-core';
// import { faTag, faTags, faRss, faHome, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
// import { faTwitter, faInstagram, faStackOverflow, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

config.autoAddCss = false;
library.add(faLink);

export default function (Vue) {
  Vue.component('font-awesome', FontAwesomeIcon);
}