<template>
  <LoginModal ref="logIntModalRef"
              @event-open-signup-modal="calloutSignUpModal"
              @event-update-nav-menu="updateNavMenu"/>
  <SignUpModal ref="signUpModalRef"/>
  <div class="split-layout">
    <div class="left-half-screen centered-column">
      <span class="white-aeg-text aeg-slide-left">aeg</span>
      <div class="start-page-button-wrapper login-button-wrapper fade-in-text-delayed">
        <button type="button" class="white-button-text" @click="calloutLoginModal">
          Logi sisse
        </button>
      </div>
    </div>
    <div class="right-half-screen centered-column">
      <span class="black-kaob-text kaob-slide-right">kaob</span>
      <div class="start-page-button-wrapper signup-button-wrapper fade-in-text-delayed">
        <button type="button" class="black-button-text" @click="calloutSignUpModal">
          Loo uus konto
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import LoginModal from "@/components/modal/LoginModal.vue";
import SignUpModal from "@/components/modal/SignUpModal.vue";

export default {
  name: 'HomeView',

  components: {SignUpModal, LoginModal},

  methods: {

    calloutLoginModal() {
      this.$refs.logIntModalRef.$refs.modalRef.openModal()
    },

    calloutSignUpModal() {
      this.$refs.signUpModalRef.$refs.modalRef.openModal()
    },

    updateNavMenu() {
      this.$emit('event-update-nav-menu')
    }
  }
}

</script>
