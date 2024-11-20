<template>
    <div class="bg-gray-50 dark:bg-gray-900 w-screen overflow-x-hidden flex flex-row">
        <Adminheader/>
        <Loader v-bind:isLoader='isLoader'/>
        <div class="flex flex-col w-full">
            <Navbar/>
            <div class="mt-14 md:w-[78%] md:mt-[5%] md:ml-[20.5%] text-white animate__animated animate__fadeIn ml-4 px-4">
                <h1 class="text-3xl pb-4 tracking-tight text-gray-900 dark:text-white  font-bold">System Setting</h1>
                <div class="flex flex-col items-center justify-center mx-auto lg:py-0 w-[100%] md:mt-10 mt-5">
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700  animate__animated animate__fadeIn">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <form class="space-y-4 md:space-y-6" @submit="updateSetting">
                                <div>
                                    <label for="system_title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">System Title</label>
                                    <input type="text" name="system_title" id="system_title" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="System Title" v-model="this.system_data.system_title" required="">
                                </div>
                                <div>
                                    <label for="about" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About</label>
                                    <textarea type="text" name="about" id="about" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="About" style="height: 108px;" v-model="this.system_data.about" required=""></textarea>
                                </div>
                                <div>
                                    <label for="system_title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact Number</label>
                                    <input type="number" name="cont_number" id="cont_number" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Contact Number" v-model="this.system_data.contact_number" required="">
                                </div>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="System Title" v-model="this.system_data.email" required="">
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
import Loader from '../layout/loader.vue'
import Swal from 'sweetalert2'


export default {
    components: {
        Adminheader,
        Navbar,
        Loader
    },
    data(){
        return{
            system_data : {},
            isLoader : 'loader-hide'
        }
    },
    mounted(){
        this.getAdminData();
    },
    methods:{
        nowLoading(){
            if(this.isLoader==='loader-hide'){
                this.isLoader = 'loader-display';
            }else{
                this.isLoader = 'loader-hide'
            }
        },
         async getAdminData(){
            try {
                const res = await axios.get(`${this.PORT}/auth/admin/system_setting`)
                this.system_data = res.data.row
            } catch (error) {
                console.log(error)
            }
            
        },
        async updateSetting(e){
            this.nowLoading();
            e.preventDefault();
            const {id, system_title, about, email, contact_number} = this.system_data;
            const token = localStorage.getItem('token');
            try {
                const res = await axios.put(`${this.PORT}/auth/admin/system_setting`,
                {
                    id,
                    system_title,
                    about,
                    email,
                    contact_number
                },
                {
                    headers:{
                        'Content-type':'application/x-www-form-urlencoded',
                        "authorization" : `bearer ${token}`,
                    }
                })
                if(res.data.message==='update success'){
                    this.nowLoading();
                    Swal.fire({
                            position: "center",
                            title: `Success`,
                            text: `Save success`,
                            showConfirmButton: false,
                            timer: 1000,
                            icon: "success"
                        }).then(()=>{
                            window.location = '/system-setting'
                        });
                }    
            } catch (error) {
                console.log(error);
            }
        }
    }
}    
</script>