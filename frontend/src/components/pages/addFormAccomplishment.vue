<template>
    <div class="flex flex-row overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
        <div class="m-10 max-w-sm w-3/4 md:w-1/2 relative">
            <div class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white absolute right-1 top-1" @click="this.$emit('removeAddAccomplishmentform')">
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </div>
            <div class="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 px-4 py-5 shadow-lg">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Add Accomplishment 
                </h1>
                <form class="space-y-2 p-2" @submit="addAccomplishment">
                    <div class="flex flex-col w-full">
                        <label for="accomplishment" class="capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Accomplishment
                        </label>
                        <input type="text" name="accomplishment" v-model="accomplishment" id="accomplishment" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Accomplishment" required>
                    </div>
                    <div class="flex gap-3">
                        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 uppercase">Add</button>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2';

export default {
    methods: {
        async addAccomplishment(e){
            e.preventDefault();
            this.$emit('isloder');
            const student_id = JSON.parse(localStorage.getItem('student')).id
            const token = localStorage.getItem('token');
            var accomplishment = this.accomplishment;
            try {
                const res = await axios.post(`${this.PORT}/auth/student/addAccomplishment`,
                    {
                        student_id, accomplishment
                    },
                    {
                    headers:{
                        'Content-type':'application/x-www-form-urlencoded',
                        "authorization" : `bearer ${token}`,
                    }
                })
                if(res.data.message==='success'){
                    Swal.fire({
                        position: "center",
                        title: `Success`,
                        showConfirmButton: false,
                        timer: 1500,
                        icon: "success",
                    });
                    this.accomplishment = ''
                    this.$emit('removeAddAccomplishmentform');
                    this.$emit('getAccomplishment');
                }
            } catch (error) {
                console.log(error)
            }finally{
                this.$emit('isloder');
            }
        }    
    }    
}
</script>
