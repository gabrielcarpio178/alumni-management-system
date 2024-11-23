<template>
    <div class="bg-gray-50 dark:bg-gray-900 w-screen overflow-x-hidden flex flex-row">
        <Adminheader/>
        <div class="flex flex-col w-full">
            <Navbar/>
            <div class="w-full mt-14 md:mt-[5%] md:ml-[20.5%] text-white animate__animated animate__fadeIn pl-4">
                <h1 class="text-3xl pb-4 tracking-tight text-gray-900 dark:text-white  font-bold">Dashboard</h1>
                <div v-if="this.loadingContent" class="w-full flex items-center justify-center">
                    Please Wait...
                </div>
                <div class="flex flex-col md:flex-row gap-x-4 md:w-[76%]">
                    <div class="flex flex-col md:w-1/2 gap-y-2 w-full">
                        <div class="flex flex-row max-w-[94%] md:max-w-sm p-2 bg-gray-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div class="flex flex-col w-1/2 items-center">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 16 16" height="80" width="80" class="dark:fill-white"><desc>Graduation Streamline Icon: https://streamlinehq.com</desc><defs></defs><path d="M7.5 7.5a5.96875 5.96875 0 0 1 5.96875 5.96875v0.625H1.53125v-0.625A5.96875 5.96875 0 0 1 7.5 7.5Z" stroke="#ffffff" stroke-miterlimit="10" stroke-width="1"></path><path d="M4.518750000000001 0.9375h5.96875v3.5812500000000003A2.9812499999999997 2.9812499999999997 0 0 1 7.5 7.5a2.9812499999999997 2.9812499999999997 0 0 1 -2.9812499999999997 -2.9812499999999997V0.9375Z" fill="none" stroke="#ffffff" stroke-miterlimit="10" stroke-width="1"></path><path d="m4.518750000000001 2.725 2.9812499999999997 0.6 2.9812499999999997 -0.78125" fill="none" stroke="#ffffff" stroke-miterlimit="10" stroke-width="1"></path><path d="m2.13125 0.9375 10.7375 0" fill="none" stroke="#ffffff" stroke-miterlimit="10" stroke-width="1"></path><path d="m10.48125 8.09375 -2.1375 2.1437500000000003" fill="none" stroke="#ffffff" stroke-miterlimit="10" stroke-width="1"></path><path d="m6.65625 10.237499999999999 -2.1375 -2.1437500000000003" fill="none" stroke="#ffffff" stroke-miterlimit="10" stroke-width="1"></path><path d="M6.30625 11.08125a1.1937499999999999 1.1937499999999999 0 1 0 2.3874999999999997 0 1.1937499999999999 1.1937499999999999 0 1 0 -2.3874999999999997 0" fill="none" stroke="#ffffff" stroke-miterlimit="10" stroke-width="1"></path></svg>
                                </div>
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Of Alumni</h5>
                            </div>
                            <div class="flex items-center justify-center w-1/2 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {{this.alumni}}
                            </div>
                        </div>
                        <div class="flex flex-row max-w-[94%] md:max-w-sm p-2 bg-gray-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div class="flex flex-col w-1/2 items-center">
                                <div>
                                    <svg viewBox="-0.5 -0.5 16 16"  class="dark:fill-white" xmlns="http://www.w3.org/2000/svg" id="Suitcase-Alt--Streamline-Unicons" height="80" width="80"><desc>Suitcase Alt Streamline Icon: https://streamlinehq.com</desc><path d="M12.645 3.09h-2.205V2.355c0 -0.389875 -0.15487499999999998 -0.7637499999999999 -0.43056249999999996 -1.0394375 -0.2756875 -0.2756875 -0.6495624999999999 -0.43056249999999996 -1.0394375 -0.43056249999999996H6.029999999999999c-0.389875 0 -0.7637499999999999 0.15487499999999998 -1.0394375 0.43056249999999996 -0.2756875 0.2756875 -0.43056249999999996 0.6495624999999999 -0.43056249999999996 1.0394375v0.735H2.355c-0.5848125 0 -1.145625 0.23231249999999998 -1.5591875 0.6458125000000001C0.3823125 4.149375 0.15 4.7101875 0.15 5.295v6.615c0 0.58475 0.23231249999999998 1.145625 0.6458125000000001 1.5591875 0.41356249999999994 0.4135 0.974375 0.6458125000000001 1.5591875 0.6458125000000001h10.29c0.58475 0 1.145625 -0.23231249999999998 1.5591875 -0.6458125000000001 0.4135 -0.41356249999999994 0.6458125000000001 -0.9744375 0.6458125000000001 -1.5591875V5.295c0 -0.5848125 -0.23231249999999998 -1.145625 -0.6458125000000001 -1.5591875 -0.41356249999999994 -0.4135 -0.9744375 -0.6458125000000001 -1.5591875 -0.6458125000000001ZM6.029999999999999 2.355h2.94v0.735H6.029999999999999V2.355Zm7.35 9.555c0 0.1949375 -0.07743749999999999 0.3819375 -0.21525 0.51975s-0.32481250000000006 0.21525 -0.51975 0.21525H2.355c-0.1949375 0 -0.38187499999999996 -0.07743749999999999 -0.51975 -0.21525 -0.1378125 -0.1378125 -0.21525 -0.32481250000000006 -0.21525 -0.51975v-3.675h2.94v0.735c0 0.1949375 0.07743749999999999 0.3819375 0.21525 0.51975 0.137875 0.1378125 0.32481250000000006 0.21525 0.51975 0.21525s0.38187499999999996 -0.07743749999999999 0.51975 -0.21525c0.1378125 -0.1378125 0.21525 -0.32481250000000006 0.21525 -0.51975v-0.735h2.94v0.735c0 0.1949375 0.0775 0.3819375 0.2153125 0.51975s0.32475 0.21525 0.5196875 0.21525c0.1949375 0 0.3819375 -0.07743749999999999 0.51975 -0.21525s0.21525 -0.32481250000000006 0.21525 -0.51975v-0.735h2.94v3.675Zm0 -5.145H1.62V5.295c0 -0.1949375 0.07743749999999999 -0.38187499999999996 0.21525 -0.51975 0.137875 -0.1378125 0.32481250000000006 -0.21525 0.51975 -0.21525h10.29c0.1949375 0 0.38187499999999996 0.07743749999999999 0.51975 0.21525 0.1378125 0.137875 0.21525 0.32481250000000006 0.21525 0.51975v1.47Z" stroke-width="1"></path></svg>
                                </div>
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Of Jobs</h5>
                            </div>
                            <div class="flex items-center justify-center w-1/2 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {{this.job}}
                            </div>
                        </div>
                        <div class="flex flex-row max-w-[94%] md:max-w-sm p-2 bg-gray-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div class="flex flex-col w-1/2 items-center">
                                <div>
                                    <svg viewBox="-0.5 -0.5 16 16"  class="dark:fill-white" xmlns="http://www.w3.org/2000/svg" id="Calender--Streamline-Unicons" height="80" width="80"><desc>Calender Streamline Icon: https://streamlinehq.com</desc><path d="M12.645 1.62H11.174999999999999V0.885c0 -0.1949375 -0.07743749999999999 -0.38187499999999996 -0.21525 -0.51975C10.8219375 0.22743750000000001 10.6349375 0.15 10.440000000000001 0.15c-0.1949375 0 -0.38187499999999996 0.07743749999999999 -0.5196875 0.21525 -0.1378125 0.137875 -0.2153125 0.32481250000000006 -0.2153125 0.51975v0.735H5.295V0.885c0 -0.1949375 -0.07743749999999999 -0.38187499999999996 -0.21525 -0.51975C4.941875 0.22743750000000001 4.7549375 0.15 4.5600000000000005 0.15s-0.38187499999999996 0.07743749999999999 -0.51975 0.21525c-0.1378125 0.137875 -0.21525 0.32481250000000006 -0.21525 0.51975v0.735H2.355c-0.5848125 0 -1.145625 0.23231249999999998 -1.5591875 0.6458125000000001C0.3823125 2.679375 0.15 3.2401875 0.15 3.825v8.82c0 0.58475 0.23231249999999998 1.145625 0.6458125000000001 1.5591875 0.41356249999999994 0.4135 0.974375 0.6458125000000001 1.5591875 0.6458125000000001h10.29c0.58475 0 1.145625 -0.23231249999999998 1.5591875 -0.6458125000000001 0.4135 -0.41356249999999994 0.6458125000000001 -0.9744375 0.6458125000000001 -1.5591875V3.825c0 -0.5848125 -0.23231249999999998 -1.145625 -0.6458125000000001 -1.5591875 -0.41356249999999994 -0.4135 -0.9744375 -0.6458125000000001 -1.5591875 -0.6458125000000001Zm0.735 11.025c0 0.1949375 -0.07743749999999999 0.3819375 -0.21525 0.51975s-0.32481250000000006 0.21525 -0.51975 0.21525H2.355c-0.1949375 0 -0.38187499999999996 -0.07743749999999999 -0.51975 -0.21525 -0.1378125 -0.1378125 -0.21525 -0.32481250000000006 -0.21525 -0.51975V7.5h11.76v5.145Zm0 -6.615H1.62V3.825c0 -0.1949375 0.07743749999999999 -0.38187499999999996 0.21525 -0.51975 0.137875 -0.1378125 0.32481250000000006 -0.21525 0.51975 -0.21525H3.825V3.825c0 0.1949375 0.07743749999999999 0.38187499999999996 0.21525 0.51975 0.137875 0.1378125 0.32481250000000006 0.21525 0.51975 0.21525s0.38187499999999996 -0.07743749999999999 0.51975 -0.21525c0.1378125 -0.137875 0.21525 -0.32481250000000006 0.21525 -0.51975V3.09h4.41V3.825c0 0.1949375 0.0775 0.38187499999999996 0.2153125 0.51975 0.1378125 0.1378125 0.32475 0.21525 0.5196875 0.21525 0.1949375 0 0.3819375 -0.07743749999999999 0.51975 -0.21525 0.1378125 -0.137875 0.21525 -0.32481250000000006 0.21525 -0.51975V3.09h1.47c0.1949375 0 0.3819375 0.07743749999999999 0.51975 0.21525 0.1378125 0.137875 0.21525 0.32481250000000006 0.21525 0.51975v2.205Z" stroke-width="1"></path></svg>
                                </div>
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Of Events</h5>
                            </div>
                            <div class="flex items-center justify-center w-1/2 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {{this.event}}
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-200 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p- flex items-center md:w-3/4 md:mt-0 mt-3 w-[94%]">
                        <canvas id="myChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #myChart{
        width: 100% !important;
        height: 70vh !important;
    }
