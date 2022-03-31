<template>
  <div class="mx-5">
    <h2 class="mt-5 text-yellow-500 uppercase text-lg font-semibold">Popular Movies</h2>
    <div class="grid gird-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8">
      <MovieItem v-for="movie in movies" :key="movie.id" :movie="movie" :genres="genres"/>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import MovieItem from "./items/MovieItem.vue";
import axios from "axios";
export default {
  name: "PopularMovie",
  components: {
    MovieItem,
  },
  data() {
    return {
      movies: [],
      genres: [],
    };
  },
  async mounted() {
    this.fetchGenres();
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=e307c533452fa386defdc60ee3c46409"
      );
      this.movies = response.data.results;
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async fetchGenres() {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=e307c533452fa386defdc60ee3c46409"
        );
        this.genres = response.data.genres;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style></style>
