<template>
    
    <div class="flex flex-row overflow-y-auto overflow-x-hidden fixed bottom-0 md:top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
        <div class="m-10 w-full max-w-sm md:w-1/2 relative">
            <div class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white absolute right-1 top-1" @click="remove">
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </div>
            <div class="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 px-4 py-5 shadow-lg">
                <h1 class="my-1 text-center text-xl font-bold leading-8 text-white capitalize">Participants</h1>
                <div class="flex flex-col gap-y-5 mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm">
                    <div class="flex flex-col gap-y-3">
                        <div v-if="this.participants.length===0" class="flex flex-row gap-x-2 px-1 py-2 rounded-lg shadow-lg">
                            No Participants
                        </div>
                        <div v-for="(participate, index) in this.participants" :key="index" class="flex flex-row gap-x-2 px-1 py-2 rounded-lg shadow-lg">

                            <div class="w-12 h-10 flex flex-row items-center justify-center">
                                <img :src="participate.profile_pic===null?getThumbnel(participate.firstname, participate.lastname):`${this.PORT}/uploads/${participate.profile_pic}`">
                            </div>
                            <div class="flex flex-col justify-center w-40 h-10 px-3">
                                <div class="text-lg font-medium capitalize">
                                    {{participate.firstname+" "+participate.lastname}}
                                </div>
                                <div class="text-sm">Batch: {{participate.batch}}</div>
                            </div>
                            <div class="w-20 h-10 whitespace-nowrap flex flex-col justify-center">
                                Course: {{participate.course}}
                            </div>
                        </div>
                        
                        <button type="button" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="participate" v-if="!this.isAlreadyParticipate">participate</button>
                        <button type="button" class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" @click="cancel_participate" v-if="this.isAlreadyParticipate">Cancel Participate</button>
                        
                    </div>
                    
                    
                </div>    
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    methods:{
        remove(){
            this.$emit('remove');
        },
        getThumbnel(firstname, lastname){
            return `https://ui-avatars.com/api/?name=${firstname}+${lastname}`
        },
        async participate(){
            this.$emit('loading');
            var token = localStorage.getItem('token');
            var id = JSON.parse(localStorage.getItem('student')).id;
            var event_id = this.event_id;
            try {
                var res = await axios.post(`${this.PORT}/auth/participate/alumni`, {
                    student_id: id,
                    event_id: event_id
                    },
                    {
                    headers:{
                        'Content-type':'application/x-www-form-urlencoded',
                        "authorization" : `bearer ${token}`,
                    }
                })
                if(res.data.message === 'you already participate'){
                    Swal.fire({
                        position: "center",
                        title: `Warning`,
                        text: 'You Already Participate',
                        showConfirmButton: false,
                        timer: 1000,
                        icon: "warning"
                    })
                }else{
                    Swal.fire({
                        position: "center",
                        title: `Success`,
                        text: 'Participate Success',
                        showConfirmButton: false,
                        timer: 1000,
                        icon: "success"
                    })
                }
                
            } catch (error) {
                console.log(error)
            }finally{
                this.$emit('loading');
                this.$emit('remove');
            }
            
        },
        async cancel_participate(){

            this.$emit('loading');
            var token = localStorage.getItem('token');
            var id = JSON.parse(localStorage.getItem('student')).id;
            var event_id = this.event_id;
            try {

                var res = await axios.delete(`${this.PORT}/auth/participate/delete`, {
                    headers:{
                        'Content-type':'application/x-www-form-urlencoded',
                        "authorization" : `bearer ${token}`,
                    },
                    data: {
                        id,
                        event_id
                    }
                })
                if(res.data.message === 'cancel success'){
                    Swal.fire({
                        position: "center",
                        title: `Success`,
                        text: 'Cancel Participate',
                        showConfirmButton: false,
                        timer: 1000,
                        icon: "success"
                    })
                }
                
            } catch (error) {
                console.log(error)
            }finally{
                this.$emit('loading');
                this.$emit('remove');
            }

        }
        
    },
    props: ['participants', 'event_id', 'isAlreadyParticipate']
}
</script>


