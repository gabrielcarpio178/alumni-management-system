<template>
    <div class="bg-gray-50 dark:bg-gray-900 flex flex-col gap-10 w-full overflow-x-hidden">
        <Loader v-bind:isLoader='isLoader'/>
        <Topbar/>
        <div class="h-screen xl:h-full text-white w-screen animate__animated animate__fadeIn">
            <section class="pt-28 md:py-20 my-auto  dark:bg-gray-900">
                <div class="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto w-full flex gap-4">
                    <div class="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit w-3/4 self-center dark:bg-gray-800/40">
                        <div class="">
                            <h1 class="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white text-black">
                                Profile
                            </h1>
                            <h2 class="text-grey text-sm mb-4 dark:text-gray-400">Create Profile</h2>

                            <form class="w-full" enctype="multipart/form-data" @submit="editSave">
                               <div class="w-full flex md:flex-row items-center justify-center flex-col gap-x-5">
                                    <div class="h-36 rounded-full cursor-pointer transition-all relative hover:scale-105" onclick="document.getElementById('upload_img').click()">
                                        <img  v-if="this.image!==''" :src="image" alt="profile" class="w-36 h-36 object-center rounded-full shadow-lg">
                                        <img v-else :src="student.profile_pic===null?getThumbnel(student.firstname, student.lastname):`${this.PORT}/uploads/${student.profile_pic}`" alt="profile" class="w-36 h-36 object-center rounded-full shadow-lg">
                                    </div>
                                    <input type="file" ref="file" class="hidden" id="upload_img" @change="onSelect">
                                    <div class="flex flex-col md:w-3/4 w-full gap-y-2">
                                        
                                        <div class="h-full rounded-lg p-0.5">
                                             <section class="px-1 py-0.5 dark:text-gray-100 flex flex-col gap-y-3 h-full text-black">
                                                <div v-if="this.isloading" class="capitalize nowrap md:text-sm text-xs p-1" >Please wait..</div>
                                                <h2 class="text-black dark:text-grey text-sm dark:text-gray-400">Accomplishment</h2>
                                                <div class="flex flex-row w-full gap-x-2">
                                                    <div class="capitalize rounded border border-white shadow-lg dark:border-gray-700 nowrap md:text-sm text-xs p-1 cursor-pointer hover:scale-105" :class="this.accomplishments_data.isMasteral===1?'dark:bg-green-800 bg-slate-600 text-white':''" @click="this.editAccomplishment('isMasteral', this.accomplishments_data.isMasteral===1?0:1)">Masteral Degree</div>
                                                    <div class="capitalize rounded border border-white shadow-lg dark:border-gray-700 nowrap md:text-sm text-xs p-1 cursor-pointer hover:scale-105" :class="this.accomplishments_data.isDoctorate===1?'dark:bg-green-800 bg-slate-600 text-white':''" @click="this.editAccomplishment('isDoctorate', this.accomplishments_data.isDoctorate===1?0:1)">Doctorate Degree</div>
                                                </div>
                                                <h2 class="text-black dark:text-grey text-sm dark:text-gray-400">Employement Status</h2>
                                                <div class="flex flex-row w-full gap-x-2">
                                                    <div class="capitalize rounded border border-white shadow-lg dark:border-gray-700 nowrap md:text-sm text-xs p-1" :class="student.isEmployed===1?'dark:bg-green-800 bg-slate-600 text-white':'cursor-pointer hover:scale-105'" @click="this.changeEmployement(1)">Employed</div>
                                                    <div class="capitalize rounded border border-white shadow-lg dark:border-gray-700 nowrap md:text-sm text-xs p-1" :class="student.isEmployed!==1?'dark:bg-green-800 bg-slate-600 text-white':'cursor-pointer hover:scale-105'" @click="this.changeEmployement(0)">Unemployed</div>
                                                </div>
                                             </section>
                                        </div>
                                    </div>
                               </div>
                               <div class="grid md:grid-cols-3 gap-5">
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
                                    <button type="submit" class="w-1/4 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save</button>
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
    import Loader from '../layout/loader.vue'
    import Swal from 'sweetalert2';
    
    export default{
        components: { 
            Topbar,
            Loader,
        },
        data(){
            return {
                student: JSON.parse(localStorage.getItem('student')),
                years : [],
                image : '',
                file: "",
                datas: [],
                isLoader : 'loader-hide',
                isAccomplishmentShow: false,
                accomplishments_data: [],
                isloading: true,
                isEditAccomplishmentShow: false,
                selectedAccomplishment: {}
            }
        },
        mounted(){
            this.getyear();
            this.getcourse();
            this.getAccomplishment();
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
                this.isLoader = 'loader-display';
                const token = localStorage.getItem('token');
                const formData = new FormData();
                formData.append('file', this.file);    
                formData.append('firstname', this.student.firstname);    
                formData.append('middlename', this.student.middlename);    
                formData.append('lastname', this.student.lastname);    
                formData.append('gender', this.student.gender);    
                formData.append('birthday', this.student.birthday);    
                formData.append('contact_num', this.student.contact_num);    
                formData.append('course', this.student.course);    
                formData.append('batch', this.student.batch);    
                formData.append('student_id', this.student.student_id);    
                formData.append('id', JSON.parse(localStorage.getItem('student')).id);    
                formData.append('email', this.student.email);    
                formData.append('old_password', this.old_password);    
                formData.append('new_password', this.password);    
                const res = await axios.post(`${this.PORT}/auth/profile/update`,
                    formData,
                    {
                        headers:{
                            'Content-type':'application/x-www-form-urlencoded',
                            "authorization" : `bearer ${token}`,
                        }
                    }
                );
                if(res.data.message == 'already use contacts'||res.data.message == 'old password not match'){
                    this.isLoader = 'loader-hide'
                    Swal.fire({
                        position: "center",
                        title: `Warning`,
                        text: `${res.data.message}.`,
                        showConfirmButton: false,
                        timer: 1000,
                        icon: "warning"
                    });
                }else{
                    this.isLoader = 'loader-hide'
                    Swal.fire({
                        position: "center",
                        title: `Success`,
                        text: `Edit successfully`,
                        showConfirmButton: false,
                        timer: 1000,
                        icon: "success"
                    }).then(()=>{
                        res.data.rows.birthday = moment(res.data.rows.birthday).format('yyyy-MM-DD');
                        localStorage.setItem('student', JSON.stringify(res.data.rows))
                        window.location = '/profile';
                    });
                    
                }

            },
            removeAddAccomplishmentform(){
                this.isAccomplishmentShow = !this.isAccomplishmentShow;
            },
            isloder(){
               this.isLoader = this.isLoader != 'loader-hide'?'loader-hide':'loader-display';
            },

            async changeEmployement(status_id){
                if(JSON.parse(localStorage.getItem('student')).isEmployed!==status_id){
                    this.isLoader = 'loader-display';
                    const student_id = JSON.parse(localStorage.getItem('student')).id;
                    const isEmployed = JSON.parse(localStorage.getItem('student')).isEmployed===1?0:1;
                    const token = localStorage.getItem('token');
                    var res = await axios.put(`${this.PORT}/auth/student/employment`,
                        {
                            isEmployed, student_id
                        },
                        {
                            headers:{
                                'Content-type':'application/x-www-form-urlencoded',
                                "authorization" : `bearer ${token}`,
                            }
                        }
                    )
                    if(res.data.message==="update success"){
                        this.isLoader = 'loader-hide'
                        var recentData = JSON.parse(localStorage.getItem('student'));
                        recentData.isEmployed = isEmployed;
                        this.student.isEmployed =isEmployed;
                        localStorage.setItem('student', JSON.stringify(recentData));
                    }
                }
                
            },
            
            async getAccomplishment(){
                this.isloading = true;
                const student_id = JSON.parse(localStorage.getItem('student')).id;
                const token = localStorage.getItem('token');
                try {
                    var res = await axios.get(`${this.PORT}/auth/student/accomplishment/${student_id}`, {
                        headers:{
                            'Content-type':'application/x-www-form-urlencoded',
                            "authorization" : `bearer ${token}`,
                        }
                    })
                    this.accomplishments_data = res.data.accomplishments[0];
                } catch (error) {
                    console.log(error)
                }finally{
                    this.isloading = false;
                }
            },
            async editAccomplishment(columnName, status){
                const student_id = JSON.parse(localStorage.getItem('student')).id;
                const token = localStorage.getItem('token');
                this.isLoader = 'loader-display';
                var res = await axios.put(`${this.PORT}/auth/student/editaccomplestment`,
                    {
                        student_id, columnName, status
                    },
                    {
                        headers:{
                            'Content-type':'application/x-www-form-urlencoded',
                            "authorization" : `bearer ${token}`,
                        }
                    }
                )
                var {columnName, message, status} = res.data;
                if(message==="update success"){
                    var studentData = JSON.parse(localStorage.getItem('student'));
                    this.isLoader = 'loader-hide'
                    if(columnName==="isMasteral"){
                        this.accomplishments_data.isMasteral = parseInt(status);
                        studentData.accompleshment.isMasteral = parseInt(status)
                    }
                    if(columnName==="isDoctorate"){
                        this.accomplishments_data.isDoctorate = parseInt(status);
                        studentData.accompleshment.isDoctorate = parseInt(status)
                    }
                    localStorage.setItem('student', JSON.stringify(studentData));
                }
                
            }
        }
        
    }    
</script>    