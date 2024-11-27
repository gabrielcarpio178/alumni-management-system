<template>
    <div class="flex flex-row overflow-y-scroll overflow-x-hidden fixed top-4 z-[9999] justify-center items-center w-full md:inset-0 h-full">
        <div class="mt-5 md:mt-20 max-w-sm w-full md:w-1/2 relative">
            <div class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white absolute right-1 top-1" @click="closemodal">
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </div>
            <div class="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 px-4 py-5 shadow-lg">
                <div class="text-center">Fullname</div>
                <h1 class="my-1 text-center text-xl font-bold leading-8 text-white capitalize">{{`${alumni_data.firstname} ${alumni_data.middlename} ${alumni_data.lastname}`}}</h1>
                <h2 class="text-black dark:text-grey text-sm dark:text-gray-400">Accomplishments</h2>
                <div class="w-full grid grid-cols-2 grid-rows-2 gap-2 p-1">
                    <div v-for="(accomplishment, index) in alumni_data.accomplishments" :key="index">
                        <div v-if="accomplishment!==null" class="capitalize rounded border border-white shadow-lg dark:bg-gray-800 dark:border-gray-700 md:text-sm text-xs p-1">{{accomplishment}}</div>
                        <div v-else class="capitalize rounded md:text-sm text-xs">No Accomplishments yet</div>
                    </div>
                    
                </div>
                <ul class="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm">
                    <li class="flex items-center py-3 text-sm">
                        <span>Email</span>
                        <span class="ml-auto">{{alumni_data.email}}</span>
                    </li>
                    <li class="flex items-center py-3 text-sm">
                        <span>Phone number</span>
                        <span class="ml-auto">{{alumni_data.contact_num}}</span>
                    </li>
                    <li class="flex items-center py-3 text-sm">
                        <span>Student ID</span>
                        <span class="ml-auto">{{alumni_data.student_id}}</span>
                    </li>
                    <li class="flex items-center py-3 text-sm">
                        <span>Course</span>
                        <span class="ml-auto">{{alumni_data.course_name}}</span>
                    </li>
                    <li class="flex items-center py-3 text-sm">
                        <span>Batch</span>
                        <span class="ml-auto">{{alumni_data.batch}}</span>
                    </li>
                    <li class="flex items-center py-3 text-sm">
                        <span>Status</span>
                        <span class="ml-auto"><span class="rounded-full py-1 px-2 text-xs font-medium" :class="alumni_data.status==1?'bg-green-200 text-green-700':'bg-red-200 text-red-700'">{{alumni_data.status===0?"Deactivate":"Activate"}}</span></span>
                    </li>
                </ul>
                
                <div class="flex flex-row mt-3 gap-x-2">
                    <button type="button" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" @click="updateStatus(1, alumni_data.id, alumni_data.email)" v-if="alumni_data.status!=1">Activate</button>
                    <button type="button" class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" @click="updateStatus(0, alumni_data.id, alumni_data.email)" v-if="alumni_data.status==1">Deactivate</button>
                    <button type="button" class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" @click="deleteReq(alumni_data.id, alumni_data.email, alumni_data.profile_pic)" v-if="alumni_data.status!=1">Delete Request</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'

export default  {
    methods: {
        closemodal(){
            document.querySelector("#modal_content").classList.add('hidden')
        },
        getThumbnel(firstname, lastname){
            return `https://ui-avatars.com/api/?name=${firstname}+${lastname}`
        },
        async updateStatus(status, id, email){
            Swal.fire({
                title: "Are you sure?",
                text: `You want to ${status!=0?'Activate':'Deactivate'}`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: `Yes, ${status!=0?'Activate':'Deactivate'} it!`
                }).then(async (result) => {
                if (result.isConfirmed) {
                    this.$emit('loader');
                    const token = localStorage.getItem('token');
                    const updateData = {
                        id: id,
                        status: status,
                        email : email
                    }
                    try {
                        const res = await axios.put(`${this.PORT}/auth/admin/user_statsUpdate`,
                            updateData,
                            {
                                headers:{
                                    'Content-type':'application/x-www-form-urlencoded',
                                    "authorization" : `bearer ${token}`,
                                }
                            }
                        );
                        if(res.data.message==='update success'){
                            this.$emit('loader');
                            Swal.fire({
                                position: "center",
                                title: `${status!=0?'Activate':'Deactivate'}`,
                                text: `Your account has been ${status!=0?'Activate':'Deactivate'}`,
                                showConfirmButton: false,
                                timer: 1500,
                                icon: "success"
                            }).then(()=>{
                                window.location = '/alumni-list';
                            });
                        }
                        
                    } catch (error) {
                        console.log(error)
                    }
                    
                }
            });
        },
        async deleteReq(id, email, profile_pic){
            Swal.fire({
                title: "Are you sure?",
                text: `You want to delete`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: `Yes, delete it!`
            }).then(async (result) => {
                if(result.isConfirmed){
                    this.$emit('loader');
                    const token = localStorage.getItem('token');
                     try {
                        const res = await axios.delete(`${this.PORT}/auth/admin/deleteaccount`,
                        {
                            headers:{
                                'Content-type':'application/x-www-form-urlencoded',
                                "authorization" : `bearer ${token}`,
                            },
                            data: {
                                id: id,
                                email: email,
                                profile_pic: profile_pic
                            }
                        })

                        if(res.data.message==='delete success'){
                            this.$emit('loader');
                            Swal.fire({
                                position: "center",
                                title: `Delete Request`,
                                text: `Your account has been Delete`,
                                showConfirmButton: false,
                                timer: 1500,
                                icon: "success"
                            }).then(()=>{
                                window.location = '/alumni-list';
                            });
                        }

                    } catch (error) {
                        console.log(error);
                    }
                }
            })
            
        }
    },
    props: ['alumni_data']
}
</script>
