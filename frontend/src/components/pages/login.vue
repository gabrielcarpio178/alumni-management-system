<template>
    <div class="bg-gray-50 dark:bg-gray-900 flex flex-col gap-10 w-full overflow-x-hidden">
        <Topbar/>
        <section class="bg-gray-50 dark:bg-gray-900 h-[100vh]">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-5 md:h-screen lg:py-0">
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700  animate__animated animate__fadeIn">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in
                        </h1>
                        <form class="space-y-4 md:space-y-6" @submit="loginSubmit">
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="text" name="email" v-model="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@gmail.com" required="">
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" v-model="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                            </div>
                            <div class="text-red-500 py-0 px-0" id="message">
                                
                            </div>
                            <div>
                            </div>
                            <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <router-link to="/signup" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</router-link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <Bottombar/>
    </div>
</template>

<script>
    import axios from 'axios';
    import Topbar from '../layout/header.vue'
    import Bottombar from '../layout/footer.vue'

    const PORT = "http://localhost:8080";
    export default {
        name: 'login',
        components: {
            Topbar,
            Bottombar
        },
        methods: {
            async loginSubmit(e){
                e.preventDefault();
                const sendData = {
                    email: this.email,
                    password: this.password
                }
                try {
                const res = await axios.post(`${PORT}/auth/login`,sendData);
                    if(res.status===200){
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('role', res.data.role);
                        localStorage.setItem('isLogin', true);
                        if(res.data.role==='admin'){
                            window.location = "/admin-home"
                        }else if(res.data.role==="student"){
                            window.location = "/student-home"
                        }
                        
                    }else{
                        document.getElementById("message").textContent = 'Wrong password or email'
                    }        
                } catch (error){
                        document.getElementById("message").textContent = 'Wrong password or email'
                }
            }
        }
    }
</script>
