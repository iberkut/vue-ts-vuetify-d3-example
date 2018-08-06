import Vue      from 'vue';
import Router   from 'vue-router';
import Home     from './views/Home.vue';
import Sunburst1 from './views/Sunburst-1.vue';
import Sunburst2 from './views/Sunburst-2.vue';
import Sunburst3 from './views/Sunburst-3.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/sunburst-1',
      name: 'sunburst-1',
      component: Sunburst1
    },
    {
      path: '/sunburst-2',
      name: 'sunburst-2',
      component: Sunburst2
    },
    {
      path: '/sunburst-3',
      name: 'sunburst-3',
      component: Sunburst3
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
});
