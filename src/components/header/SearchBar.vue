<template>
  <div class="mt-5 flex relative">
    <input
      ref="searchBox"
      type="text"
      name=""
      id=""
      class="rounded-full bg-gray-600 px-7 w-50 h-10 mr-3 focus:outline-none focus:outline-shadow"
      placeholder="Search..."
      @input="debounceSearch"
      @focus="handleFocus"
    />

    <div class="absolute top-0">
      <svg class="fill-current w-4 text-gray-300 mt-3 ml-2" viewBox="0 0 24 24">
        <path
          class="heroicon-ui"
          d="M16.32 14.9l5.39 5.4a1 1 0 01-1.42 1.4l-5.38-5.38a8 8 0 111.41-1.41zM10 16a6 6 0 100-12 6 6 0 000 12z"
        />
      </svg>
    </div>

    <div class="absolute mt-12 ml-2 rounded bg-gray-600 w-60">
      <ul class="mt-3" v-if="showSearchResults">
        <li :key="index" v-for="(movie, index) in searchResult">
          <router-link
            :to="`/movie/${movie.id}`"
            @click.native="showSearchResults = false"
            class="flex items-center border-b border-gray-500 p-1"
          >
            <img :src="posterPath(movie.poster_path)" alt="" class="w-10" />
            <span class="ml-3">{{ movie.title }}</span>
          </router-link>
        </li>
      </ul>
      <ul v-else>
        <li v-if="noResultFound">No result found</li>
      </ul>
    </div>

    <img
      src="@/assets/images/joker.jpg"
      alt=""
      class="rounded-full h-10"
      style="width: 40px; height: 40px"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SearchBar",
  data() {
    return {
      searchResult: [],
      noResultFound: "",
      showSearchResults: false,
    };
  },
  mounted() {
    this.keyboardEvents();
  },
  methods: {
    debounceSearch(event) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        if (event.target.value.length > 3) {
          this.fetchSearch(event.target.value);
        }
      }, 600);
    },
    async fetchSearch(term) {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/search/movie?api_key=e307c533452fa386defdc60ee3c46409&query=" +
            term
        );
        this.searchResult = response.data.results;
        this.showSearchResults = response.data.results ? true : false;
        this.noResultFound = response.data.results ? true : false;
      } catch (error) {
        console.log(error);
      }
    },
    posterPath(poster_path) {
      if (poster_path) {
        return "https://image.tmdb.org/t/p/w500/" + poster_path;
      } else {
        return "https://via.placeholder.com/50x75";
      }
    },
    keyboardEvents() {
      let windowObj = this;
      window.addEventListener("keypress", (e) => {
        if (e.keyCode == "47") {
          e.preventDefault();
          // windowObj.$refs.searchBox.focus();
        }
      });
      window.addEventListener("keydown", (e) => {
        if (e.key == "Escape") {
          this.showSearchResults = false;
          this.noResultFound = false;
        }
      });
    },
  },
};
</script>

<style></style>
