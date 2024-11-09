<template>
    <div class="bg-gray-50 dark:bg-gray-900 w-screen overflow-x-hidden flex flex-row">
        <Adminheader/>
        <div class="flex flex-col w-full">
            <Navbar/>
            <div class="w-full mt-[5%] ml-[20.5%] text-white animate__animated animate__fadeIn pl-4 px-4">
                <h1 class="text-3xl pb-4 tracking-tight text-gray-900 dark:text-white  font-bold">Gallery</h1>
                <div class="w-[78%] flex items-end justify-end">
                    <button class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onclick="document.getElementById('modal_add').classList.remove('hidden')">New post</button>
                </div>
                <div class="grid grid-cols-3 gap-4 w-[78%] h-96 overflow-y-scroll mt-5 rounded-md">    
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
        <ModalAdd class="animate__animated animate__bounceInDown hidden" id="modal_add"/>
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

// const PORT = "http://localhost:8080/auth";

export default {
    components: {
        Adminheader,
        Navbar,
        ModalAdd,
        ModalEdit
    },
    data(){
        return{
            gallery : [],
            gallery_data: {}
        }
    },
    mounted(){
        this.getGallery();
    },
    methods: {
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
                await axios.delete(`${this.PORT}/auth/admin/deleteGallery`,
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
