<template>
  <div class="flex">
    <router-link to="/">
      <img src="@/assets/images/logo.png" alt="">
    </router-link>
      <ul class="flex mt-5">
        <li class="ml-5">
          <router-link to="/">
            Movies
          </router-link>
        </li>
        <li class="ml-5">
          <router-link :to="{ name: 'actors'}">
            Actors
          </router-link>
        </li>
        <li class="ml-5">
          <router-link to="{ name: 'profile'}">
            Profile
          </router-link>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
    name: 'Navbar',
}
</script>

<style>

</style>