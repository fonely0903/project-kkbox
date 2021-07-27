import Vue from 'vue'
import App from './App.vue'
import Episode from './components/Episode.vue'
import Player from './components/Player.vue'
import Home from './components/Home.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendarAlt, faPlayCircle, faClock, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Router from 'vue-router'

Vue.use(Router)

library.add(faClock, faCalendarAlt, faPlayCircle, faChevronLeft, faChevronRight);
Vue.component('font-awesome-icon', FontAwesomeIcon);

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/episode/:episodeGuid',
      name: 'episode',
      component: Episode,
      props: true
    }
  ]
})

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
