<template>
  <div>
    <div class="container mx-auto flex mt-20 border-b border-gray-600 pb-2">
      <img :src="posterPath" alt="" class="w-64" />
      <div class="ml-24">
        <h1 class="text-4xl font-semibold">{{ this.movie.title }}</h1>
        <span class="text-gray-500 text-sm flex">
          <svg class="fill-current text-yellow-500 w-4 h-4 mt-1" viewBox="0 0 24 24">
            <g data-name="Layer 2">
              <path
                d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
                data-name="star"
              />
            </g>
          </svg>
          {{ this.movie.vote_average * 10 }}% | {{ this.movie.release_date }}
          <span :key="index" v-for="(item, index) in movie.genres" class="ml-2">
            {{ item.name }}
            <span v-if="movie.genres.length - 1 != index">,</span>
          </span>
        </span>
        <p class="mt-5">
          {{ this.movie.overview }}
        </p>
        <div class="mt-5">
          <span class="mt-5 font-semibold">Feature Cast</span>
          <div class="flex">
            <div v-for="(crew, index) in crews" :key="index">
              <div v-if="index < 2" class="flex flex-col mt-5 mr-5">
                <span>{{ crew.name }}</span>
                <span class="text-gray-500">{{ crew.job }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5">
          <a
            @click.prevent="openYoutubeModel"
            :href="youtubeVideo"
            target="_blank"
            class="rounded bg-yellow-500 px-5 py-4 inline-flex text-black"
          >
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
              />
            </svg>
            <span class="ml-3">Play Trailer</span>
          </a>
          <a href="#" class="rounded bg-yellow-500 px-5 py-4 inline-flex text-black ml-5">
            <img src="@/assets/images/heart-white.png" alt="" />
            <span class="ml-3">Favorite</span>
          </a>
        </div>
      </div>
    </div>
    <Cast :casts="casts" />
    <Image :images="images" />
    <MediaVideo v-model="modelOpen" :mediaURL="mediaURL" :isShow="isShow" :isVideo="isVideo" @modal-video="modalVideo"/>
  </div>
</template>

<script>
import Cast from "./Cast.vue";
import Image from "./Image.vue";
import MediaVideo from "@/components/models/MediaVideo.vue";
import axios from "axios";
export default {
  name: "Movie",
  components: {
    Cast,
    Image,
    MediaVideo,
  },
  data() {
    return {
      movie: [],
      casts: [],
      images: [],
      crews: [],
      video: [],
      modelOpen: false,
      isVideo: false,
      mediaURL: "",
      isShow: false,
    };
  },
  async mounted() {
    await this.fetchMovie(this.$route.params.id);
    this.casts = this.movie.credits.cast;
    this.images = this.movie.images.backdrops;
    this.crews = this.movie.credits.crew;
    this.video = this.movie.videos.results[0].key;
    console.log(this.video);
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.fetchMovie(this.$route.params.id);
      }
    }
  },
  methods: {
    async fetchMovie(movieId) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=e307c533452fa386defdc60ee3c46409&append_to_response=credits,videos,images`
        );
        this.movie = response.data;
      } catch (e) {
        console.log(e);
      }
    },
    youtubeVideo() {
      if (!this.video) return;
      return "https://www.youtube.com/embed/" + this.video;
    },
    openYoutubeModel() {
      this.mediaURL = this.youtubeVideo();
      this.modelOpen = true;
      this.isVideo = true;
      this.isShow = true;
    },
    openImageModel() {
      this.modelOpen = true;
      this.isVideo = false;
    },
    modalVideo(e) {
      this.isShow = e;
    }
  },
  computed: {
    posterPath() {
      return "https://image.tmdb.org/t/p/w500/" + this.movie.poster_path;
    },
  },
};
</script>

<style></style>
