<template>
    <div class="w-full">
        <div class="flex justify-end items-center gap-x-3 py-1">
            <h2>Employment Status By: </h2>
            <select v-model="employmentStatus" @change="this.getEmploymetStatus" class="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="all">All</option>  
                <option value="1">Employed</option>  
                <option value="0">Unemployed</option>  
            </select>
        </div>
        <div v-if="datas.length===0">
            <h1>No Alumni</h1>
        </div>
        <div v-if="waitToResult">
            <h1>Loading...</h1>
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-y-scroll" v-if="datas.length!==0">
            <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3 text-center">
                        name
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                        batch
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                        course
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                        Accompleshment
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                        employement
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, index) in datas" :key="index" class="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 uppercase hover:bg-gray-100 dark:hover:bg-gray-700 text-center">
                    <td class="whitespace-nowrap">
                        {{data.firstname}} {{data.lastname}}
                    </td>
                    <td class="whitespace-nowrap">
                        {{data.batch}}
                    </td>
                    <td class="whitespace-nowrap">
                        {{data.course}}
                    </td>
                    <td class="whitespace-nowrap">
                        {{data.accomplishment[0]==="doctorate"?data.accomplishment[0]:""}} 
                        {{data.accomplishment[1]==="masteral"&&data.accomplishment[0]==="doctorate"?"|":""}}
                        {{data.accomplishment[1]==="masteral"?data.accomplishment[1]:""}}
                    </td>
                    <td class="whitespace-nowrap">  
                        {{data.employment_status}}
                    </td>
                </tr>
            </tbody>
        </table>  
    </div>
                          
</template>

<script>
export default {
    methods:{
        getEmploymetStatus(){
            this.callEmploymentStatus(this.employmentStatus)
        }
    },
    props: ['datas', 'callEmploymentStatus', 'waitToResult']
}
</script>