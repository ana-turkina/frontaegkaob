<template>
  <Modal ref="modalRef" close-button-name="x">
    <template #header>
      <div class="standard-subtext modal-button-container black-title-text">
        {{title }}
      </div>
      <br>
    </template>
    <template #body>
      <div class="standard-subtext-left">{{ description }}</div>
      <br>
    </template>
    <template #footer>
      <button class="black-button-text" @click="goBack">Sulge vaade</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
export default {
  name: 'MapDetailsModal',
  components: {Modal},
  props: {
    title: String,
    description: String,
  },
  methods: {

    goBack() {
      setTimeout(() => {
        this.$refs.modalRef.closeModal()
        console.log('Title:', this.title);
        console.log('Description:', this.description);
      }, 500);
    }
  }
}
</script>
