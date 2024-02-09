<template>
  <Modal ref="modalRef" close-button-name="x">
    <template #header>
      <div class="standard-subtext-black modal-button-container black-title-text">
        Logi välja
      </div>
      <br>
    </template>
    <template #body>
      <div class="standard-subtext-left">Kas oled kindel, et soovid välja logida?</div>
      <br>
    </template>
    <template #footer>
      <div class="logout-button-wrapper">
      <button class="black-button-text" @click="executeLogout">Jah</button>
      </div>
    </template>
  </Modal>
</template>


<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'LogOutModal',
  components: {Modal},
  methods: {
    executeLogout() {
      this.$emit('event-execute-logout')
      this.$refs.modalRef.closeModal()
    }
  }
}
</script>


