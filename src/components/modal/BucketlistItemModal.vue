<template>
  <Modal ref="modalRef" close-button-name="x">
    <template #header>
      <div class="black-title-text">
        {{ bucketlistLongView.bucketlistItemTitle }}
      </div>
    </template>

    <template #body>
      <div class="standard-subtext-black">
        {{ bucketlistLongView.bucketlistItemText }}
      </div>
    </template>

    <template #footer>
      <div class="standard-subtext-black">
        {{ bucketlistLongView.bucketlistItemTimestamp }}
      </div>
    </template>
  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'bucketlistItemModal',
  components: {Modal},
  props: {
    bucketlistLongView: Object
  },
}
</script>
