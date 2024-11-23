<template>
    <div class="bg-gray-50 dark:bg-gray-900 flex flex-col gap-10 w-full overflow-x-hidden">
        <Topbar/>
        <Loader v-bind:isLoader='isLoader'/>
        <section class="bg-gray-50 dark:bg-gray-900 md:mt-20 mt-24 flex w-screen items-center justify-center">
            <div class="w-full bg-gray-200 rounded-lg shadow dark:border mx-5 md:mx-20 dark:bg-gray-800 dark:border-gray-700">
                <div class="md:p-6 p-2 space-y-2 md:space-y-6 animate__animated animate__fadeIn">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign up
                    </h1>
                    <form class="flex flex-col gap-3" @submit="registerRequest">
                        <div class="grid md:grid-cols-3 gap-5">
                            <div>
                                <label for="firstname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">firstname</label>
                                <input type="text" name="firstname" v-model="firstname" id="firstname" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Firstname" required>
                            </div>

                            <div>
                                <label for="middlename" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">middlename</label>
                                <input type="text" name="middlename" v-model="middlename" id="middlename" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Lastname" required>
                            </div>
                            
                            <div>
                                <label for="lastname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">lastname</label>
                                <input type="text" name="lastname" v-model="lastname" id="lastname" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Lastname" required>
                            </div>
                            <div>
                                <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">gender</label>
                                <select name="gender" v-model="gender" id="gender" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="male" class="capitalize">Male</option>
                                    <option value="female" class="capitalize">Female</option>
                                </select>
                            </div>
                            <div>
                                <label for="birthday" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">birthday</label>
                                <input type="date" name="birthday" v-model="birthday" id="birthday" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                            <div>
                                <label for="contact_num" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Contact Number</label>
                                <input type="number" name="contact_num" v-model="contact_num" id="contact_num" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                            <div>
                                <label for="course" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">course</label>
                                <select name="course" v-model="course" id="course" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                                    <option v-for="(data, index) in this.datas" :key="index" :value="data.id">{{data.course}}</option>
                                </select>
                            </div>
                            <div>
                                <label for="batch" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">batch</label>
                                 <select name="batch" v-model="batch" id="batch" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                                    <option v-for="(year, index) in this.years" :key="index" :value="year">{{year}}</option>
                                </select>
                            </div>
                            <div>
                                <label for="student_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">student id</label>
                                <input type="number" name="student_id" v-model="student_id" id="student" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Student" required>
                            </div>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">email</label>
                                <input type="email" name="email" v-model="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required>
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" v-model="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                            <div>
                                <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                <input type="password" v-model="confirm_password" name="confirm_password" id="confirm_password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                        </div>
                        <div class="grid place-items-center">
                            <div class="text-red-600 py-0 px-0 capitalize" id="message">
                                
                            </div>
                            <button type="submit" class="w-full md:w-1/4 text-white    bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                I have an account <router-link to="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</router-link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        <Bottombar/>
    </div>    
</template>

<script>
    import axios from 'axios';
    import Topbar from '../layout/header.vue'
    import Bottombar from '../layout/footer.vue'
    import moment from 'moment';
    import Loader from '../layout/loader.vue';
    import Swal from 'sweetalert2';
  
    export default {
        name: 'signup',
        components: {
            Topbar,
            Bottombar,
            Loader
        },
        data(){
            return {
                years : [],
                datas: [],
                isLoader : 'loader-hide'
            }
        },
        mounted(){
            this.getcourse();
            this.getyear();
           
        },
        methods:{
            getyear(){
                let startyear = 2000;
                const currentyear = moment().year().toString();
                do{
                    this.years.push(startyear);
                    startyear++;
                }while(startyear<=currentyear)
            },
            async getcourse(){
                try{
                    const res = await axios.get(`${this.PORT}/auth/course/all`);
                    this.datas = res.data.rows;
                }catch(error){
                    console.log(error);
                }
            },
            nowLoading(){
                if(this.isLoader==='loader-hide'){
                    this.isLoader = 'loader-display';
                }else{
                    this.isLoader = 'loader-hide'
                }
            },
            async registerRequest(e){
                e.preventDefault();
                if(this.password===this.confirm_password){
                    this.nowLoading(); 
                    const sendData = {
                        firstname: this.firstname,
                        middlename: this.middlename,
                        lastname: this.lastname,
                        gender: this.gender,
                        birthday: this.birthday,
                        contactnumber : this.contact_num,
                        course: parseInt(this.course),
                        batch: this.batch,
                        student_id: parseInt(this.student_id),
                        email: this.email,
                        password: this.password,
                    }
                    try {
                        const res = await axios.post(`${this.PORT}/auth/register`,sendData);
                        if(res.status===201){
                            if(res.data.message==="user created successfully"){
                                this.nowLoading();
                                  Swal.fire({
                                    position: "center",
                                    title: `Success`,
                                    text: `Wait for admin to activate your account.`,
                                    icon: "success"
                                }).then(()=>{
                                    window.location = "/login"
                                });
                                
                            }else{
                                document.getElementById("message").textContent = res.data.message;
                            }
                        }
                    } catch (error){
                        document.getElementById("message").textContent = "Something wrong";
                    }
                }
                else{
                    document.getElementById("message").textContent = "Not match password and confirm password";
                }
            }
        }
    }
</script>

<style scoped>

</style>