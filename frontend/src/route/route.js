import { createRouter, createWebHistory } from 'vue-router';
import login from './../components/pages/login.vue'
import home from './../components/pages/home.vue'
import gallery from './../components/pages/gallery.vue'
import sign from './../components/pages/signup.vue'
import admin_home from './../components/pages/admin_home.vue'
import course_list from './../components/pages/admin_courseList.vue'
import alumni_list from './../components/pages/admin_alumniList.vue'
import alumni_gallery from './../components/pages/admin_gallery.vue'
import event_admin from './../components/pages/admin_event.vue'
import account_setting from './../components/pages/admin_accountSetting.vue'
import profile from './../components/pages/profile_edit.vue'
import jobs from './../components/pages/jobs.vue'
import view_job from './../components/pages/view_job.vue'
import admin_job from './../components/pages/admin_job.vue'
import system_setting from './../components/pages/admin_systemSetting.vue'
import about from './../components/pages/about.vue'
import otp from './../components/pages/otppage.vue'

const router = createRouter({
    routes: [
        {
            path: "/",
            name: 'home',
            component: home
        },
        {
            path: "/gallery",
            name: 'gallery',
            component: gallery
        },
        {
            path: "/login", 
            name: 'login',
            component: login,
        },
        {   
            path: "/signup", 
            name: "signup", 
            component: sign
        },
        {
            path: "/admin-home", 
            name: "admin-home",
            component: admin_home,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/course-list", 
            name: "course-list",
            component: course_list,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/alumni-list", 
            name: "alumni-list",
            component: alumni_list,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/alumni-gallery", 
            name: "alumni-gallery",
            component: alumni_gallery,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/event", 
            name: "event",
            component: event_admin,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/account-setting", 
            name: "account-setting",
            component: account_setting,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/profile", 
            name: "profile",
            component: profile,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/jobs", 
            name: "jobs",
            component: jobs,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/jobs/view-job", 
            name: "view-jobs",
            component: view_job,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/admin-jobs", 
            name: "admin-jobs",
            component: admin_job,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/system-setting", 
            name: "system-setting",
            component: system_setting,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/about", 
            name: "about",
            component: about
        },
        {
            path: "/otp", 
            name: "otp",
            component: otp,
            meta:{
                requiresAuth: true,
            }
        },
    ],
    history: createWebHistory()
})

router.beforeEach(async (to, from, next) => {
    const admin_page = ['admin-home', 'course-list', 'alumni-list', 'alumni-gallery', 'event', 'account-setting','admin-jobs','system-setting'];

    if(localStorage.getItem('role')==='admin'&&admin_page.includes(to.name)){
        to.meta.requiresAuth = false;
    }

    if(localStorage.getItem('role')==='student'&&!admin_page.includes(to.name)){
        to.meta.requiresAuth = false;
    }

    if(localStorage.getItem('role')==='verification'){
        to.meta.requiresAuth = false;
    }

    if(localStorage.getItem('role')!=='verification'){
        localStorage.removeItem('req_data');
    }

    if(localStorage.getItem('role')==='admin'&&!admin_page.includes(to.name)){
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('isLogin');
        to.meta.requiresAuth = false;
    }

    if(to.meta.requiresAuth){
        next("login")
    }else{
        next();
    }
});


export default router;