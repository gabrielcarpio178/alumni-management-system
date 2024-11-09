<template>
    <div class="bg-gray-50 dark:bg-gray-900 flex flex-col gap-10 w-full overflow-x-hidden">
        <Topbar/>
        <div class="h-screen xl:h-full text-white w-screen animate__animated animate__fadeIn">
            <div class="w-screen p-20 flex flex-col gap-2">
                <div class="grid grid-cols-3 gap-6">
                    <div v-for="(data, index) in this.gallery_data" :key="index">
                        <div class="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 px-4 py-5 shadow-lg">
                            <div class="rounded-md h-40 bg-white">
                                <div class="h-full flex items-center justify-center text-2xl font-bold">
                                    <img :src="this.PORT+'/uploads/'+data.image" class="max-w-full max-h-full w-full h-full rounded-md"/>
                                </div>     
                            </div>
                            <div>
                                <div for="caption" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date post: {{moment(data.date_upload)}}</div>
                            </div>
                            <div>
                                <div for="caption" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">caption</div>
                                <div class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm h-16 overflow-y-scroll">{{data.caption}}</div>
                            </div>
                            
                        </div>
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
export default {
    name: 'gallery',
    components: {
        Topbar,
        Bottombar
    },

    data(){
        return {
            gallery_data: [],
        }
    },

    mounted(){
        this.getGalleryData();
    },

    methods: {
        moment: function (date) {
            return moment(date).format('MMM D, YYYY');
        },
        async getGalleryData(){
            const res = await axios.get(`${this.PORT}/auth/admin/gallery`)
            this.gallery_data = res.data.rows;
        }
    }
}    
</script>
