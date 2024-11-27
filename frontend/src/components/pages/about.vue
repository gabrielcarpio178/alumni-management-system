<template>
    <div class="bg-gray-50 dark:bg-gray-900 flex flex-col gap-10 w-full overflow-x-hidden">
        <Topbar/>
        <div class="h-screen xl:h-full dark:text-white w-screen animate__animated animate__fadeIn">
            <div class="mt-2 text-center w-screen pt-28 flex flex-col gap-2">
                <h1 class="text-3xl font-bold">
                    About Us
                </h1>

                <div v-if="this.loadingContent" class="h-[40vh] w-full flex items-center justify-center">
                    Please Wait...
                </div>

                <div v-if="!this.loadingContent" class="w-full h-[100vh] md:h-[54vh] flex md:flex-row flex-col px-10 md:px-28">
                    <div class="w-full md:w-1/2 flex flex-row items-center justify-center">
                        <img src="../image/itechlogo.png" class="max-h-[100%]" alt="Itech logo" />
                    </div>
                    <div class="w-full md:w-1/2 flex flex-row items-center justify-center text-center font-bold text-sm">
                        {{this.system_data.about}}
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
        name: 'home',
        components: {
            Topbar,
            Bottombar
        },
        data(){
            return {
                system_data: {},
                 loadingContent: true
                
            }
        },
        mounted(){
            this.getData();
        },
        methods: {
            async getData(){
                try {
                    const res = await axios.get(`${this.PORT}/auth/admin/system_setting`)
                    console.log(res.data.row)
                    this.system_data = res.data.row
                } catch (error) {
                    console.log(error)
                }finally{
                    this.loadingContent = false;
                }
                
            },
        }

    }
</script>
