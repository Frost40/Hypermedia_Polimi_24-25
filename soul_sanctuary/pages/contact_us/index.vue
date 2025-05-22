<template>
  <!-- Head section for SEO and metadata -->
  <Head>
    <!-- Page title -->
    <Title>Soul Sanctuary - Contact Us</Title>
    <!-- Meta robots tag for search engine crawling -->
    <meta nrel="robots" content="index, follow">
    <!-- Canonical link to avoid duplicate content issues -->
    <link rel="canonical" href="https://soulsanctuary-ten.vercel.app/contact_us">
  </Head>

  <!-- Main content container with background styling -->
  <div :style="backgroundStyle">
    <main class="main" role="main">
      <!-- Contact Us container -->
      <div class="ContactUs_container">

        <!-- Left side of the contact information -->
        <div class="contact_sx">
          <p class="map_text subtitle">Come find us at:</p>
          <p class="address text">Via delle Rose, 3,  20147 Milan (MI)</p>
          <!-- Google Maps embed -->
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.9924146157887!2d9.132024075630085!3d45.44980897107375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c3ccee3628bf%3A0xb5aa44c4f52bf2e5!2sVia%20delle%20Rose%2C%203%2C%2020147%20Milano%20MI!5e0!3m2!1sit!2sit!4v1746285465739!5m2!1sit!2sit" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="map_embed"></iframe>        
          <!-- Opening hours section -->
          <div class="opening_hours">
            <p class="subtitle">Opening Hours:</p>
            <div class="weekday_hours">
              <p class="text" >Monday - Friday: 7:00 AM - 6:00 PM</p>
              <p class="text">Saturday - Sunday: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>

        <!-- Right side of the contact information -->
        <div class="contact_dx">
          <!-- Contact details -->
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

          <!-- Social media links -->
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
  </div>

</template>
  
<script setup>

  // Search Engine Optimization variables
  const description = ref('This page contains contact information, such as the center address with opening hours, e-mail, telephone number and social media links ')
  const keywords = ref('Contact us, Center, Position, Telephone, Mail, Opening, Social')
  const og_title = ref('Soul Sanctuary - Contact Us')
  const og_description = ref('Discover our contacts' )
  const twitter_title = ref('Soul Sanctuary - Contact Us' )
  const twitter_description = ref('Discover our contacts')

  // useHead composable for setting meta information
  useHead({
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      // Open Graph tags for better social sharing specific to this page
      { property: 'og:title', content:  og_title},
      { property: 'og:description', content: og_description},
      // Twitter card tags for better sharing on Twitter
      { name: 'twitter:title', content: twitter_title},
      { name: 'twitter:description', content: twitter_description},
    ]
  })

  // Import wallpaper image
  import wallpaper from '@/assets/png/wallpaper.png'

  // Background style definition
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${wallpaper})`,
    backgroundSize: 'auto',
    backgroundPosition: 'top center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'repeat',
  }

</script>
  
<style scoped>

  .main{
    max-width: 1440px;
  }

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
