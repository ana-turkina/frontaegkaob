<template>
  <Modal ref="modalRef" close-button-name="x">
    <template #header>
      <div class="standard-subtext-black">
        <div class="modal-button-container black-title-text">Logi sisse</div>
      </div>
    </template>

    <template #body>
      <form>
        <input v-model="email" type="email" required class="standard-subtext-left input-text-box-narrow"
               placeholder="Email">
        <br>
        <input v-model="password" type="password" class="standard-subtext-left input-text-box-narrow" required
               placeholder="Passwort">
      </form>
    </template>

    <template #footer>
      <button class="standard-subtext-left">Unustasid parooli?</button>
      <div class="modal-button-container">
        <button type="submit" class="black-button-text" @click="login">Jätka</button>
      </div>
      <div class="modal-button-container bottom-button-container">
        <button @click="calloutSignUpModal">Ei ole kontot, loo uus</button>
      </div>
    </template>
  </Modal>
</template>

<script>
import router from "@/router";
import Modal from "@/components/modal/Modal.vue";
import SignUpModal from "@/components/modal/SignUpModal.vue";

export default {
  name: 'LoginModal',
  components: {SignUpModal, Modal},

  props: ['ToggleModal'],

  data() {
    return {
      errorMessage: '',
      email: '',
      password: '',
      loginResponse: {
        userId: 0,
        roleName: '',
      },
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },
  methods: {
    calloutSignUpModal() {
      this.$emit('event-open-signup-modal')
      this.$refs.modalRef.closeModal()
    },

    login() {
      this.$http.get("/login", {
            params: {
              email: this.email,
              password: this.password
            }
          }
      ).then(response => {
        this.loginResponse = response.data
        this.handleSuccessfulLogin();
      }).catch(error => {
        alert("Noo")
        this.handleUnSuccessfulLogin(error)
      })
    },

    handleSuccessfulLogin() {
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
      this.$emit('event-update-nav-menu')
      router.push({name: 'WelcomeRoute'})
    },
    handleUnSuccessfulLogin(error) {
      this.errorResponse = error.response.data
      const httpStatusCode = error.response.status
      if (httpStatusCode === 403 && this.errorResponse.errorCode === 111) {
        this.errorMessage = this.errorResponse.message
        setTimeout(this.resetErrorMessage, 4000)
      } else {
        router.push({name: 'errorRoute'})
      }
    },

    resetErrorMessage() {
      this.errorMessage = ''
    },
  }
}
</script>

