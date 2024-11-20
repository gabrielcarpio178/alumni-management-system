<template>
    <section class="main-loader" :class="isLoader">
        <div class="loader">
            <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </section>
    
</template>

<script>
export default {
    props: ['isLoader']
}
</script>



<style scoped>
    .loader-hide{
        display: none;
    }
    .loader-display{
        display: block;
    }
    .main-loader{
        background-color: rgba(255, 255, 255, 0.5);
        position: fixed;      
        z-index: 1000000;
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }
    .loader{
        display: grid;
        place-items: center;
        height: 100vh;
    }
    .lds-ring,
    .lds-ring div {
        box-sizing: border-box;
    }
    .lds-ring {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }
    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 64px;
        height: 64px;
        margin: 8px;
        border: 8px solid currentColor;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: currentColor transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    }

</style>

