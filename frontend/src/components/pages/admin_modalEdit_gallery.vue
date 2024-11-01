<template>
    <div id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="flex flex-row overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
        <div class="m-10 max-w-sm w-1/2 relative">
            <div class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white absolute right-1 top-1" @click="closeModal">
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </div>
            <div class="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 px-4 py-5 shadow-lg">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Edit Post
                </h1>
                <form class="space-y-1 md:space-y-2" @submit="editPost" enctype="multipart/form-data">
                    <div class="rounded-md h-80 bg-white">
                       <div class="h-full flex items-center justify-center text-2xl font-bold cursor-pointer" onclick="document.getElementById('upload_img').click()"> 
                            <img :src='this.image' class="max-w-full max-h-full w-full h-full rounded-md"/>
                        </div>     
                    </div>
                    <div class="text-red-500 py-0 px-0 capitalize" id="message">
                        {{message}}
                    </div>
                    <input type="file" ref="file" class="hidden" id="upload_img" @change="onSelect">
                    <div>
                        <label for="caption" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">caption</label>
                        <textarea type="text"  name="caption" id="caption" placeholder="caption" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" :value="gallery_data.caption"></textarea>
                    </div>
                   
                    <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" :disabled="message!=''">Edit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'

const PORT = "http://localhost:8080/auth";
export default  {
    data(){
        return {
            file: "",
            message: "",
            image: "http://localhost:8080/uploads/",
            port: "http://localhost:8080/uploads/",
        };
    },
    methods:{
        closeModal(){
            document.getElementById('modal_edit').classList.add('hidden')
        },
        onSelect() {
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
            const file = this.$refs.file.files[0];
            this.file = file;
            if (!allowedTypes.includes(file.type)) {
                this.message = "Filetype is wrong!!";
            }
            if (file.size > 10000000) {
                this.message = "Too large, max size allowed is 1000kb";
            }
            if(allowedTypes.includes(file.type)&&!(file.size > 10000000)){
                this.createImage(file);
                this.message = ""
            }
        },
        createImage(file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.gallery_data.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
    },
    props: ['gallery_data']
}
</script>
