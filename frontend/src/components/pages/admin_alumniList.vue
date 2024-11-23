<template>
    <div class="bg-gray-50 dark:bg-gray-900 w-screen overflow-x-hidden flex flex-row">
        <Adminheader/>
        <Loader v-bind:isLoader='isLoader'/>
        <div class="flex flex-col w-full">
            <Navbar/>
            <div class="w-full mt-14 md:mt-[5%] md:ml-[20.5%] text-white animate__animated animate__fadeIn pl-4">
                <h1 class="text-3xl pb-4 tracking-tight text-gray-900 dark:text-white  font-bold">Alumni List</h1>
                <div class="flex w-full flex-col gap-y-3">
                    <div class="flex gap-x-40">
                        <div class="flex gap-x-3 bg-gray-200 shadow md:w-1/4 w-[97%] dark:border dark:bg-gray-800 dark:border-gray-700 p-6 rounded-md">
                            <div class="w-full">
                                <label for="search" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Search</label>
                                <input type="text" name="search" id="search" placeholder="Search" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 capitalize" v-model="search" @input="getdata(this.search)">
                            </div>
                        </div>  
                    </div>

                    <div class="w-[97%] md:w-[78.5%] h-80 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 overflow-y-scroll" id="table_content">
                        <div v-if="this.loadingContent" class="dark:text-white text-black w-full flex items-center justify-center">
                            Please Wait...
                        </div>
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-center">
                                        name
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-center">
                                        batch
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-center">
                                        birthday
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-center">
                                        course
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-center">
                                        student id
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-center">
                                        status
                                    </th>
                                </tr>
                            </thead>
                             <tbody >
                                  
                                <tr class="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700" v-for="(data, index) in this.datas" :key="index" @click="viewuser(index)">
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                            {{data.firstname + " " + data.lastname}}
                                    </td>
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                            {{data.batch}}
                                    </td>
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                            {{moment(data.birthday)}}
                                    </td>
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                            {{data.course}}
                                    </td>
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                            {{data.student_id}}
                                    </td>
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                            {{data.status==0?"deactivate":"activate"}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p class="capitalize text-red-700 pl-5 font-bold">{{message}}</p>
                    </div>
                    <Modal @loader='nowLoading' @getData="getData('')" class="hidden animate__animated animate__bounceInDown" id="modal_content" v-bind:alumni_data='alumni_data'/>
                </div>
            </div>            
        </div>    
    </div>    
</template>

<script>
import Adminheader from './../layout/admin_header.vue'
import Navbar from './../layout/admin_navbar.vue'
import Modal from './admin_modal_profile.vue'
import Loader from '../layout/loader.vue'
import axios from 'axios';
import moment from 'moment'

export default {
    components: {
        Adminheader,
        Navbar,
        Modal,
        Loader
    },
    data(){
        return{
            datas: [],
            alumni_data: {},
            search : '',
            isLoader : 'loader-hide',
            message: '',
            loadingContent: true
        }
    },
    mounted(){
        this.getdata('all');
    },
    methods: {
        nowLoading(){
            if(this.isLoader==='loader-hide'){
                this.isLoader = 'loader-display';
            }else{
                this.isLoader = 'loader-hide'
            }
        },
        moment(date) {
            return moment(date).format('MMM D, YYYY');
        },
        async getdata(search){
            if(search==''){
                search = 'all';
            }
            this.loadingContent = true;
            try {
                const res = await axios.get(`${this.PORT}/auth/admin/alumnilist/${search}`,{
                    headers: {
                        authorization : `bear ${localStorage.getItem('token')}`
                    }
                })
                this.message = ''
                if(res.data.message==='not found'){
                    this.message = 'not found'
                }
                this.datas = res.data.rows;
            } catch (error) {
                console.log(error)
            }finally{
                this.loadingContent = false;
            }
            
        },
        async viewuser(index){
            document.querySelector("#modal_content").classList.remove('hidden')
            this.alumni_data = this.datas[index];
        },
        
    }
}
</script>
