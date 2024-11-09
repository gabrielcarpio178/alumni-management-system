<template>
    <div class="bg-gray-50 dark:bg-gray-900 flex flex-col gap-10 w-full overflow-x-hidden">
        <Topbar/>
        <div class="h-screen xl:h-full text-white w-screen animate__animated animate__fadeIn">
            <section class="py-20 my-auto dark:bg-gray-900">
                <div class="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
                    <div class="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
                        <!--  -->
                        <div class="">
                            <h1 class="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
                                Profile
                            </h1>
                            <h2 class="text-grey text-sm mb-4 dark:text-gray-400">Create Profile</h2>

                            <form class="w-full">
                               <div class="flex justify-center">
                                    <div class="w-36 h-36">
                                        <img :src="getThumbnel(student.firstname, student.lastname)" alt="profile" class="min-w-full  rounded-full">
                                    </div>
                               </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>    
</template>

<script>
    import Topbar from '../layout/header.vue'
    export default{
        components: { 
            Topbar 
        },
        data(){
            return {
                student: JSON.parse(localStorage.getItem('student'))
            }
        },
        methods: {
            getThumbnel(firstname, lastname){
                return `https://ui-avatars.com/api/?name=${firstname}+${lastname}`
            },
        }
    }    
</script>    