<template>
    <div class="flex flex-row overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
        <div class="m-10 max-w-sm w-3/4 md:w-1/2 relative">
            <div class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white absolute right-1 top-1" @click="callremove">
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </div>
            <div class="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 px-4 py-5 shadow-lg">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Post jobs
                </h1>
                <form class="space-y-1 md:space-y-2 p-2" @submit="addPost">

                    <div>
                        <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">company</label>
                        <input type="text" name="company" v-model="company" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Company" required="">
                    </div>

                    <div>
                        <label for="job_title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">job title</label>
                        <input type="text" name="job_title" v-model="job_title" id="job_title" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Job Title" required="">
                    </div>

                    <div>
                        <label for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">location</label>
                        <input type="text" name="location" v-model="location" id="location" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Location" required="">
                    </div>
                    
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">email</label>
                        <input type="email" name="email" v-model="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required="">
                    </div>

                    <div>
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">description</label>
                        <textarea type="text" name="description" id="description" v-model="description" placeholder="Description" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></textarea>
                    </div>
                    <div class="flex gap-3">
                        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 uppercase">Sumbit</button>
                        
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default{
    methods:{
        callremove(){
            this.$emit('callremove')
        },
        loading(){
            this.$emit('loading')
        },
        async addPost(e){
            e.preventDefault();
            const token = localStorage.getItem('token');
            const id = JSON.parse(localStorage.getItem('student')).id;
            this.loading();
            try {
                var res = await axios.post(`${this.PORT}/auth/jobs/post`,
                {
                    posted_user: id,
                    company: this.company,
                    job_title: this.job_title,
                    location_data: this.location,
                    email: this.email,
                    description: this.description
                },
                {
                headers:{
                    'Content-type':'application/x-www-form-urlencoded',
                    "authorization" : `bearer ${token}`,
                }
            })
            if(res.data.message==='post success'){
                Swal.fire({
                    position: "center",
                    title: `Success`,
                    text: `Post Success.`,
                    showConfirmButton: false,
                    timer: 1000,
                    icon: "success"
                }).then(()=>{
                    this.company = '';
                    this.job_title = '';
                    this.location = '';
                    this.email = '';
                    this.description = '';
                });
            }
            } catch (error) {
                consol.log(error);
            } finally{
                this.$emit('getNewData')
                this.loading();
                this.callremove(); 
            }
        },

        
    }
}
</script>