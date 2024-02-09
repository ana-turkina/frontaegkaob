<template>
  <Modal ref="modalRef" close-button-name="x">
    <template #header>
      <div class="standard-subtext modal-button-container black-title-text">
        Salvesta Muudatused
      </div>
      <br>
    </template>
    <template #body>
      <div class="standard-subtext-left">Oled sa kindel, et soovid muudatused salvestada?</div>
      <br>
    </template>
    <template #footer>
      <button class="black-button-text" @click="saveChanges">Jah</button>
      <button class="black-button-text" @click="goBack">Loobu</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
export default {
  name: 'SaveChangesModal',
  components: {Modal},

  methods: {
    saveChanges() {
      this.$emit('event-save-changes')

      setTimeout(() => {
        this.$refs.modalRef.closeModal()
      }, 500);
    },
    goBack() {
      setTimeout(() => {
        this.$refs.modalRef.closeModal()
      }, 500);
    }
  }
}
</script>
