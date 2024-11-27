<template>
    <div class="bg-gray-50 dark:bg-gray-900 flex flex-col gap-10 w-full overflow-x-hidden">
        <Topbar/>
        <div class="h-screen xl:h-full dark:text-white w-screen animate__animated animate__fadeIn">
            <div class="w-screen md:p-20 md:mt-0 mt-10 px-10 pt-28 flex flex-col gap-2">
                <h1 class="mt-5 text-center text-2xl font-bold">
                    Alumni List
                </h1>
                <div class="rounded-lg bg-gray-200 dark:bg-gray-800 dark:border-gray-700 px-4 py-5 shadow-lg flex flex-col gap-x-3 text-black dark:text-white md:w-1/4">
                    <label for="search" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search</label>
                    <input type="text" name="search" id="search" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" v-model="this.search" @input="this.getAlumni_data(this.search)" required="">
                </div>
                <div class="grid md:grid-cols-3 gap-2">
                    <div v-for="(alumni, index) in this.getAlumni" :key="index" class="rounded-lg bg-gray-200 dark:bg-gray-800 dark:border-gray-700 px-4 py-5 shadow-lg flex flex-row gap-x-3 text-black dark:text-white">
                        <div class="w-1/2 mb-2 flex flex-col items-center gap-y-2 h-full">
                            <div class="relative w-20 h-20 rounded-full">
                                <img class="shadow-lg rounded-full w-20 h-20 object-center" :src="alumni.profile_pic===null?getThumbnel(alumni.firstname, alumni.lastname):`${this.PORT}/uploads/${alumni.profile_pic}`" :alt="alumni.firstname+' '+alumni.lastname" />
                            </div>
                            <div class="capitalize text-nowrap">
                                {{alumni.firstname +" "+alumni.lastname}}
                            </div>
                            <div class="text-xs capitalize self-start indent-3">
                                <div>Batch </div>
                                <div class="rounded shadow-lg dark:bg-gray-800 dark:border-gray-700 p-1">{{alumni.batch}}</div>
                            </div>
                            <div class="text-xs capitalize self-start indent-3">
                                <div>Email </div>
                                <div class="rounded shadow-lg dark:bg-gray-800 dark:border-gray-700 p-1">{{alumni.email}}</div>
                            </div>
                            <div class="text-xs capitalize self-start indent-3">
                                <div>Phone Number </div>
                                <div class="rounded shadow-lg dark:bg-gray-800 dark:border-gray-700 p-1">{{alumni.contact_num}}</div>
                            </div>
                            
                        </div>
                        <div class="w-1/2 h-full">
                            <div class="text-xs capitalize">
                                Accomplishment
                            </div>
                            <div class="w-full h-full flex flex-col mt-2">
                                <div v-if="alumni.accomplishments[0]===null" class="capitalize text-nowrap  text-xs p-1">No Accomplishments Added</div>
                                <div v-for="(data, index) in alumni.accomplishments" :key="index">
                                    <div v-if="data!==null" class="capitalize rounded shadow-lg dark:bg-gray-800 dark:border-gray-700  text-xs p-1">{{data}}</div>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
            <Bottombar/>
        </div>        
    </div>    
</template>

<script>
import Topbar from '../layout/header.vue'
import Bottombar from '../layout/footer.vue'
import axios from 'axios'
export default {
    name: 'alumni',
    components: {
        Topbar,
        Bottombar
    },
    data(){
        return {
            getAlumni: []
        }
    }
    ,
    mounted(){
        this.getAlumni_data('all');
    },
    methods: {
        getThumbnel(firstname, lastname){
            return `https://ui-avatars.com/api/?name=${firstname}+${lastname}`
        },
        async getAlumni_data(search){
            const token = localStorage.getItem('token');
            const student_id = JSON.parse(localStorage.getItem('student')).id;
            search = search!==''?search:'all'
            try {
                const res = await axios.get(`${this.PORT}/auth/student/getAlumni/${search}/${student_id}`,{
                    headers:{
                        'Content-type':'application/x-www-form-urlencoded',
                        "authorization" : `bearer ${token}`,
                    }
                })
                this.getAlumni = res.data.data_result;
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>