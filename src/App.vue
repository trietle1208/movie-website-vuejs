<template>
  <div class="flex justify-between border-b border-gray-500">
    <navbar></navbar>
    <search-bar></search-bar>
  </div>
  <router-view />
</template>
<script>
import Navbar from "./components/header/Navbar.vue";
import SearchBar from "./components/header/SearchBar.vue";
export default {
  name: "App",
  components: {
    Navbar,
    SearchBar,
  },
};
</script>
<style></style>
