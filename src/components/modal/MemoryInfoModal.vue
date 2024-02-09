<template>
  <Modal ref="modalRef" close-button-name="x">
    <template #header>
      <div class="black-title-text">
        {{ memoryLongView.memoryTitle }}
      </div>
    </template>

    <template #body>
      <div class="standard-subtext-black">{{ memoryLongView.memoryText }}</div>
    </template>

    <template #footer>
      <div class="standard-subtext-black">Mälestus lisatud: {{ memoryLongView.memoryTimestamp }}</div>
    </template>
  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'memoryInfoModal',
  components: {Modal},
  props: {
    memoryLongView: {}
  },
}
</script>