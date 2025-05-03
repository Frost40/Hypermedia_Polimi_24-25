<template>
  <header class="navbar">
    <div class="navbar-logo">
      <NuxtLink to="/" class="logo-link">
        <img src="../assets/svgs/logo.svg" alt="Soul Sanctuary Logo" class="logo-img">
      </NuxtLink>
    </div>

    <nav class="navbar-links">
      <ul>
        <li><NuxtLink to="/about" :data-text="'About Us'">About Us</NuxtLink></li>
        <li><NuxtLink to="/teachers" :data-text="'Teachers'">Teachers</NuxtLink></li>
        <li><NuxtLink to="/activities" :data-text="'Activities'">Activities</NuxtLink></li>
        <li><NuxtLink to="/highlights" :data-text="'Highlights'">Highlights</NuxtLink></li>
        <li><NuxtLink to="/contact_us" :data-text="'Contacts Us'">Contacts Us</NuxtLink></li>
        <li><NuxtLink to="/faq" :data-text="'FAQ'">FAQ</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>

</script>

<style scoped>
/* Styles specific to this component. 'scoped' ensures that styles
   only apply to this component to prevent conflicts. */

.navbar {
  background-color: #3D5144; /* Dark background color similar to the image */
  color: #DDECEA; /* Default text color */
  padding: 0.1rem 2rem; /* Inner spacing (top/bottom and sides) */
  display: flex; /* Use Flexbox to align elements */
  justify-content: space-between; /* Distribute space between logo and links */
  align-items: center; /* Vertically center items */
}

.navbar-logo .logo-link {
  display: flex; /* Use flex to align the logo image and text */
  flex-direction: column; /* Stack image and text */
  align-items: center; /* Center the image and text */
  text-decoration: none; /* Remove underline from the link */
  color: #DDECEA; /* Logo text color */
}

.navbar-logo .logo-img {
  height: 80px; /* Height of the logo image. Adjust as needed */
}

.navbar-links ul {
  list-style: none; /* Remove list bullets */
  margin: 0;
  padding: 0;
  display: flex; /* Use Flexbox to arrange links in a row */
  gap: 1.5rem; /* Space between links */
  align-items: center; /* Center link text vertically */
}

.navbar-links li {
  margin: 0;
  padding: 0;
}

.navbar-links a {
  color: #DDECEA; /* Link color */
  text-decoration: none; /* Remove link underline */
  font-size: 1rem; /* Link text size */
  font-weight: normal; /* Base font weight for transition */
  transition: color 0.3s ease, font-weight 0.3s ease, background-color 0.3s ease, padding 0.3s ease; /* Smooth transition for multiple properties */
  padding: 0.5rem 0; /* Add some vertical padding for click area, no horizontal padding initially */
  border-radius: 20px; /* Apply border-radius even when not active, but no background/padding */
  /* Reserve space for bold version */
  display: inline-block;
  position: relative;
}

.navbar-links a::after {
  content: attr(data-text);
  font-weight: bold;
  visibility: hidden;
  height: 0;
  overflow: hidden;
  display: block;
}

/* Hover effect: text becomes bold */
.navbar-links a:hover {
  font-weight: bold; /* Make text bold on hover */
  color: #DDECEA; /* Optional: change color slightly on hover */
}

/* Style for the active link (current page) */
/* NuxtLink adds the 'router-link-exact-active' class when the route matches exactly */
.navbar-links a.router-link-exact-active {
  font-weight: bold; /* Make the active link bold by default */
  background-color: #DDECEA; /* Light background for the active link */
  color: #3D5144; /* Dark text color for the active link */
  padding: 0.5rem 1rem; /* Add padding to create the button shape */
  border-radius: 20px; /* Rounded corners for the button shape */
  /* Adjust margin or gap if the added padding affects spacing */
}

/* Ensure active link is also bold on hover - inherited from :hover rule */
/* .navbar-links a.router-link-exact-active:hover { ... } - no need to override, it inherits */
</style>