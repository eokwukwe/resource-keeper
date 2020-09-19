import { createRouter, createWebHistory } from 'vue-router'

import ResourceNew from '@/pages/ResourceNew'
import ResourceHome from '@/pages/ResourceHome'
import ResourceDetail from '@/pages/ResourceDetail'

const routes = [
  { path: '/', redirect: { name: 'resourceHomePage' } },
  { path: '/resources', name: 'resourceHomePage', component: ResourceHome },
  { path: '/resources/new', name: 'resourceNewPage', component: ResourceNew },
  {
    path: '/resources/:id',
    name: 'resourceDetailPage',
    component: ResourceDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: 'active',
  routes
})

export default router
