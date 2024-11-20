<template>
    <div class="bg-gray-50 dark:bg-gray-900 flex flex-col gap-10 w-full overflow-x-hidden">
        <Topbar/>
        <Loader v-bind:isLoader='isLoader'/>
        <div class="h-screen xl:h-full dark:text-white w-screen animate__animated animate__fadeIn flex flex-col">
            <div class="text-center w-screen pt-28 flex flex-col gap-2">
                <h1 class="text-2xl font-bold">
                    Job Post
                </h1>
                <button type="submit" class="md:w-[10%] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 self-end w-[25%] md:absolute right-5 md:mr-0 mr-10" @click="show_form">Add Job</button>
                <div v-if="this.isNoPost" class="text-red-600 w-full h-[100vh]">
                    No Post Available
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
        <PostJobs v-if="isShow_form" class="animate__animated animate__bounceInDown" @callremove="removeProfle" @loading="nowLoading" @getNewData="getdata"/> 
        <EditJobs v-if="isShowEdit_form" class="animate__animated animate__bounceInDown" @callremove_edit="callremove_edit" v-bind:job='job' @loading="nowLoading" @getNewData="getdata"/> 
        <ViewJobs v-if="isShow_Jobs" class="animate__animated animate__bounceInDown" v-bind:job='job' @callremovejob="removejobs" @loading="nowLoading" @getNewData="getdata" @editForm ="showEditform"/> 
    </div>
</template>

<script>
import axios from 'axios';
import Topbar from '../layout/header.vue'
import PostJobs from './post_jobs.vue'
import EditJobs from './edit_jobs.vue'
import Loader from '../layout/loader.vue'
import ViewJobs from './viewJob.vue'
import moment from 'moment';
import Bottombar from '../layout/footer.vue'

export default{
    components: {
        Topbar, 
        PostJobs,   
        Loader,
        ViewJobs,
        EditJobs,
        Bottombar
    },
    data(){
        return{
            jobs : [],
            isShow_form: false,
            isShow_Jobs: false,
            isLoader : 'loader-hide',
            isShowEdit_form: false,
            job: {},
            isNoPost: false
        }
    },
    mounted(){
        this.getdata()
    },
    methods: {
        moment: function (date) {
                return moment(date).format('MMM. D, YYYY');
            },
        getThumbnel(firstname, lastname){
            return `https://ui-avatars.com/api/?name=${firstname}+${lastname}`
        },
        async getdata(){
            const token = localStorage.getItem('token');
            const id = JSON.parse(localStorage.getItem('student')).id;
            try {
                const res = await axios.get(`${this.PORT}/auth/jobs/${id}/user`, {
                    headers:{
                        'Content-type':'application/x-www-form-urlencoded',
                        "authorization" : `bearer ${token}`,
                    }
                })
                this.isNoPost = res.data.rows.length===0
                this.jobs = res.data.rows
                // console.log(res.data.rows);
            } catch (error) {
                console.log(error)
            }
        },
        removeProfle(){
            this.isShow_form = false;
        },
        show_form(){
            this.isShow_form = true;
        },
        nowLoading(){
            this.getdata();
            if(this.isLoader==='loader-hide'){
                this.isLoader = 'loader-display';
            }else{
                this.isLoader = 'loader-hide'
            }
        },
        viewJob(index){
            this.job = this.jobs[index];
            this.job.isViewJob = true;
            this.job.admin = false;
            this.isShow_Jobs = true;
        },
        removejobs(){
            this.isShow_Jobs = false;
        },
        showEditform(){
            this.removejobs()
            this.isShowEdit_form = true;
        },
        callremove_edit(){
            this.isShowEdit_form = false;
        },
    }
}
</script>


