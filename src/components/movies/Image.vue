<template>
  <div class="container mx-auto border-b border-gray-600 px-4 py-4">
      <h2 class="text-4xl font-semibold mb-5">
          Images
      </h2>

      <div class="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div class="mr-2 mt-2" v-for="(image,index) in images" :key="image.id">
            <img :src="imageProfileImage(image)"
             alt="" 
             class="hover:opacity-75 transition ease-in-out duration-150"
             />
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Image',
    props: {
      images: {
        required: true,
      }
    },
    methods: {
      imageProfileImage(image) {
        if(image.file_path){
          return "https://image.tmdb.org/t/p/w300/" + image.file_path;
        }else {
          return "https://via.placeholder.com/300x450";
        }
      }
    }
}
</script>

<style>

</style>