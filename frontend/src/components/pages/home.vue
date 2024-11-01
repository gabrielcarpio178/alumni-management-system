<template>
    <div class="bg-gray-50 dark:bg-gray-900 flex flex-col gap-10 w-full overflow-x-hidden">
        <Topbar/>
        <div class="h-screen xl:h-full text-white w-screen">
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
            <div class="flex flex-col w-screen px-20 mt-10">
                <div class="flex flex-row p-3 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div class="w-1/2">
                        <img src="./../image/2_img.jpg" alt="banner" class="min-w-full">
                    </div>
                    <div class="text-white w-1/2 text-center px-3 xl:flex xl:flex-col xl:text-2xl xl:items-center xl:justify-center relative">
                        <div class="font-bold text-xl xl:text-3xl">
                            Meeting For Alumni
                        </div>
                        <p class="text-sm mb-1">
                            October 31, 2024 10:00 PM
                        </p>
                        <hr>
                        <div class="italic">
                            this event meeting for alumni batch 2010
                        </div>
                        <button class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 absolute bottom-0 right-0">View More</button>
                    </div>
                </div>
            </div>
        </div>
        <Bottombar/>
    </div>    
</template>

<script>
    import Topbar from '../layout/header.vue'
    import Bottombar from '../layout/footer.vue'
    export default {
        name: 'home',
        components: {
            Topbar,
            Bottombar
        },
    }
</script>

<style scoped>

</style>