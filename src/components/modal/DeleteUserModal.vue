<template>
  <Modal ref="modalRef" close-button-name="x">
    <template #header>
      <div class="standard-subtext-black modal-button-container black-title-text">
        Konto Kustutamine
      </div>
      <br>
    </template>
    <template #body>
      <div class="standard-subtext-left">Kas oled kindel, et soovid oma kontot kustutada?</div>
      <br>
    </template>
    <template #footer>
      <div class="logout-button-wrapper">
        <button @click="deleteUser" type="submit" class="black-button-text">KUSTUTA</button>
      </div>
    </template>
  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
  name: 'deleteUserModal',
  components: {Modal},
  data() {
    return {}
  },
  computed: {
    userId() {
      return sessionStorage.getItem('userId')
    }
  },
  methods: {
    deleteUser() {
      this.$http.delete("/user", {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        this.$emit('user-deleted')
          this.$refs.modalRef.closeModal();
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },
  }

}
</script>