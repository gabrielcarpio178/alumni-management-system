<template>
    <footer class="shadow-black shadow-md mt-5 bg-white dark:bg-gray-800 border-gray-200 dark:text-white w-screen">
        <div class="text-center py-1">
            <h1 class="text-3xl font-bold">Contact Us</h1>
            <div class="flex md:flex-row flex-col items-center justify-center gap-10">
                <div class="flex flex-row items-center gap-x-3">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" viewBox="0 0 24 24" class="dark:fill-white">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25c1.12.37 2.32.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02z"/>
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold">
                        {{this.system_data.contact_number}}
                    </h2>
                </div>
                <div class="flex flex-row items-center gap-x-3">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" viewBox="0 0 24 24" class="dark:fill-white">
                            <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z" />
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold">
                        <a :href="'mailto:'+this.system_data.email">{{this.system_data.email}}</a>
                    </h2>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import axios from "axios";

export default{
    data(){
        return{
            system_data : {},
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        async getData(){
            try {
                const res = await axios.get(`${this.PORT}/auth/admin/system_setting`)
                
                this.system_data = res.data.row
            } catch (error) {
                console.log(error)
            }
            
        },
    }
}
</script>

