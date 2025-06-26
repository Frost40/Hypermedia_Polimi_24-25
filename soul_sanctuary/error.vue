<script setup>
import wallpaper from "/assets/webp/wallpaper.webp";

  // Define the background style with the wallpaper image
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${wallpaper})`,
    backgroundSize: 'auto',
    backgroundPosition: 'top center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'repeat',
  }

</script>
<template>
    <div :style="backgroundStyle">
        <div class="container">
            <div class="subtitle"> 404 </div>
            <div class="text">Sorry, we couldn't find the page you where looking for...</div><br>   
            <div class="text">                    
                <div class="text">You can visit our homepage at:</div>
            </div>    
            <NuxtLink to="/" class="button">Home Page</NuxtLink>       
        </div>     
    </div>    

</template>



<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100%;
    }

    @media screen and (max-width: 768px) {
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin-top: 3vh;
        }
    }

    .button {
        display: inline-block;
        background-color: #3D5144;
        color: #BCC7C2;
        padding: 0.6rem 1.2rem;
        margin-top: 1rem;
        border-radius: 10px;
        font-size: 1rem;
        text-decoration: none;
        transition: font-weight 0.3s ease;
        align-self: center;
    }

    .button:hover {
        font-weight: bold;
    }

    .button.small {
        width: fit-content;
        align-self: center;
    }

</style>