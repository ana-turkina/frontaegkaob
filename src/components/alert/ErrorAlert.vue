<template>
  <div v-if="errorMessage.length > 0" class="white-pg-header4 alert-error" role="alert">
    {{ errorMessage }}
  </div>
</template>
<script>
export default {

  name: 'ErrorAlert',
  props: {
    errorMessage: String
  }
}
</script>