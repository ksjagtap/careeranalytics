import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import PROFILE from '../components/PROFILE.vue'
import CAREERS_BY_MAJOR from '../components/CAREERS_BY_MAJOR.vue'
import COMPANY_DETAILS from '../components/COMPANY_DETAILS.vue'
import COMPARE_COMPANIES from '../components/COMPARE_COMPANIES.vue'
import INDUSTRY_OUTLOOK from '../components/INDUSTRY_OUTLOOK.vue'
import COMPARE_INTERNSHIPS from '../components/COMPARE_INTERNSHIPS.vue'
import INTERNSHIP_DETAILS from '../components/INTERNSHIP_DETAILS.vue'
import EXPLORE from '../components/explore.vue'

// another way to do it
//import INDUSTRY_OUTLOOK from '../components/INDUSTRY_OUTLOOK.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },

    {
      path: '/profile',
      name: 'PROFILE',
      component: PROFILE
    },

    {
      path: '/careersbymajor',
      name: 'CAREERS_BY_MAJOR',
      component: CAREERS_BY_MAJOR
    },

    {
      path: '/companydetails',
      name: 'COMPANY_DETAILS',
      component: COMPANY_DETAILS
    },

    {
      path: '/comparecompanies',
      name: 'COMPARE_COMPANIES',
      component: COMPARE_COMPANIES
    },

    {
      path: '/industryoutlook',
      name: 'INDUSTRY_OUTLOOK',
      component: INDUSTRY_OUTLOOK
    },

    {
      path: '/compareinternships',
      name: 'COMPARE_INTERNSHIPS',
      component: COMPARE_INTERNSHIPS
    },

    {
      path: '/internshipdetails',
      name: 'INTERNSHIP_DETAILS',
      component: INTERNSHIP_DETAILS
    },

    {
      path: '/explore',
      name: 'EXPLORE',
      component: EXPLORE
    }
  ]
})
