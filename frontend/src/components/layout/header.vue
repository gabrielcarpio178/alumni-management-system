<template>
    <header class="fixed w-full z-50">

        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <router-link to="/" class="flex items-center">
                    <img src="../image/itechlogo.png" class="mr-3 h-6 sm:h-9" alt="Itech logo" />
                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Alumni Management System</span>
                </router-link>
                <div class="flex items-center lg:order-2">
                    <div v-if="this.isLogin" class="text-gray-800 dark:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 cursor-pointer focus:outline-none dark:focus:ring-gray-800" @click="displayProfle">
                        <img :src="student.profile_pic===null?getThumbnel(student.firstname, student.lastname):`${this.PORT}/uploads/${stundet.profile_pic}`" alt="profile" class="rounded-3xl max-h-8">
                    </div>
                    <router-link to="/login" v-if="!this.isLogin" class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800" >Log in</router-link>
                    <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                        <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                    <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li class="p-1 rounded-md" :class="isActivate('home')?'bg-gray-700':'hover:bg-gray-100 dark:hover:bg-gray-700'">
                            <router-link to="/" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Home</router-link>
                        </li>
                        <li class="p-1 rounded-md" :class="isActivate('gallery')?'bg-gray-700':'hover:bg-gray-100 dark:hover:bg-gray-700'"> 
                            <router-link to="/gallery" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Gallery</router-link>
                        </li>
                        <li class="p-1 rounded-md" :class="isActivate('about')?'bg-gray-700':'hover:bg-gray-100 dark:hover:bg-gray-700'">
                            <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">About</a>
                        </li>
                        <li class="p-1 rounded-md" :class="isActivate('job')?'bg-gray-700':'hover:bg-gray-100 dark:hover:bg-gray-700'">
                            <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Job</a>
                        </li>
                    </ul>
                </div>
            </div>
            <Profile v-if="this.isLogin&&this.isShow" class="animate__animated animate__bounceInDown" @callremove="removeProfle"/>
        </nav>
    </header>
</template>

<script>
    import {useRoute} from 'vue-router'
    import Profile from './profile.vue'
    export default{
        components: { 
            Profile 
        },
        data(){
            return {
                student: JSON.parse(localStorage.getItem('student')),
                isShow: false
            }
        },
        methods: {
            isActivate(routePath){
                const route = useRoute();
                return route.name === routePath;
            },
            getThumbnel(firstname, lastname){
                return `https://ui-avatars.com/api/?name=${firstname}+${lastname}`
            },
            displayProfle(){
                this.isShow = true;
            },
            removeProfle(){
                this.isShow = false;
            }
        }
    }
</script>
