<template>
    <div class="flex flex-row overflow-y-auto overflow-x-hidden fixed bottom-0 md:top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
        <div class="m-10 w-full max-w-sm md:w-1/2 relative">
            <div class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white absolute right-1 top-1" @click="callremove">
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </div>
            <div class="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 px-4 py-5 shadow-lg">
                <div class="relative mx-auto w-36 h-36 rounded-full">
                    <img class="rounded-full  w-36 h-36 object-center" :src="student.profile_pic===null?getThumbnel(student.firstname, student.lastname):`${this.PORT}/uploads/${student.profile_pic}`" alt="" />
                </div>
                <h1 class="my-1 text-center text-xl font-bold leading-8 text-white capitalize">{{`${student.firstname} ${student.middlename} ${student.lastname}`}}</h1>
                <ul class="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm">
                    <li class="flex items-center py-3 text-sm">
                        <span>Email</span>
                        <span class="ml-auto">{{student.email}}</span>
                    </li>
                    <li class="flex items-center py-3 text-sm">
                        <span>Phone number</span>
                        <span class="ml-auto">{{student.contact_num}}</span>
                    </li>
                    <li class="flex items-center py-3 text-sm">
                        <span>Student ID</span>
                        <span class="ml-auto">{{student.student_id}}</span>
                    </li>
                    <li class="flex items-center py-3 text-sm">
                        <span>Course</span>
                        <span class="ml-auto">{{student.course_name}}</span>
                    </li>
                    <li class="flex items-center py-3 text-sm">
                        <span>Batch</span>
                        <span class="ml-auto">{{student.batch}}</span>
                    </li>
                    <li class="flex items-center py-3 text-sm">
                        <span>Status</span>
                        <span class="ml-auto"><span class="rounded-full py-1 px-2 text-xs font-medium" :class="student.status==1?'bg-green-200 text-green-700':'bg-red-200 text-red-700'">{{student.status===0?"Deactivate":"Activate"}}</span></span>
                    </li>
                </ul>
                <div class="flex flex-row mt-3 gap-x-2">
                    <router-link to="/profile" type="button" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Edit</router-link>
                    <button type="button" class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" @click="logout">Logout</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                student: JSON.parse(localStorage.getItem('student'))
            }
        },
        methods:{
            getThumbnel(firstname, lastname){
                return `https://ui-avatars.com/api/?name=${firstname}+${lastname}`
            },
            callremove(){
                this.$emit('callremove')
            },
            logout(){
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.removeItem('isLogin');
                localStorage.removeItem('student');
                window.location = "/login";
            }
        }
    }
</script>
