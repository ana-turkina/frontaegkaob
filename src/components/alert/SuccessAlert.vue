<template>
  <div v-if="successMessage.length > 0" class="alert alert-success" role="alert">
    {{ successMessage }}
  </div>
</template>
<script>
console.log("Olen siin SuccessAlert.vue")

export default {
  name: 'SuccessAlert',
  props: {
    successMessage: String
  },
}
</script>