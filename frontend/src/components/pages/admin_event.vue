<template>
    <div class="bg-gray-50 dark:bg-gray-900 w-screen overflow-x-hidden flex flex-row">
        <Adminheader/>
        <Loader v-bind:isLoader='isLoader'/>
        <div class="flex flex-col w-full">
            <Navbar/>
            <div class="w-full mt-14 md:mt-[5%] md:ml-[20.5%] text-white animate__animated animate__fadeIn pl-4 px-4">
                <h1 class="text-3xl pb-4 tracking-tight text-gray-900 dark:text-white  font-bold">Events</h1>
                <div class="w-full md:w-[78%] flex justify-between">
                    <input type="date" name="filter_schedule" id="filter_schedule" v-model="filter_schedule" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block md:w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" @change="filterData(this.filter_schedule)">
                    <button class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onclick="document.getElementById('modal_add').classList.remove('hidden')">Add</button>
                </div>
                <div class="text-red-500 py-0 px-0 capitalize w-[78%]" id="message">
                    {{message}}
                </div>
                <div v-if="this.loadingContent" class="w-full flex items-center justify-center">
                    Please Wait...
                </div>
                <div v-if="!this.loadingContent" class="grid md:grid-cols-3 gap-4 md:w-[78%] md:h-96 md:overflow-y-scroll mt-5 rounded-md">
                    
                    <div v-for="(event, index) in this.events" :key="index">
                        <div class="rounded-lg border bg-gray-200 dark:bg-gray-800 dark:border-gray-700 px-4 py-5 shadow-lg">
                            <div class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Banner</div>
                            <div class="rounded-md h-40 bg-white">
                                <div class="h-full flex items-center justify-center text-2xl font-bold">
                                    <img :src="this.PORT+'/uploads/'+event.banner" class="max-w-full max-h-full w-full h-full rounded-md"/>
                                </div>     
                            </div>
                            <div>
                                <div class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">event</div>
                                <div class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm">{{event.event}}</div>
                            </div>
                            <div>
                                <div class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">schedule</div>
                                <div class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm">{{moment(event.schedule)}}</div>
                            </div>
                            <div>
                                <div class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">address</div>
                                <div class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm">{{event.address}}</div>
                            </div>
                            <div>
                                <div class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">description</div>
                                <div class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm h-16 overflow-y-scroll">{{event.description}}</div>
                            </div>
                            <div class="flex gap-x-2 mt-2">
                                <!-- <button class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" @click="editGallery(index)">Edit</button> -->
                                <button class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" @click="delateEvent(event.id)">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
        <ModalAdd @loader="nowLoading" class="animate__animated animate__bounceInDown hidden" id="modal_add"/>
    </div>           
</template>
<script>
import axios from 'axios'
import Adminheader from './../layout/admin_header.vue'
import Navbar from './../layout/admin_navbar.vue'
import ModalAdd from './admin_modalAdd_event.vue'
import Loader from '../layout/loader.vue'
import moment from 'moment'
import Swal from 'sweetalert2'

export default {
   components: {
        Adminheader,
        Navbar,
        ModalAdd,
        Loader
    },
    data(){
        return{
            events : [],
            message: "",
            isLoader : 'loader-hide',
            loadingContent: true
        }
    },
    mounted(){
        this.getGallery('all');
    },
    methods: {
        nowLoading(){
            if(this.isLoader==='loader-hide'){
                this.isLoader = 'loader-display';
            }else{
                this.isLoader = 'loader-hide'
            }
        },
         moment: function (date) {
            return moment(date).format('MMM D, YYYY h:mm A');
        },
        async getGallery(filter){
            const token = localStorage.getItem('token');
            try {
                 const res = await axios.get(`${this.PORT}/auth/admin/event/${filter}`, {
                    headers: {
                        authorization : `bear ${localStorage.getItem('token')}`
                    }
                })
                
                if((res.data.rows).length!=0){
                    this.events = res.data.rows;
                    this.message = ""
                }else{
                    this.message = "not found event"
                    this.events = []
                }
            } catch (error) {
                console.log(error)
            }finally{
                this.loadingContent = false;
            }
           
            
        },
        filterData(filter){
            if(filter!==''){
                this.getGallery(filter);
            }else{
                this.getGallery('all');
            }
            
        },
        delateEvent(id){
            const token = localStorage.getItem('token');
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
            if (result.isConfirmed) { 
                this.nowLoading();
                try{
                    const res = await axios.delete(`${this.PORT}/auth/admin/deleteEvent`,
                        {
                            headers:{
                                'Content-type':'application/x-www-form-urlencoded',
                                "authorization" : `bearer ${token}`,
                            },
                            data: {
                                id: id
                            }
                        }
                    )
                    if(res.data.message=='delete success'){
                        Swal.fire({
                            position: "center",
                            title: `Delete`,
                            text: `Delete success`,
                            showConfirmButton: false,
                            timer: 1000,
                            icon: "success"
                        }).then(()=>{
                            this.getGallery('all');
                            this.filter_schedule = ""
                        });
                    }
                }catch(err){
                    console.log(err)
                }finally{
                    this.nowLoading();
                }
            }
            });
        }
    }
}
</script>