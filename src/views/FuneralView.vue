<template>
  <SaveChangesModal ref="saveChangesModalRef" @event-save-changes="deleteOldFuneralInstructions"/>
  <ErrorAlert :error-message="this.errorMessage"/>
  <SuccessAlert :success-message="this.successMessage"/>
  <div class="split-layout">
    <div class="left-half-screen centered-column">
      <div class="white-pg-header4">
        <div class="white-body-text">
          <span>Testamendi asukoht/valdaja:</span>
          <input v-model="funeralInfo.testament" type="text" class="input-text-box-wide">
        </div>
        <br>
        <div class="white-body-text">
          <span>Mida peielauas süüa saab?:</span>
          <input v-model="funeralInfo.menüü" type="text" class="input-text-box-wide">
        </div>
        <br>
        <div class="input-group mb-3 white-body-text">
          <span>Info hauaplatsi kohta:</span>
          <input v-model="funeralInfo.hauaplats" type="text" class="input-text-box-wide">
        </div>
        <br>
        <div class="input-group mb-3 white-body-text">
          <span>Missugust matust soovid?:</span>
          <input v-model="funeralInfo.matusetüüp" type="text" class="input-text-box-wide">
        </div>
        <br>
        <div class="input-group mb-3 white-body-text">
          <span>Millist skulptuuri sa hauale soovid?:</span>
          <input v-model="funeralInfo.skulptuur" type="text" class="input-text-box-wide">
        </div>
      </div>
    </div>
    <div class="right-half-screen centered-column">
      <div class="black-body-text">Siia võid vabas vormis lisada juhised oma matuse kohta</div>
      <br>
      <input v-model="funeralInfo.funeralInstructions" type="text" class="input-text-box-wide-and-long">
      <button type="button" class="black-button-text"
              @click="checkIfInstructionsExistAlready">SALVESTA</button>
    </div>
  </div>
</template>

<script>
import SuccessAlert from "@/components/alert/SuccessAlert.vue";
import ErrorAlert from "@/components/alert/ErrorAlert.vue";
import SaveChangesModal from "@/components/modal/SaveChangesModal.vue";

export default {
  name: 'FuneralView',
  components: {SaveChangesModal, ErrorAlert, SuccessAlert},
  data() {
    return {
      funeralInstructionsExists: false,
      errorMessage: '',
      successMessage: '',

      userId: Number(sessionStorage.getItem('userId')),

      funeralInfo: {
        funeralInstructions: '',
        matusetüüp: '',
        menüü: '',
        skulptuur: '',
        testament: '',
        hauaplats: '',
      },
    }
  },
  methods: {
    checkIfInstructionsExistAlready() {
      if (this.funeralInstructionsExists) {
        this.callOutSaveChangesModal()
      } else {
        this.postFuneralInstructions()
      }
    },
    findFuneralInstructions() {
      this.$http.get("/funeral/instructions", {
            params: {
              userId: this.userId,
            }
          }
      ).then(response => {
        this.funeralInfo = response.data
        this.funeralInstructionsExists = true
        console.log("funeralinstructionsexist" + this.funeralInfo.hauaplats)
      }).catch(error => {
        this.funeralInstructionsExists = false
        console.log("funeralinstructionsdoesntexist" + this.funeralInfo.hauaplats)

      })
    },

    postFuneralInstructions() {
      this.$http.post("/funeral/instructions", this.funeralInfo, {
            params: {
              userId: this.userId,
            }
          }
      ).then(response => {
        this.successMessage = "Juhised on salvestatud"
        console.log("post õnnestus")

      }).catch(error => {
        console.log("post ebaõnnestus")
        this.errorMessage = "salvestamine ebaõnnestus"
      })
    },

    deleteOldFuneralInstructions() {
      this.$http.delete("/funeral/instructions", {
            params: {
              userId: this.userId,
            }
          }
      ).then(response => {
        console.log("jõudsin kustutamise lõppu")
        this.successMessage = 'Vanad juhised edukalt kustutatud'
        this.postFuneralInstructions()

      }).catch(error => {
        this.errorMessage = 'Vanade juhiste kustutamine ebaõnnestus'
        console.log("kustutamine feilis")
      })
    },
    callOutSaveChangesModal() {
      if (this.$refs.saveChangesModalRef.$refs.modalRef) {
        this.$refs.saveChangesModalRef.$refs.modalRef.openModal()
      }
    }
    ,
  },


  // mounted() {
  //   this.findFuneralInstructions()
  // }
}
</script>