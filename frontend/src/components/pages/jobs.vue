<template>
    <div class="bg-gray-50 dark:bg-gray-900 flex flex-col gap-10 w-full overflow-x-hidden">
        <Topbar/>
        <div class="h-screen xl:h-full dark:text-white w-full animate__animated animate__fadeIn flex flex-col">
            
            <div class="text-center w-full pt-28 flex flex-col gap-2">
                <h1 class="text-2xl font-bold">
                    Job Opportunity
                </h1>
                
                <router-link to="/jobs/view-job" type="submit" class="w-[22%] md:w-[10%] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 md:absolute right-5 self-end mr-2 md:mr-0">Your Post</router-link>
                <div v-if="this.isNoPost" class="text-red-600 w-full h-[40vh]">
                    No Job Post Available
                </div>
                <div class="grid md:grid-cols-3 gap-2 p-10 mr-5">
                    <div v-for="(job, index) in this.jobs" :key="index">
                        <div class="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 px-4 py-5 shadow-lg flex flex-col items-start">
                            <div class="w-full mb-2 flex flex-col justify-center items-center">
                                <div class="relative mx-auto w-36 h-36 rounded-full">
                                    <img class="rounded-full w-36 h-36 object-center" :src="job.profile_pic===null?getThumbnel(job.firstname, job.lastname):`${this.PORT}/uploads/${job.profile_pic}`" :alt="job.firstname+' '+job.lastname" />
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
            <Bottombar/> 
        </div>
        <ViewJobs v-if="isShow_Jobs" class="animate__animated animate__bounceInDown" v-bind:job='job' @callremovejob="removejobs"/> 
    </div>     
</template>

<script>
    import Topbar from '../layout/header.vue'
    import Bottombar from '../layout/footer.vue'
    import axios from 'axios';
    import ViewJobs from './viewJob.vue'
    import moment from 'moment';

    export default {
        name: 'jobs',
        components: {
            Topbar,
            Bottombar,
            ViewJobs
        },
        data(){
            return {
                isShow_Jobs: false,
                jobs : [],
                job: {},
                id: JSON.parse(localStorage.getItem('student')).id,
                isNoPost: false
            }
        },
        mounted(){
            this.getData();
        },
        methods: {
            moment: function (date) {
                return moment(date).format('MMM. D, YYYY');
            },
            getThumbnel(firstname, lastname){
                return `https://ui-avatars.com/api/?name=${firstname}+${lastname}`
            },
            async getData(){
                const token = localStorage.getItem('token');
                const id = JSON.parse(localStorage.getItem('student')).id
                try {
                    const res = await axios.get(`${this.PORT}/auth/jobs/${id}`,{
                        headers:{
                            'Content-type':'application/x-www-form-urlencoded',
                            "authorization" : `bearer ${token}`,
                        }
                    })
                    this.isNoPost = res.data.rows.length===0
                    this.jobs = res.data.rows
                } catch (error) {
                    console.log(error);
                }    
            },
            viewJob(index){
                this.job = this.jobs[index];
                this.job.isViewJob = false;
                this.job.admin = false;
                this.isShow_Jobs = true;
            },
            removejobs(){
                this.isShow_Jobs = false;
            }
        }
    }    
</script>    