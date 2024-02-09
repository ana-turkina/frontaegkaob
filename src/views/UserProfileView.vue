<template>
  <DeleteUserModal ref="deleteUserModalRef" @user-deleted="handleUserDeleted"/>
  <div class="split-layout">
    <div class="left-half-screen centered-column">
      <div class="white-title-text">Sinu email:</div>
      <div class="white-body-text">{{ userProfileInfo.userEmail }}</div>
      <br>
      <br>
      <div class="white-title-text">Sinu pilt:</div>
      <img :src="'data:image/jpg;base64,' + userProfileInfo.userAvatar" alt="Your Current Profile Picture">
    </div>
    <div class="right-half-screen centered-column">
      <div class="black-pg-header2">Profiili seaded</div>
      <br>
      <br>
      <table>
        <tr>
          <SuccessAlert :success-message="successMessage"/>
        </tr>
        <tr>
          <td class="black-title-text">Lisa või muuda email:</td>
          <td><input type="email" v-model="newEmail" class="standard-subtext-left input-text-box-narrow"
                     placeholder="new Email"/></td>
        </tr>
        <br>
        <tr>
          <td class="black-title-text">Lisa või muuda profiili pilt:</td>
          <td><input type="file" @change="onFileChange"/></td>
        </tr>
      </table>
      <br>
      <br>
      <div class="">
        <button type="button" class="black-button-text" @click="calloutDeleteUserModal">Kustuta konto</button>
        <button @click="updateUserProfileInfo" type="button" class="black-button-text">SALVESTA</button>
        <button type="button" @click="$router.go(-1)" class="black-button-text">Mine tagasi</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProfilePictureImage from "@/components/image/ProfilePictureImage.vue";
import router from "@/router";
import DeleteUserModal from "@/components/modal/DeleteUserModal.vue";
import SuccessAlert from "@/components/alert/SuccessAlert.vue";

export default {
  name: 'userProfileView',
  components: {SuccessAlert, DeleteUserModal, ProfilePictureImage},
  data() {
    return {
      successMessage: '',
      userId: 0,
      userProfileInfo: {
        userEmail: '',
        userAvatar: ''
      },
      newEmail: '',
      newAvatar: null
    };
  },
  created() {
    this.userId = sessionStorage.getItem('userId');
    this.getEmailAndProfilePicture()
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.setImageData(e.target.result);
      }
      reader.readAsDataURL(file);
    },
    getEmailAndProfilePicture(callback) {
      this.$http.get('/profile', {
            params: {
              userId: this.userId,
            }
          }
      ).then(response => {
        console.log(response); // Logs entire response
        if (response.data && response.data.userEmail && response.data.userAvatar) {
          this.userProfileInfo = {
            userEmail: response.data.userEmail,
            userAvatar: response.data.userAvatar
          };
          if (callback) callback();
        } else {
          console.log("User profile data is missing in the response");
        }
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },
    setImageData(imageData) {
      this.newAvatar = imageData.split(',')[1];
    },
    calloutDeleteUserModal() {
      this.$refs.deleteUserModalRef.$refs.modalRef.openModal()
    },
    handleUserDeleted() {
      sessionStorage.clear()
      this.$emit('event-update-nav-menu')
      router.push({name: 'homeRoute'})
    },
    updateUserProfileInfo() {
      this.getAndSetUserProfileInfoValues()
      this.$http.put("/profile", this.userProfileInfo, {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        this.successMessage = 'Andmed on edukalt muudetud!'
        this.getEmailAndProfilePicture(() => {
          this.successMessage = 'Profiili andmed uuendatud!'
        });
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },
    getAndSetUserProfileInfoValues() {
      this.userProfileInfo.userEmail = this.newEmail;
      this.userProfileInfo.userAvatar = this.newAvatar;
    },
    resetSuccessMessage() {
      this.successMessage = ''
    },
  }
}
</script>
