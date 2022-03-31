<template>
  <div class="container mx-auto px-4 py-16">
    <h2 class="text-yellow-500 text-lg uppercase font-semibold">Popular Actors</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <ActorItem v-for="(actor, index) in actors" :key="actor.id" :actor="actor" />
    </div>
    <div class="flex justify-center">
      <div class="spinner">11</div>
    </div>
  </div>
</template>

<script>
let currentPage = 1;

import ActorItem from "@/components/items/ActorItem.vue";
import axios from "axios";
export default {
  name: "Actors",
  data() {
    return {
      actors: [],
    };
  },
  components: {
    ActorItem,
  },
  mounted() {
    this.fetchActor(currentPage);
    this.scroll();
  },
  methods: {
    async fetchActor(page) {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/person/popular?api_key=e307c533452fa386defdc60ee3c46409&page=" +
            page
        );
        this.actors = response.data.results;
        console.log(this.actors);
      } catch (error) {
        console.log(error);
      }
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          currentPage += 1;
          this.fetchActors((currentPage += 1));
        }
      };
    },
  },
};
</script>

<style></style>
