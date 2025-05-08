<template>
  <header class="navbar">
    <div class="navbar-logo">
      <NuxtLink to="/" class="logo-link">
        <img src="../assets/svgs/logo.svg" alt="Soul Sanctuary Logo" class="logo-img">
      </NuxtLink>
    </div>

    <!-- Hamburger button; visible on mobile -->
    <button class="hamburger" @click="mobileMenuOpen = !mobileMenuOpen">
      <span class="hamburger-icon"></span>
      <span class="hamburger-icon"></span>
      <span class="hamburger-icon"></span>
    </button>

    <!-- Navigation links -->
    <nav class="navbar-links" :class="{ 'mobile-open': mobileMenuOpen }">
      <ul>
        <li>
          <NuxtLink to="/about" :data-text="'About Us'" @click="mobileMenuOpen = false">
            About Us
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/teachers" :data-text="'Teachers'" @click="mobileMenuOpen = false">
            Teachers
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/activities" :data-text="'Activities'" @click="mobileMenuOpen = false">
            Activities
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/highlights" :data-text="'Highlights'" @click="mobileMenuOpen = false">
            Highlights
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact_us" :data-text="'Contacts Us'" @click="mobileMenuOpen = false">
            Contacts Us
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/faq" :data-text="'FAQ'" @click="mobileMenuOpen = false">
            FAQ
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
</script>

<style scoped>
/* Desktop styles */
.navbar {
  background-color: #3D5144;
  color: #DDECEA;
  padding: 0.1rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative; /* Needed for absolute positioning of mobile menu */
  z-index: 3;
}

.navbar-logo .logo-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #DDECEA;
}

.navbar-logo .logo-img {
  height: 80px;
}

.navbar-links ul {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.navbar-links li {
  margin: 0;
  padding: 0;
}

.navbar-links a {
  color: #DDECEA;
  text-decoration: none;
  font-size: 1rem;
  font-weight: normal;
  transition: color 0.3s ease, font-weight 0.3s ease, background-color 0.3s ease, padding 0.3s ease;
  padding: 0.5rem 0;
  border-radius: 20px;
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

.navbar-links a:hover {
  font-weight: bold;
  color: #DDECEA;
}

.navbar-links a.router-link-exact-active {
  font-weight: bold;
  background-color: #DDECEA;
  color: #3D5144;
  padding: 0.5rem 1rem;
  border-radius: 20px;
}

/* Hamburger styles */
.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}

.hamburger-icon {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #DDECEA;
  margin: 4px 0;
}

/* Mobile styles */
@media (max-width: 768px) {
  /* Show hamburger button on mobile views */
  .hamburger {
    display: block;
  }

  /* Hide nav-links by default on mobile */
  .navbar-links {
    display: none;
  }

  /* Display dropdown when active */
  .navbar-links.mobile-open {
    display: block;
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    background-color: #3D5144;
    padding: 1rem 2.5rem;
  }

  .navbar-links ul {
    flex-direction: column;
    gap: 1rem;
    padding: 0;
  }
}
</style>