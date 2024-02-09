<template>
  <img v-if="imageDataBase64 === '' || imageDataBase64 === null" src="@/assets/profile-pic-placeholder.png"
       class="img-thumbnail" alt="Your Current Profile Picture">
  <img v-else :src="imageDataBase64" class="img-thumbnail" alt="Your Profile Picture">
</template>
<script>
export default {
  name: 'ProfilePictureImage',
  props: {
    imageDataBase64: String
  }
}
</script>