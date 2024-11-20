<template>
    <div class="bg-gray-50 dark:bg-gray-900 w-screen overflow-x-hidden flex flex-row">
        <Adminheader/>
        <Loader v-bind:isLoader='isLoader'/>
        <div class="flex flex-col w-full">
            <Navbar/>
            <div class="w-full mt-[13%] ml-[8%] md:mt-[5%] md:ml-[20.5%] text-white animate__animated animate__fadeIn md:pl-4 md:px-4">
                <h1 class="text-3xl pb-4 tracking-tight text-gray-900 dark:text-white  font-bold">Gallery</h1>
                <div class="md:w-[78%] w-[87%] flex items-end justify-end">
                    <button class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onclick="document.getElementById('modal_add').classList.remove('hidden')">New post</button>
                </div>
                <div class="grid md:grid-cols-3 gap-4 w-[82%] md:w-[78%] h-96 mt-5 rounded-md">    
                    <div v-for="(data, index) in this.gallery" :key="index">
                        <div class="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 px-4 py-5 shadow-lg">
                            <div class="rounded-md h-40 bg-white">
                                <div class="h-full flex items-center justify-center text-2xl font-bold">
                                        <img :src="this.PORT+'/uploads/'+data.image" class="max-w-full max-h-full w-full h-full rounded-md"/>
                                    </div>     
                                </div>
                            <div>
                                <div for="caption" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">caption</div>
                                <div class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm h-16 overflow-y-scroll">{{data.caption}}</div>
                            </div>
                            <div>
                                <div for="caption" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date post: {{moment(data.date_upload)}}</div>
                            </div>
                            <div class="flex gap-x-2 mt-2">
                                <!-- <button class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" @click="editGallery(index)">Edit</button> -->
                                <button class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" @click="delateGallery(data.id)">Delete</button>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>     
        </diV>
        <ModalAdd @loading="nowLoading" class="animate__animated animate__bounceInDown hidden" id="modal_add"/>
        <ModalEdit class="animate__animated animate__bounceInDown hidden" id="modal_edit" v-bind:gallery_data='gallery_data'/>
    </div>
</template>            

<script>
import Adminheader from './../layout/admin_header.vue'
import Navbar from './../layout/admin_navbar.vue'
import ModalAdd from './admin_modalAdd_gallery.vue'
import ModalEdit from './admin_modalEdit_gallery.vue'
import axios from 'axios';
import Swal from 'sweetalert2'
import moment from 'moment'
import Loader from '../layout/loader.vue'

// const PORT = "http://localhost:8080/auth";

export default {
    components: {
        Adminheader,
        Navbar,
        ModalAdd,
        ModalEdit,
        Loader
    },
    data(){
        return{
            gallery : [],
            gallery_data: {},
            isLoader : 'loader-hide'
        }
    },
    mounted(){
        this.getGallery();
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
            return moment(date).format('MMM D, YYYY');
        },
        async getGallery(){
            const res = await axios.get(`${this.PORT}/auth/admin/gallery`)
            this.gallery = res.data.rows;
        },
        async delateGallery(id){
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
                try {
                     await axios.delete(`${this.PORT}/auth/admin/deleteGallery`,
                    {
                        headers:{
                            'Content-type':'application/x-www-form-urlencoded',
                            "authorization" : `bearer ${token}`,
                        },
                        data: {
                            id: id
                        }
                    })
                    this.nowLoading();
                    Swal.fire({
                        position: "center",
                        title: `Delete`,
                        text: `Delete success`,
                        showConfirmButton: false,
                        timer: 1000,
                        icon: "success"
                    }).then(()=>{
                        this.getGallery()
                    });

                } catch (error) {
                    console.log(error)
                }
            }
            });
        },
        editGallery(index){
            // alert(index)
            document.getElementById('modal_edit').classList.remove('hidden')
            this.gallery_data = this.gallery[index];
        }
    }
}
</script>
