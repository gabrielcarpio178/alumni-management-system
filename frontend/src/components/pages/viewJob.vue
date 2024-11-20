<template>
    <div class="flex flex-row overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[999] justify-center items-center w-full md:inset-0 h-full max-h-full">
        <div class="m-10 max-w-sm w-3/4 md:w-1/2 relative">
            <div class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white absolute right-1 top-1" @click="callremovejob">
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </div>
            <div class="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 px-4 shadow-lg flex flex-col items-start dark:text-white">
                <div class="w-full mb-2 flex flex-col justify-center items-center mt-5">
                    <div class="relative mx-auto w-36 h-36 rounded-full">
                        <img class="rounded-full w-36 h-36 object-center shadow-md" :src="job.profile_pic===null?getThumbnel(job.firstname, job.lastname):`${this.PORT}/uploads/${job.profile_pic}`" :alt="job.firstname+' '+job.lastname" />
                    </div>
                    <div class="text-center capitalize text-2xl font-bold">
                        {{job.firstname}} {{job.lastname}}
                    </div>
                </div>
                <div class="rounded shadow-md p-2 w-full flex flex-col gap-y-1 mb-3">
                    <div>
                        Company Name: <span class="capitalize">{{job.company_name}}</span>
                    </div>
                    <div>
                        Job Title: <span class="capitalize">{{job.job_title}}</span>
                    </div>
                    <div>
                        Location: <span class="capitalize">{{job.location}}</span>
                    </div>
                    <div class="capitalize">
                        alumni contact number: <span class="capitalize">{{job.contact_num}}</span>
                    </div>
                    <div class="capitalize">
                        Send resume to: <span class="uppercase underline text-sky-500"><a :href="'mailto:'+job.email">{{job.email}}</a></span>
                    </div>
                    <div>
                        Date Post: <span class="capitalize">{{moment(job.datepost)}}</span>
                    </div>
                    <div class="w-full flex flex-row gap-x-2 capitalize">
                        <div>
                            Description:
                        </div>
                        <div class="overflow-y-scroll h-24 w-[100%]">
                            {{job.description}}
                        </div>
                    </div>
                    <div class="flex flex-row gap-x-2 w-full m-1" v-if='job.isViewJob'>
                        <button v-if="!job.admin" type="button" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" @click="showForm">Edit</button>
                        <button type="button" class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" @click="deleteJob(job.id)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    methods: {
        moment: function (date) {
            return moment(date).format('MMM. D, YYYY');
        },
        getThumbnel(firstname, lastname){
            return `https://ui-avatars.com/api/?name=${firstname}+${lastname}`
        },
        callremovejob(){
            this.$emit('callremovejob')
        },
        loading(){
            this.$emit('loading')
        },
        showForm(){
            this.$emit('editForm');
        },
        deleteJob(id){
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
                this.loading()
                try {
                    const res = await axios.delete(`${this.PORT}/auth/jobs/delete`,{
                        headers:{
                            'Content-type':'application/x-www-form-urlencoded',
                            "authorization" : `bearer ${token}`,
                        },
                        data: {
                            id: id
                        }
                    })
                    if(res.date.message === 'delete success'){
                        Swal.fire({
                            position: "center",
                            title: `Delete`,
                            text: `Delete success`,
                            showConfirmButton: false,
                            timer: 1500,
                            icon: "success"
                        })
                    }
                } catch (error) {
                    console.log(error)
                } finally{
                    this.callremovejob()
                    this.loading()
                    this.$emit('getNewData')
                }
            }
            });
        }
    },
    props: ['job']
}
</script>
