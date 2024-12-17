<template>
    <div class="bg-gray-50 dark:bg-gray-900 flex flex-col gap-10 w-full overflow-x-hidden">
        <Topbar/>
        <Loader v-bind:isLoader='isLoader'/>
        <div class="flex flex-col h-screen xl:h-full dark:text-white w-screen animate__animated animate__fadeIn">
            <div class="text-center w-full pt-28 flex flex-col gap-2 px-4">
                <h1 class="text-2xl font-bold">
                    Event Post
                </h1>
                <button class="md:w-[10%] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 self-end w-[25%] md:absolute right-5 md:mr-0 mr-10" @click="showAddForm">Add Event</button>
                <div class="w-1/2 text-left">
                    <label for="event" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Search</label>
                    <input type="date" name="filter_schedule" id="filter_schedule" v-model="filter_schedule" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block md:w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" @change="filterData(this.filter_schedule)">
                </div>
                <div class="text-2xl text-red-600 h-[30vh]" v-if="this.message">No Jobs Posted</div>

                <div v-if="!this.loadingContent" class="grid md:grid-cols-3 gap-4 mt-5 rounded-md">
                    
                    <div v-for="(event, index) in this.events" :key="index">
                        <div class="rounded-lg border bg-gray-200 dark:bg-gray-800 dark:border-gray-700 px-4 py-5 shadow-lg">
                            <div class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Banner</div>
                            <div class="rounded-md h-40 bg-white">
                                <div class="h-full flex items-center justify-center text-2xl font-bold">
                                    <img :src="this.PORT+'/uploads/'+event.banner" class="max-w-full max-h-full w-full h-full rounded-md"/>
                                </div>     
                            </div>
                            <div v-if="event.isApprove===0" class="text-center">
                                <p class="capitalize">Wait for system to approve post</p>
                            </div>
                            <div>
                                <div class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize text-left">event</div>
                                <div class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm">{{event.event}}</div>
                            </div>
                            <div>
                                <div class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize text-left">schedule</div>
                                <div class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm">{{moment(event.schedule)}}</div>
                            </div>
                            <div>
                                <div class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize text-left">address</div>
                                <div class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm">{{event.address}}</div>
                            </div>
                            <div>
                                <div class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize text-left">description</div>
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
            <Bottombar/>
        </div>
        <ModalAdd @loader="nowLoading" @loading="nowLoading" class="animate__animated animate__bounceInDown" id="modal_add" v-if="this.isShowAddForm" @callremove="removeForm"/>
    </div>
</template>

<script>
    import axios from 'axios'
    import Topbar from '../layout/header.vue'
    import Bottombar from '../layout/footer.vue'
    import Swal from 'sweetalert2'
    import moment from 'moment'
    import ModalAdd from './student_modalAdd_event.vue'
    import Loader from '../layout/loader.vue'
    export default {
        name: 'event-post',
        components: {
            Topbar,
            Bottombar,
            ModalAdd,
            Loader
        },
        data(){
            return {
                events : [],
                message: false,
                isShowAddForm: false,
                isLoader : 'loader-hide',
            }
        },
        mounted(){
            this.getGallery('all');
        },
        methods: {
            showAddForm(){
                this.isShowAddForm = true
            },
            removeForm(){
                this.isShowAddForm = false
            },
            moment: function (date) {
                return moment(date).format('MMM D, YYYY h:mm A');
            },
            filterData(filter){
                if(filter!==''){
                    this.getGallery(filter);
                }else{
                    this.getGallery('all');
                }
                
            },
            nowLoading(){
                this.getGallery('all');
                if(this.isLoader==='loader-hide'){
                    this.isLoader = 'loader-display';
                }else{
                    this.isLoader = 'loader-hide'
                }
            },
            async getGallery(filter){
                const token = localStorage.getItem('token');
                const id = JSON.parse(localStorage.getItem('student')).id
                try {
                    const res = await axios.get(`${this.PORT}/auth/student/events/${filter}/${id}`, {
                        headers: {
                            authorization : `bear ${token}`
                        }
                    })
                    if((res.data.rows).length!=0){
                        this.events = res.data.rows;
                        this.message = false;
                    }else{
                        this.message = true
                        this.events = []
                    }
                } catch (error) {
                    console.log(error)
                }finally{
                    this.loadingContent = false;
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
