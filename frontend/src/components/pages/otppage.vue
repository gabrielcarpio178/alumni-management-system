<template>
    <div>
        <Topbar/>
        <Loader v-bind:isLoader='isLoader'/>
        <div class="relative left-1/2 top-1/4 translate-y-1/2 -translate-x-1/2">
            <div class="dark:text-white max-w-md mx-auto text-center dark:bg-gray-800 dark:border-gray-700 bg-gray-200 px-4 sm:px-8 py-10 rounded-xl shadow">
                <header class="mb-8">
                    <h1 class="text-2xl font-bold mb-1">Email Verification</h1>
                    <p class="text-[15px] text-slate-500">Enter the 4-digit verification OTP that was sent to your gmail account.</p>
                </header>
                <form @submit="verifyOtp">
                    <div class="flex items-center justify-center gap-3">
                        <input
                            v-for="(digit, index) in otp"
                            :key="index"
                            type="text"
                            class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                            maxlength="1"
                            :value="digit"
                            @keypress="validate($event)"
                            required=""/>
                        
                    </div>
                    <p class="whitespace-nowrap text-[15px] text-slate-500">This OTP will be expire in <span id="expire_time"></span> mins</p>
                    <div class="max-w-[260px] mx-auto mt-4">
                        <button type="submit" class="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150">Verify Account</button>
                    </div>
                </form>
                <div class="text-sm text-slate-500 mt-4">Didn't receive OTP? <button class="font-medium text-indigo-500 hover:text-indigo-600" @click="resendOTP">Resend</button></div>
            </div>
        </div>
    </div>    
</template>

<script>
import moment from 'moment'
import Topbar from '../layout/header.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import Loader from '../layout/loader.vue';

export default {
    name: 'otp',
    components: {
        Topbar,
        Loader
    },
    data(){
        return{
            otp: Array(4).fill(''),
            expire_time: JSON.parse(localStorage.getItem('req_data')).expire_time,
            isLoader : 'loader-hide'
        }
    },
    mounted(){
        this.displayExpireDate()
    },
    methods: {
        validate(evt) {
            var theEvent = evt || window.event;
            if (theEvent.type === 'paste') {
                key = event.clipboardData.getData('text/plain');
            } else {
                var key = theEvent.keyCode || theEvent.which;
                key = String.fromCharCode(key);
            }
            var regex = /[0-9]|\./;
            if( !regex.test(key) ) {
                theEvent.returnValue = false;
                if(theEvent.preventDefault) theEvent.preventDefault();
            }
        },

        getDurretion(expire_time){
            const expire_datetime = moment(expire_time);
            const current_datetime = moment(moment().format());
            const seconds = expire_datetime.diff(current_datetime, 'seconds');
            if(seconds<0){
                return "00:00";
            }
            return moment.utc(seconds*1000).format('mm:ss')
        },

        displayExpireDate(){
            setTimeout(()=>{
                document.getElementById("expire_time").textContent = this.getDurretion(this.expire_time)
                if(this.getDurretion(this.expire_time)!=="00:00") this.displayExpireDate()
            }, 1000);
        },

        nowLoading(){
            if(this.isLoader==='loader-hide'){
                this.isLoader = 'loader-display';
            }else{
                this.isLoader = 'loader-hide'
            }
        },

        async verifyOtp(e){
            e.preventDefault()
            const numbers_el = document.querySelectorAll("input[type=text]")
            let otp_send = ''
            numbers_el.forEach(number_el=>{
                otp_send+=number_el.value
            })
            var req_data = JSON.parse(localStorage.getItem('req_data'))
            req_data.otp = otp_send;
            const isExpire = this.getDurretion(this.expire_time)!=="00:00";
            
            if(isExpire){
                this.nowLoading()
                try {
                    const result = await axios.post(`${this.PORT}/auth/verification_OTP`, req_data);
                    if(result.data.message==='invalid otp'){
                        Swal.fire({
                            position: "center",
                            title: `Incorrect OTP`,
                            text: `Please resend if you don't receive OTP`,
                            icon: "error",
                        })
                    }else if(result.data.message==='success'){
                        Swal.fire({
                            position: "center",
                            title: `Correct OTP`,
                            text: `Wait for system admin to activate your account`,
                            icon: "success",
                        }).then(()=>{
                            localStorage.removeItem('req_data');
                            localStorage.removeItem('role');
                            window.location = '/login'
                        })
                    }
                } catch (error) {
                    console.log(error);
                }finally{
                    this.nowLoading()
                }
            }else{
                Swal.fire({
                    position: "center",
                    title: `Expire OTP`,
                    text: `Please resend if you don't receive OTP`,
                    icon: "error",
                })
            }
            
        },
        async resendOTP(){
            var req_data = JSON.parse(localStorage.getItem('req_data'));
            var email = req_data.email;
            Swal.fire({
                title: "Are you sure?",
                text: "Do want tot resend",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, resend it!"
            }).then(async (result) => {
                if (result.isConfirmed) { 
                    this.nowLoading()
                    try {
                        const result = await axios.post(`${this.PORT}/auth/resend_OTP`, {email});
                        var {expire_time, hashOtp} = result.data.request_data;
                        req_data.expire_time = expire_time;
                        req_data.hashOtp = hashOtp
                        var new_req_data = JSON.stringify(req_data);
                        localStorage.setItem('req_data', new_req_data);
                        Swal.fire({
                            position: "center",
                            title: `Resend Success`,
                            text: `Please your gmail account`,
                            icon: "success",
                        }).then(()=>{
                             window.location = '/otp'
                        })
                    } catch (error) {
                        console.log(error)
                    }finally{
                        this.nowLoading()
                    }
                }
            })
        }
    }
}    

</script>