</style>

<script>
import Adminheader from './../layout/admin_header.vue'
import Navbar from './../layout/admin_navbar.vue'
import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
    components: {
        Adminheader,
        Navbar
    },
    data(){
        return{
            alumni : 0,
            job: 0,
            event: 0,
            loadingContent: true
        }
        
    },
    mounted(){
        this.getData()
    },
    methods: {
        async getData(){
            var token = localStorage.getItem('token');
            try {
                var res = await axios.get(`${this.PORT}/auth/admin/home`, {
                     headers:{
                        'Content-type':'application/x-www-form-urlencoded',
                        "authorization" : `bearer ${token}`,
                    }
                }) 
                this.alumni = res.data.total_alumni.total_alumni;
                this.job = res.data.job_count.total_count;
                this.event = res.data.event.total_event;
                this.graphData(res.data.graphCourse);           
            } catch (error) {
                console.log(error);   
            }finally{
                this.loadingContent = false;
            }
        },
        graphData(graph){
            let course_label = [];
            let total_alumni_label = [];
            graph.map(data=>{
                course_label.push(data.course);
                total_alumni_label.push(data.total_alumni)
            })
            const ctx = document.getElementById('myChart');
            new Chart(ctx, {
                type: 'bar',
                data: {
                labels: course_label,
                datasets: [{
                    label: '# of Alumni By Course',
                    data: total_alumni_label,
                    borderWidth: 1
                }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }
}
</script>
