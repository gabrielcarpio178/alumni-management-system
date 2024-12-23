<template>
    <div class="bg-gray-50 dark:bg-gray-900 w-screen overflow-x-hidden flex flex-row">
        <Adminheader/>
        <div class="flex flex-col w-full">
            <Navbar/>
            <div class="w-full mt-14 md:mt-[5%] md:ml-[20.5%] text-white animate__animated animate__fadeIn pl-4">
                <h1 class="text-3xl pb-4 tracking-tight text-gray-900 dark:text-white  font-bold">Reports</h1>
                <div class="flex flex-row gap-x-2 w-[77%]">
                    <div class="flex flex-col gap-y-2 w-[45%]">
                        <div class="bg-gray-200 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center md:w-full md:mt-0 mt-3 border h-full p-3">
                            <div class="w-full">
                                <canvas id="doubleLine"></canvas>
                            </div>
                            <div class="w-full">
                                <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" @click="this.getDataMasteral('all')">View List</button>
                            </div>
                        </div>
                        <div class="bg-gray-200 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center md:w-full md:mt-0 mt-3 border w-full h-full p-3">
                            <div class="w-full">
                                <canvas id="lineChart"></canvas>
                            </div>
                            <div class="w-full">
                                <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" @click="this.getDataEmployemnt('all')">View List</button>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gray-200 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center md:w-3/4 md:mt-0 mt-3 border w-[55%] h-full p-3">
                        <Accomplishment :filterData="getDataMasteral" v-bind:years_content='years_content' v-bind:datas="datas"  v-bind:waitToResult="waitToResult" v-if="this.isMasteralTableShow"/>
                        <Employement :callEmploymentStatus="getDataEmployemnt" v-bind:datas="datas" v-bind:waitToResult="waitToResult" v-if="this.isEmployementTableShow"/>
                    </div>
                </div>
                
            </div>
            
                
        </div>    
    </div>    
</template>


<style scoped>
    #doubleLine, #lineChart{
        width: 100% !important;
        height: 30vh !important;
    }
</style>

<script>
import Adminheader from './../layout/admin_header.vue'
import Navbar from './../layout/admin_navbar.vue';
import Accomplishment from './../layout/accomplishment.vue';
import Employement from './../layout/employement.vue'
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';
import moment from 'moment';

export default {
    components: {
        Adminheader,
        Navbar,
        Accomplishment,
        Employement
    },
    data(){
        return {
            years_content: [],
            datas: [],
            isMasteralTableShow: true,
            isEmployementTableShow: false,
            waitToResult: false
        }
    },
    mounted(){
        this.getData();
        this.getDataMasteral("all");
        this.getyear();
    },
    methods: {
        async getData(){
            var token = localStorage.getItem('token');
            const res = await axios.get(`${this.PORT}/auth/admin/repots/graph`, {
                    headers:{
                    'Content-type':'application/x-www-form-urlencoded',
                    "authorization" : `bearer ${token}`,
                }
            });
            this.graphLine(res.data.employedByBatch);
            this.graphDoubline(res.data.masteralByBatch);
        },
        graphLine(dataContents){
            let batchLabel = [];
            let employed = []; 
            let unemployed = []; 
            dataContents.forEach(dataContent=>{
                batchLabel.push(dataContent.batch);
            })
            dataContents.forEach(dataContent=>{
                employed.push(dataContent.bybatchtotal_employed);
            })
            dataContents.forEach(dataContent=>{
                unemployed.push(dataContent.bybatchtotal_unemployed);
            })
            const ctx = document.getElementById('lineChart');
            const data = {
                labels: batchLabel,
                datasets: [{
                    label: 'Total Number Employed by Batch',
                    data: employed,
                    borderWidth: 1
                },
                {
                    label: 'Total Number Unemployed by Batch',
                    data: unemployed,
                    borderWidth: 1
                }]
            };
            const config = {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    },
                },
                plugins: [ChartDataLabels]
            };
            new Chart(ctx,config)
        },
        graphDoubline(dataContents){
            let batchLabel = [];
            let masteral = []; 
            let doctorate = []; 
            dataContents.forEach(dataContent=>{
                batchLabel.push(dataContent.batch);
            })
            dataContents.forEach(dataContent=>{
                masteral.push(dataContent.total_bybatchMasteral);
            })
            dataContents.forEach(dataContent=>{
                doctorate.push(dataContent.total_bybatchDoctorate);
            })
            const ctx = document.getElementById('doubleLine');
            const data = {
                labels: batchLabel,
                datasets: [{
                    label: 'Total Number Master Degree by Batch',
                    data: masteral,
                    borderWidth: 1
                },
                {
                    label: 'Total Number Doctorate Degree by Batch',
                    data: doctorate,
                    borderWidth: 1
                }]
            };
            const config = {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            labels:{
                                font:{
                                    size: 10
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                },
                plugins: [ChartDataLabels]
            };
            new Chart(ctx,config)
        },
        getyear(){
            let startyear = 2000;
            const currentyear = moment().year().toString();
            do{
                this.years_content.push(startyear);
                startyear++;
            }while(startyear<=currentyear)
        },
        getDataMasteral: async function(batch){
            this.isMasteralTableShow = true;
            this.isEmployementTableShow = false;
            var token = localStorage.getItem('token');
            this.waitToResult = true;
            try{
                const res = await axios.get(`${this.PORT}/auth/admin/reportDataMasteral/${batch}`,{
                    headers:{
                        'Content-type':'application/x-www-form-urlencoded',
                        "authorization" : `bearer ${token}`,
                    }
                });
                var contentDatas = res.data.rows;
                for(let x in contentDatas){
                    contentDatas[x].accomplishment = [contentDatas[x].doctorate, contentDatas[x].masteral];
                    delete(contentDatas[x].doctorate);
                    delete(contentDatas[x].masteral);
                }
                this.datas = contentDatas;
            }catch(error){
                console.log(error)
            }finally{
                this.waitToResult = false;
            }
        },

        getDataEmployemnt: async function(data){
            this.isMasteralTableShow = false;
            this.isEmployementTableShow = true;
            var token = localStorage.getItem('token');
            this.waitToResult = true;
            try{

                
                const res = await axios.get(`${this.PORT}/auth/admin/reportDataEmployed/${data}`,{
                    headers:{
                        'Content-type':'application/x-www-form-urlencoded',
                        "authorization" : `bearer ${token}`,
                    }
                });
                var contentDatas = res.data.rows;
                for(let x in contentDatas){
                    contentDatas[x].accomplishment = [contentDatas[x].doctorate, contentDatas[x].masteral];
                    delete(contentDatas[x].doctorate);
                    delete(contentDatas[x].masteral);
                }
                this.datas = contentDatas;
            }catch(error){
                console.log(error)
            }finally{
                this.waitToResult = false;
            }
        }

        
        
    }
}    
</script>