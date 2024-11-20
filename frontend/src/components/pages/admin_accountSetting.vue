<template>
    <div class="bg-gray-50 dark:bg-gray-900 w-screen overflow-x-hidden flex flex-row">
        <Adminheader/>
        <Loader v-bind:isLoader='isLoader'/>
        <div class="flex flex-col w-full">
            <Navbar/>
            <div class="mt-14 md:w-[78%] md:mt-[5%] md:ml-[20.5%] text-white animate__animated animate__fadeIn pl-4 px-4">
                <h1 class="text-3xl pb-4 tracking-tight text-gray-900 dark:text-white  font-bold">Account Setting</h1>
                <div class="flex flex-col items-center justify-center mx-auto lg:py-0 w-[100%] md:mt-10 mt-5">
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700  animate__animated animate__fadeIn">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <form class="space-y-4 md:space-y-6" @submit="updateAccount">
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="this.admin.email" required=""  :value="this.admin.email">
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" v-model="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                                </div>
                                <div>
                                    <label for="con_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                    <input type="password" v-model="con_password" name="con_password" id="con_password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                                </div>
                                <div class="text-red-500 py-0 px-0" id="message">
                                    {{message}}
                                </div>
                                <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save</button>
                            </form>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    </div>        
</template>
<script>
import axios from 'axios'
import Adminheader from './../layout/admin_header.vue'
import Navbar from './../layout/admin_navbar.vue'
import Swal from 'sweetalert2'
import Loader from '../layout/loader.vue'


export default {
    components: {
        Adminheader,
        Navbar,
        Loader
    },
    data(){
        return{
            admin: {},
            message: '',
            isLoader : 'loader-hide'
        }
    },
    mounted(){
        this.getAdminData();
    },
    methods: {
        nowLoading(){
            if(this.isLoader==='loader-hide'){
                this.isLoader = 'loader-display';
            }else{
                this.isLoader = 'loader-hide'
            }
        },
        async getAdminData(){
            const token = localStorage.getItem('token');
            const res = await axios.get(`${this.PORT}/auth/admin/account`, {
                 headers: {
                    authorization : `bear ${token}`
                }
            })
            this.id = (res.data.row)[0].id
            this.admin = (res.data.row)[0];
        },
        async updateAccount(e){
            e.preventDefault();    
            const token = localStorage.getItem('token');
            const email = document.getElementById('email').value;
            const password = this.password;
            const con_password = this.con_password;
            this.nowLoading();
            if(password===con_password){
                this.message = ''
                try {
                    const res = await axios.put(`${this.PORT}/auth/admin/account`,
                    {
                        id: this.id,
                        email: email,
                        password: password
                    },
                    {
                        headers:{
                            'Content-type':'application/x-www-form-urlencoded',
                            "authorization" : `bearer ${token}`,
                        }
                    });
                    if(res.data.message === 'update success'){
                        Swal.fire({
                            position: "center",
                            title: `Success`,
                            text: `Save success`,
                            showConfirmButton: false,
                            timer: 1000,
                            icon: "success"
                        }).then(()=>{
                            window.location = '/account-setting';
                        });
                    }
                    } catch (error) {
                        console.log(error)
                    }finally{
                        this.nowLoading();
                    }
                
            }else{
                this.nowLoading();
                this.message = 'Password not Match'
            }
            
        }
    }
}
</script>
