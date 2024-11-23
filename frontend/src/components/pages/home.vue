<template>
    <div class="bg-gray-50 dark:bg-gray-900 flex flex-col gap-10 w-full overflow-x-hidden">
        <Topbar/>
        <Participants v-if="this.isParticipant" v-bind:loadingParticipant="loadingParticipant" v-bind:participants="participants" v-bind:event_id="event_id" v-bind:isAlreadyParticipate="isAlreadyParticipate" class="animate__animated animate__bounceInDown" @remove="remove" @loading="nowLoading"/>
        <Loader v-bind:isLoader='isLoader'/>
        <div class="h-screen xl:h-full dark:text-white w-screen animate__animated animate__fadeIn">
            <div class="text-center w-screen pt-32 flex flex-col gap-2">
                <h1 class="text-3xl font-bold">
                    Welcome Alumni
                </h1>
                <p class="text-md">
                    This website is exlusive for i-tech graduates
                </p>
            </div>
            <div class="mt-10 text-center text-xl">
                Upcoming Events
            </div>
            <div v-if="this.isNoPost" class="text-red-600 w-full h-[40vh]">
                No Events Post
            </div>
            <div v-if="this.loadingContent" class="dark:text-white text-black h-[40vh] w-full flex items-center justify-center">
                Please Wait...
            </div>
            <div class="flex flex-col w-screen md:px-20 mt-10 gap-y-5 px-10">
                <div v-for="(data, index) in this.datas" :key="index" class="w-full flex flex-col md:flex-row p-3 bg-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                    <div class="md:w-1/2 h-80">
                        <img :src="this.PORT+'/uploads/'+data.banner" alt="banner" class="max-w-full max-h-full w-full h-full">
                    </div>
                    <div class="dark:text-white md:w-1/2 text-center px-3 xl:flex xl:flex-col xl:text-2xl xl:items-center xl:justify-center relative">
                        <div class="font-bold text-xl xl:text-3xl uppercase">
                            {{data.event}}
                        </div>
                        <p class="text-xl mb-1">
                            {{moment(data.schedule)}}
                        </p>
                        <p class="text-xl mb-1 capitalize">
                            @ {{data.address}}
                        </p>
                        <hr>
                        <div class="text-sm italic text-center">
                            {{data.description}}
                        </div>
                        <div class="w-full md:mt-5 mt-3">
                            <button class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" @click="this.viewevent(data.id)">View Participants</button>
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
    import Participants from './participants.vue'
    import axios from 'axios'
    import moment from 'moment'
    import Swal from 'sweetalert2'
    import Loader from '../layout/loader.vue'
    export default {
        name: 'home',
        components: {
            Topbar,
            Bottombar,
            Participants,
            Loader
        },
        data(){
            return {
                datas: [],
                isNoPost: false,
                isParticipant: false,
                participants: [],
                isLoader : 'loader-hide',
                loadingContent: true
            }
        },
        mounted(){
            this.getdata();
        },
        methods: {
            nowLoading(){
                this.getdata();
                if(this.isLoader==='loader-hide'){
                    this.isLoader = 'loader-display';
                }else{
                    this.isLoader = 'loader-hide'
                }
            },
            moment(date) {
                return moment(date).format('MMMM D, YYYY - h:mm a');
            },
            async getdata(){
                try {
                    var datas_rows = await axios.get(`${this.PORT}/auth/events`);
                    this.isNoPost = datas_rows.data.rows.length===0
                    this.datas = datas_rows.data.rows;
                } catch (error) {
                    console.log(error);
                }finally{
                    this.loadingContent = false;
                }
            },
            async viewevent(id){
                if(!this.isLogin){
                    Swal.fire({
                        position: "center",
                        title: `Warning`,
                        text: `Please Login to view`,
                        showConfirmButton: true,
                        icon: "warning"
                    }).then(result=>{
                        if(result.isConfirmed){
                            window.location = '/login'
                        }
                    });
                }else{
                    this.isParticipant = true
                    this.loadingParticipant = false;
                    const token = localStorage.getItem('token');
                    var user_id = JSON.parse(localStorage.getItem('student')).id;
                    try {
                        var res = await axios.get(`${this.PORT}/auth/participants/${id}`, {
                            headers:{
                                'Content-type':'application/x-www-form-urlencoded',
                                "authorization" : `bearer ${token}`,
                            }
                        })
                        this.participants = res.data.rows
                        this.event_id = id;
                        let arrayOfIds = []; 
                        res.data.rows.map(row=>{
                            arrayOfIds.push(row.id)
                        })
                        this.isAlreadyParticipate = arrayOfIds.includes(parseInt(user_id))
                    } catch (error) {
                        console.log(error);
                    }finally{
                        this.loadingParticipant = true;
                    }
                    
                    
                }
            },
            remove(){
                this.isParticipant = !this.isParticipant
            }
            
        }

    }
</script>
