<template>
    <div class="bg-gray-50 dark:bg-gray-900 w-screen overflow-x-hidden flex flex-row">
        <Adminheader/>
        <div class="flex flex-col w-full">
            <Navbar/>
            <div class="w-full mt-[5%] ml-[20.5%] text-white animate__animated animate__fadeIn pl-4">
                <h1 class="text-3xl pb-4 tracking-tight text-gray-900 dark:text-white  font-bold">Course List</h1>
                <div class="flex flex-row w-full gap-x-3">
                    <div class="w-full  md:mt-0 sm:max-w-md xl:p-0 animate__animated animate__fadeIn">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8 rounded-lg bg-white shadow dark:border dark:bg-gray-800 dark:border-gray-700" id="add_form">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                               Add Course
                            </h1>
                            <form class="space-y-1 md:space-y-2" @submit="addSubmit">
                                <div>
                                    <label for="course" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">course</label>
                                    <input type="text" v-model="course" name="course" id="course" placeholder="Course" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                                </div>
                                <div class="text-red-500 py-0 px-0 capitalize" id="message">
                                    {{this.message}}
                                </div>
                                <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">ADD</button>
                            </form>
                        </div>
                        <!-- update form -->
                        <div class="hidden p-6 space-y-4 md:space-y-6 sm:p-8 rounded-lg bg-white shadow dark:border dark:bg-gray-800 dark:border-gray-700" id="update_form">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                               Edit Course
                            </h1>
                            <form class="space-y-1 md:space-y-2" @submit="editSubmit">
                                <div>
                                    <input type="hidden" v-model="id">
                                    <label for="edit_course" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">course</label>
                                    <input type="text" v-model="edit_course" name="edit_course" id="edit_course" placeholder="Course" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                                </div>
                                <div class="text-red-500 py-0 px-0 capitalize" id="message">
                                    {{this.message}}
                                </div>
                                <div class="flex gap-x-2">
                                    <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update</button>
                                    <button type="button" class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" @click="cancelUpdate">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="flex flex-col w-[40%] gap-y-2">
                        <div class="bg-white dark:bg-gray-800 dark:border-gray-700 p-4 rounded-lg">
                            <div>
                                <label for="search" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">search</label>
                                <input type="text" @input="searchcourse(this.search)" v-model="search" name="search" id="search" placeholder="Search" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                            </div>
                        </div>
                        <p>{{not_found}}</p>
                        <div class="overflow-x-auto w-full h-80 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" id="table_content">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="w-1/4text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-center">
                                            Course
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(data, index) in this.datas" :key="index">
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                            {{data.course}}
                                        </td>
                                        <td class="px-6 py-4 flex gap-x-2">
                                            <button type="button" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" @click="updateData(index)">Edit</button>
                                            <button type="button" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" @click="deleteData(data.id)">Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>            
</template>

<script>
import Adminheader from './../layout/admin_header.vue'
import Navbar from './../layout/admin_navbar.vue'
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
    components: {
        Adminheader,
        Navbar
    },
    data(){
        return {
            datas: [],
            message: "",
            not_found: "",
            update_data: {}
        }
    },
    mounted(){
        this.displayCourse('all');
        // this.getUpdateData(this.update_data);
    },
    methods: {
        async addSubmit(e){
            e.preventDefault();
            const token = localStorage.getItem('token');
            const course = this.course;
            
            const res = await axios.post(`${this.PORT}/auth/admin/addCourse`,
                {
                    course: course.toUpperCase(),
                },
                {
                    headers:{
                        'Content-type':'application/x-www-form-urlencoded',
                        "authorization" : `bearer ${token}`,
                    }
                }
            );
            if(res.data.message!=='add success'){
                this.message = res.data.message;
            }else{
                this.message = ""
                this.course = ""
                this.displayCourse('all');
            }
        },

        searchcourse(search){
            if(search!==""){
                this.displayCourse(search.toUpperCase())
            }else{
                this.displayCourse('all')
            }
        },
        
        async displayCourse(search){
            try{
                const res = await axios.get(`${this.PORT}/auth/course/${search}`);
                if(res.data.message==='not found'){
                    this.not_found = res.data.message;
                    document.getElementById("table_content").style.display="none"
                }else{
                    document.getElementById("table_content").style.display="block"
                    this.not_found = "";
                    this.datas = res.data.rows;
                }
            }catch(error){
                console.log(error);
            }
        },
        async deleteData(id){
            const token = localStorage.getItem('token');
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
            if (result.isConfirmed) { 
                await axios.delete(`${this.PORT}/auth/admin/deleteCourse`,
                    {
                        headers:{
                            'Content-type':'application/x-www-form-urlencoded',
                            "authorization" : `bearer ${token}`,
                        },
                        data: {
                            id: id
                        }
                    }
                )
                this.displayCourse('all');
            }
            });
        },
        async updateData(index){
            const data = this.datas
            document.getElementById('edit_course').value = data[index].course;
            this.edit_course = data[index].course;
            this.id = data[index].id;
            document.getElementById('update_form').classList.remove('hidden')
            document.getElementById('add_form').classList.add('hidden')
        },
        async editSubmit(e){
            e.preventDefault()
            const course = this.edit_course
            const id = this.id;
            const token = localStorage.getItem('token');
            const res = await axios.put(`${this.PORT}/auth/admin/editCourse`,
                {
                    course: course.toUpperCase(),
                    id: id
                },
                {
                    headers:{
                        'Content-type':'application/x-www-form-urlencoded',
                        "authorization" : `bearer ${token}`,
                    }
                }
            );
            if(res.data.message!=='update success'){
                this.message = res.data.message;
            }else{
                this.message = ""
                this.edit_course = '';
                this.displayCourse('all');
            }
        },
        async cancelUpdate(){
            this.id = '';
            this.course = '';
            document.getElementById('update_form').classList.add('hidden')
            document.getElementById('add_form').classList.remove('hidden')
        }
    }
}
</script>
