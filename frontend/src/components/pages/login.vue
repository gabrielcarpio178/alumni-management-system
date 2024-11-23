<template>
    <div class="bg-gray-50 dark:bg-gray-900 flex flex-col gap-10 w-full overflow-x-hidden">
        <Topbar/>
        <Loader v-bind:isLoader='isLoader'/>
        <section class="bg-gray-50 dark:bg-gray-900 h-[100vh] md:mt-0 mt-20">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-5 md:h-screen lg:py-0">
                <div class="w-full bg-gray-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700  animate__animated animate__fadeIn">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in
                        </h1>
                        <form class="space-y-4 md:space-y-6" @submit="loginSubmit">
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" v-model="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@gmail.com" required="">
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
    import Loader from '../layout/loader.vue'
    import Swal from 'sweetalert2';
    import moment from 'moment';
    
        
    export default {
        name: 'login',
        components: {
            Topbar,
            Bottombar,
            Loader
        },
        data(){
            return {
                isLoader : 'loader-hide'
            }
        },
        methods: {
            async loginSubmit(e){
                e.preventDefault();
                this.isLoader = 'loader-display';
                const sendData = {
                    email: this.email,
                    password: this.password
                }
                try {
                const res = await axios.post(`${this.PORT}/auth/login`,sendData);
                    if(res.status===200){
                        if(res.data.message!=='deactived account'){
                            localStorage.setItem('token', res.data.token);
                            localStorage.setItem('role', res.data.role);
                            if(res.data.role==='admin'){
                                window.location = "/admin-home"
                            }else if(res.data.role==="student"){
                                res.data.student.birthday = moment(res.data.student.birthday).format('yyyy-MM-DD');
                                localStorage.setItem('student', JSON.stringify(res.data.student))
                                window.location = "/"
                            }
                        }else{
                             Swal.fire({
                                position: "center",
                                title: `Warning`,
                                text: `Wait for admin to activate your account.`,
                                showConfirmButton: false,
                                timer: 1000,
                                icon: "warning"
                            });
                        }
                        
                    }else{
                        Swal.fire({
                            position: "center",
                            title: `Invalid`,
                            text: `Wrong password and email.`,
                            showConfirmButton: false,
                            timer: 1000,
                            icon: "error"
                        });
                    }        
                } catch (error){
                        Swal.fire({
                            position: "center",
                            title: `Invalid`,
                            text: `Wrong password and email.`,
                            showConfirmButton: false,
                            timer: 1000,
                            icon: "error"
                        });
                } finally{
                    this.isLoader = 'loader-hide'
                }
            }
        }
    }
</script>
