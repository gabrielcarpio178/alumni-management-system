<template>
    <header class="fixed w-full z-[999]">
        <nav class="bg-gray-200 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <div class="flex items-center">
                    <img src="../image/itechlogo.png" class="mr-3 h-6 sm:h-9" alt="Itech logo" />
                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white capitalize">{{this.system_data.system_title}}</span>
                </div>
            </div>
        </nav>
    </header>
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


