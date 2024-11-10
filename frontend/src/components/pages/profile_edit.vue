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

                            <form class="w-full" enctype="multipart/form-data" @submit="editSave">
                               <div class="flex justify-center">
                                    <div class="w-36 h-36" onclick="document.getElementById('upload_img').click()">
                                        <img  v-if="this.image!==''" :src="image" alt="profile" class="min-w-full  rounded-full">
                                        <img v-else :src="student.profile_pic===null?getThumbnel(student.firstname, student.lastname):`${this.PORT}/uploads/${student.profile_pic}`" alt="profile" class="min-w-full  rounded-full">
                                    </div>
                                    <input type="file" ref="file" class="hidden" id="upload_img" @change="onSelect">
                               </div>
                               <div class="grid grid-cols-3 gap-5">
                                    <div class="flex flex-col w-full">
                                        <label for="firstname" class="capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            firstname
                                        </label>
                                        <input type="text" name="firstname" v-model="student.firstname" id="firstname" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="firstname" required>
                                    </div>
                                    <div class="flex flex-col w-full">
                                        <label for="middlename" class="capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            middlename
                                        </label>
                                        <input type="text" name="middlename" v-model="student.middlename" id="middlename" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="middlename" required>
                                    </div>
                                    <div class="flex flex-col w-full">
                                        <label for="lastname" class="capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            lastname
                                        </label>
                                        <input type="text" name="lastname" v-model="student.lastname" id="lastname" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="lastname" required>
                                    </div>
                                    <div class="flex flex-col w-full">
                                        <label for="gender" class="capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            gender
                                        </label>
                                        <select name="gender" v-model="student.gender" id="gender" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                                            <option  :selected="student.gender==='male'" v-bind:value="`male`">Male</option>
                                            <option v-bind:value="`female`" :selected="student.gender==='female'">Female</option>
                                        </select>
                                    </div>
                                    <div class="flex flex-col w-full">
                                        <label for="firstname" class="capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            birthday
                                        </label>
                                        <input type="date" name="birthday" v-model="student.birthday" id="birthday" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="birthday" required value="">
                                    </div>
                                    <div class="flex flex-col w-full">
                                        <label for="contact_num" class="capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Contact Number
                                        </label>
                                        <input type="number" name="contact_num" v-model="student.contact_num" id="contact_num" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="contact number" required>
                                    </div>
                                    <div class="flex flex-col w-full">
                                        <label for="firstname" class="capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            course
                                        </label>
                                        <select name="course" v-model="student.course" id="course" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                                            <option v-for="(data, index) in this.datas" :key="index" :value="data.id" :selected="student.course===data.course">{{data.course}}</option>
                                        </select>
                                    </div>
                                    <div class="flex flex-col w-full">
                                        <label for="firstname" class="capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            batch
                                        </label>
                                       <select name="batch" v-model="student.batch" id="batch" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                                            <option v-for="(year, index) in this.years" :key="index" :value="year" :selected="student.batch===year">{{year}}</option>
                                        </select>
                                    </div>
                                    <div class="flex flex-col w-full">
                                        <label for="firstname" class="capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            student id
                                        </label>
                                        <input type="text" name="student_id" v-model="student.student_id" id="student_id" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="student id" required>
                                    </div>
                                    <div class="flex flex-col w-full">
                                        <label for="email" class="capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            email
                                        </label>
                                        <input type="email" name="email" v-model="student.email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email" required>
                                    </div>
                                    <div class="flex flex-col w-full">
                                        <label for="firstname" class="capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            old password
                                        </label>
                                        <input type="password" name="old_password" v-model="old_password" id="old_password" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required>
                                    </div>
                                    <div class="flex flex-col w-full">
                                        <label for="password" class="capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            new password
                                        </label>
                                        <input type="password" name="password" v-model="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required>
                                    </div>
                               </div>
                                <div class="grid place-items-center mt-5">
                                    <button type="submit" class="w-1/4 text-white    bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save</button>
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
    import moment from 'moment';
    import axios from 'axios';
    export default{
        components: { 
            Topbar 
        },
        data(){
            return {
                student: JSON.parse(localStorage.getItem('student')),
                years : [],
                image : '',
                file: "",
                datas: []
            }
        },
        mounted(){
            this.getyear();
            this.getcourse();
        },
        methods: {
            
            async getcourse(){
                try{
                    const res = await axios.get(`${this.PORT}/auth/course/all`);
                    this.datas = res.data.rows;
                }catch(error){
                    console.log(error);
                }
            },

            onSelect() {
                const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
                const file = this.$refs.file.files[0];
                this.file = file;
                if (!allowedTypes.includes(file.type)) {
                    this.message = "Filetype is wrong!!";
                }
                if (file.size > 10000000) {
                    this.message = "Too large, max size allowed is 1000kb";
                }
                if(allowedTypes.includes(file.type)&&!(file.size > 10000000)){
                    this.createImage(file);
                    this.message = ""
                }
            },

            createImage(file) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },

            getThumbnel(firstname, lastname){
                return `https://ui-avatars.com/api/?name=${firstname}+${lastname}`
            },
            getyear(){
                let startyear = 2000;
                const currentyear = moment().year().toString();
                do{
                    this.years.push(startyear);
                    startyear++;
                }while(startyear<=currentyear)
            },

            async editSave(e){
                e.preventDefault();
                const token = localStorage.getItem('token');
                
                const res = await axios.put(`${this.PORT}/auth/profile/update`,
                    {
                        file: this.file,
                        firstname: this.student.firstname,
                        middlename: this.student.middlename,
                        lastname: this.student.lastname,
                        gender: this.student.gender,
                        birthday: this.student.birthday,
                        contact_num: this.student.contact_num,
                        course: this.student.course,
                        batch: this.student.batch,
                        student_id: this.student.student_id,
                        email: this.student.email,
                        old_password: this.student.old_password,
                        password: this.student.password,
                        id: JSON.parse(localStorage.getItem('student')).id
                    },
                    {
                        headers:{
                            'Content-type':'application/x-www-form-urlencoded',
                            "authorization" : `bearer ${token}`,
                        }
                    }
                );

            }

        }
    }    
</script>    