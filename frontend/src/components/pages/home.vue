<template>
    <div class="bg-gray-50 dark:bg-gray-900 flex flex-col gap-10 w-full overflow-x-hidden">
        <Topbar/>
        <div class="h-screen xl:h-full text-white w-screen animate__animated animate__fadeIn">
            <div class="text-center w-screen pt-20 flex flex-col gap-2">
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
            <div class="flex flex-col w-screen px-20 mt-10 gap-y-5">
                <div v-for="(data, index) in this.datas" :key="index" class="flex flex-row p-3 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div class="w-1/2 h-80">
                        <img :src="this.PORT+'/uploads/'+data.banner" alt="banner" class="max-w-full max-h-full w-full h-full">
                    </div>
                    <div class="text-white w-1/2 text-center px-3 xl:flex xl:flex-col xl:text-2xl xl:items-center xl:justify-center relative">
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
                        <button class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 absolute bottom-0 right-0" @click="this.viewevent()">View More</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- <Bottombar/> -->
    </div>    
</template>

<script>
    import Topbar from '../layout/header.vue'
    import Bottombar from '../layout/footer.vue'
    import axios from 'axios'
    import moment from 'moment'
    import Swal from 'sweetalert2'
    export default {
        name: 'home',
        components: {
            Topbar,
            Bottombar
        },
        data(){
            return {
                datas: [],
            }
        },
        mounted(){
            this.getdata();
        },
        methods: {
            moment(date) {
                return moment(date).format('MMMM D, YYYY - h:mm a');
            },
            async getdata(){
                var datas_rows = await axios.get(`${this.PORT}/auth/events`);
                this.datas = datas_rows.data.rows;
            },
            viewevent(){
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
                }
            }
            
        }

    }
</script>
