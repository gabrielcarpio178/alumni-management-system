<template>
    <div class="bg-gray-50 dark:bg-gray-900 w-screen overflow-x-hidden flex flex-row">
        <Adminheader/>
        <Loader v-bind:isLoader='isLoader'/>
        <div class="flex flex-col w-full">
            <Navbar/>
            <div class="overflow-x-hidden mt-14 md:w-[78%] md:mt-[5%] md:ml-[20.5%] dark:text-white animate__animated animate__fadeIn px-2 md:pl-4 md:px-4 -z-1">
                <h1 class="text-3xl pb-4 tracking-tight text-gray-900 dark:text-white  font-bold">Jobs</h1>
                <div class="text-2xl text-red-600" v-if="this.message">No Jobs Posted</div>
                <div v-if="this.loadingContent" class="w-full flex items-center justify-center">
                    Please Wait...
                </div>
                <div v-if="!this.loadingContent" class="md:p-3.5 dark:text-white w-full">
                    <div class="text-center w-full flex flex-col gap-2">
                        <div class="grid md:grid-cols-2 gap-2 md:mr-5">
                            <div v-for="(job, index) in this.jobs" :key="index">
                                <div class="rounded-lg border bg-gray-200 dark:bg-gray-800 dark:border-gray-700 px-4 py-5 shadow-lg flex flex-col items-start">
                                    <div class="w-full mb-2 flex flex-col justify-center items-center">
                                        <div class="relative mx-auto w-36 h-36 rounded-full">
                                            <img class="shadow rounded-full w-36 h-36 object-center" :src="job.profile_pic===null?getThumbnel(job.firstname, job.lastname):`${this.PORT}/uploads/${job.profile_pic}`" :alt="job.firstname+' '+job.lastname" />
                                        </div>
                                        <div class="text-center capitalize text-2xl font-bold">
                                            {{job.firstname}} {{job.lastname}}
                                        </div>
                                    </div>
                                    <div>
                                        Company Name: <span class="capitalize">{{job.company_name}}</span>
                                    </div>
                                    <div>
                                        Job Title: <span class="capitalize">{{job.job_title}}</span>
                                    </div>
                                    <div>
                                        Location: <span class="capitalize">{{job.location}}</span>
                                    </div>
                                    <div>
                                        Date Post: <span class="capitalize">{{moment(job.datepost)}}</span>
                                    </div>
                                    <div class="w-full mt-2">
                                        <button class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 uppercase" @click="viewJob(index)">View</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>    
        </div> 
        <ViewJobs v-if="isShow_Jobs" class="animate__animated animate__bounceInDown" v-bind:job='job' @callremovejob="removejobs" @getNewData="getData" @loading="nowLoading"/>   
    </div>    
</template>

<script>
import Adminheader from './../layout/admin_header.vue';
import Loader from '../layout/loader.vue'
import Navbar from './../layout/admin_navbar.vue'
import axios from 'axios';
import moment from 'moment';
import ViewJobs from './viewJob.vue'

export default {
    components: {
        Adminheader,
        Navbar,
        ViewJobs,
        Loader
    },
    data(){
        return{
            jobs : [],
            job: {},
            isShow_Jobs: false,
            isLoader : 'loader-hide',
            message: false,
            loadingContent: true
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        getThumbnel(firstname, lastname){
            return `https://ui-avatars.com/api/?name=${firstname}+${lastname}`
        },
        moment: function (date) {
            return moment(date).format('MMM. D, YYYY');
        },
        nowLoading(){
            if(this.isLoader==='loader-hide'){
                this.isLoader = 'loader-display';
            }else{
                this.isLoader = 'loader-hide'
            }
        },
        async getData(){
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get(`${this.PORT}/auth/admin/jobs`,{
                    headers:{
                        'Content-type':'application/x-www-form-urlencoded',
                        "authorization" : `bearer ${token}`,
                    }
                })
                if(res.data.rows.length===0){
                    this.message = true;
                }
                this.jobs = res.data.rows
            } catch (error) {
                console.log(error);
            }finally{
                this.loadingContent = false;
            }
        },
        viewJob(index){
            this.job = this.jobs[index];
            this.job.isViewJob = true;
            this.job.admin = true;
            this.isShow_Jobs = true;
        },
        removejobs(){
            this.isShow_Jobs = false;
        }
    }

}
</script>
