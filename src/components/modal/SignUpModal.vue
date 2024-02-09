<template>
  <div v-if="showModal">
    <Modal ref="modalRef" close-button-name="x">
      <SuccessAlert :success-message="successMessage"/>
      <ErrorAlert :error-message="errorMessage"/>
      <template #header>
        <div class="standard-subtext-black">
          <div class="modal-button-container black-title-text">Sign Up</div>
        </div>
      </template>
      <template #body>
        <form id="termsForm" class="sign-up-form-wrapper" @submit.prevent="addNewUser">
          <input v-model="email" type="email" required class="standard-subtext-left input-text-box-narrow"
                 placeholder="Email">
          <input v-model="password" type="password" required class="standard-subtext-left input-text-box-narrow"
                 placeholder="neues Passwort">
          <input type="password" required class="standard-subtext-left input-text-box-narrow"
                 placeholder="neues Passwort">
          <div class="standard-subtext-black">

            <p v-if="alertVisible" class="alert alert-error">
              You must accept the Term und Condition.</p>

            <label for="termsCheckbox">
              <input type="checkbox" id="termsCheckbox" v-model="checkboxValue">
              <span class="standard-subtext-black checkmark">
                Nõustun tingimustega, privaatsuspoliitikaga <br>
                ja luban järgmine kord jagada küpsiseid, kui mul kaasas on.
              </span>
            </label>
            <div class="modal-button-container">
              <button type="submit" class="black-button-text">Jätka</button>
            </div>
          </div>
        </form>
      </template>
      <template #footer>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";
import ErrorAlert from "@/components/alert/ErrorAlert.vue";
import SuccessAlert from "@/components/alert/SuccessAlert.vue";

export default {
  name: 'SignUpModal',
  components: {SuccessAlert, ErrorAlert, Modal},

  data() {
    return {
      checkboxValue: false,
      alertVisible: false,
      showModal: true,

      errorMessage: '',
      successMessage: '',

      email: '',
      password: '',

      newUserInfo: {
        email: '',
        password: '',
      }

    }
  },
  methods: {
    termAndConditionsAccepted() {
      return this.checkboxValue;
    },

    addNewUser() {
      this.alertVisible = false;
      let accepted = this.termAndConditionsAccepted();
      if (accepted) {
        this.getAndSetNewUserRequestValues();
        this.postNewUserInfo();
      } else {
        this.alertVisible = true;
      }

    },
    getAndSetNewUserRequestValues() {
      this.newUserInfo.email = this.email
      this.newUserInfo.password = this.password
    },
    postNewUserInfo() {
      this.$http.post("/user", this.newUserInfo
      ).then(response => {
        this.resetAllFields();
        this.successMessage = 'Form submitted! \n' +
            'Now you can go ahead and Log In!'
        setTimeout(this.resetSuccessMessage, 4000)
        this.$refs.modalRef.closeModal()
      }).catch(error => {
        this.errorResponse = error.response.data
        this.handlePostNewUserInfoError(error.response.status);
      })
    },
    handlePostNewUserInfoError(status) {
      if (status === 403) {
        this.errorMessage = this.errorResponse.message;
        setTimeout(this.resetErrormessage, 4000);
      } else {
        router.push({name: 'errorRoute'})
      }
    },

    resetAllFields() {
      this.email = ''
      this.password = ''
    },

    resetSuccessMessage() {
      this.successMessage = '';
    },
    resetErrormessage() {
      this.errorMessage = '';
    }

  }
}
</script>