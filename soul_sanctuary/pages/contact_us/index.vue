<template>
  <Head>
    <Title>Soul Sanctuary - Contact Us</Title>
  </Head>
    
  <main>
    <div class="ContactUs_container">
      <div class="contact_sx">
        <p class="map_text subtitle">Come find us at:</p>
        <p class="address text">Via delle Rose, 3,  20147 Milan (MI)</p>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.9924146157887!2d9.132024075630085!3d45.44980897107375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c3ccee3628bf%3A0xb5aa44c4f52bf2e5!2sVia%20delle%20Rose%2C%203%2C%2020147%20Milano%20MI!5e0!3m2!1sit!2sit!4v1746285465739!5m2!1sit!2sit" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="map_embed"></iframe>        
        <div class="opening_hours">
          <p class="subtitle">Opening Hours:</p>
          <div class="weekday_hours">
            <p class="text" >Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p class="text">Saturday - Sunday: 10:00 AM - 4:00 PM</p>
          </div>
        </div>
      </div>

      <div class="contact_dx">
        <div class="contacts">
          <div>
            <p class="subtitle">Call us: </p>
            <a class="number text" href="tel:+393495678989">📞 +39 349 567 8989</a>
          </div>

          <div>
            <p class="subtitle">Send us an email at: </p>
            <a class="mail text" href="mailto:soul_sanctuary@gmail.com">✉️ soul_sanctuary@gmail.com</a>
          </div>
        </div>

        <div>
          <p class="subtitle">Follow us on:</p>
          <a href="https://www.instagram.com" class="social_logo" target="_blank" aria-label="Link to Instagram"><img src="/assets/svgs/instagram.svg" alt="Instagram"></a>
          <a href="https://www.facebook.com" class="social_logo" target="_blank" aria-label="Link to Facebook"><img src="/assets/svgs/facebook.svg" alt="Facebook"></a>
          <a href="https://x.com" class="social_logo" target="_blank" aria-label="Link to X"><img src="/assets/svgs/twitter.svg" alt="X"></a>
          <a href="https://www.tiktok.com" class="social_logo" target="_blank" aria-label="Link to TikTok"><img src="/assets/svgs/tiktok.svg" alt="TikTok"></a>
        </div>
      </div>

    </div>

  </main>

</template>
  
<script setup>

//TO DO Search Engine Optimization 
</script>
  
<style scoped>

  .ContactUs_container {
      display: flex;                       
      flex-direction: column;               
      margin: 0px;                            
      justify-content: center;             
      width: 100vw;                         
  }

  .contact_sx{
    display: flex;
    flex-direction: column;               
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 100px;
  }

  .contact_dx{
    display: flex;
    flex-direction: column;               
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 100px;
  }

  .map_embed {
    width: 100%;
    height: 360px; 
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  }

  .map_embed:hover {
    border: 2px solid #3D5144;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  }

  .social {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .social_logo {
    display: inline-block;
    margin-right: 10px;
    margin-left: 10px;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, filter 0.3s ease-in-out;
    opacity: 0.7;
    filter: grayscale(100%);
  }

  .social_logo:hover {
    transform: scale(1.2);
    opacity: 1;
    filter: grayscale(0%);
    filter: brightness(1) sepia(1) hue-rotate(90deg) saturate(3);
  }

  .contacts a.number,
  .contacts a.mail {
    color: black; 
    text-decoration: none; 
  }

  .contacts a.number:hover,
  .contacts a.mail:hover {
    color: black; 
    font-weight: bold; 
    text-decoration: underline;
  }

  @media (min-width: 768px) {
      .ContactUs_container {
        flex-direction: row;              
      }
  }

  @media (min-width: 1024px) {
  .map_embed {
    width: 500px;
  }
}

@media (max-width: 1220px) and (min-width: 768px) {
    .contact_sx {
      padding: 0 50px;
    }

    .contact_dx {
      padding: 0 50px;
    }
  }

  @media (max-width: 767px) {
    .contact_sx {
      padding: 0 20px;
    }

    .contact_dx {
      padding: 0 20px;
    }
  }

</style>
