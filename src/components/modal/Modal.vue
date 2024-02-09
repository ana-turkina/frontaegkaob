<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-inner">
      <button type="button" class="modal-close-btn" @click="closeModal">{{ closeButtonName }}</button>
      <div class="modal-content-container">
        <slot name="header"/>
        <div class="modal-body">
          <slot name="body"/>
        </div>
        <div class="modal-footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',

  props: {
    closeButtonName: String
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    openModal() {
      this.isOpen = true
    },
    closeModal() {
      this.isOpen = false
    }
  }
}
</script>