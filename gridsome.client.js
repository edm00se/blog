import VueDisqus from 'vue-disqus';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faLink, faSearch, faTag, faTags } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';

config.autoAddCss = false;
library.add(faLink, faTwitter, faGithub, faInstagram, faSearch, faTag, faTags);

export default function (Vue) {
  Vue.use(VueDisqus);
  Vue.component('font-awesome', FontAwesomeIcon);
}
