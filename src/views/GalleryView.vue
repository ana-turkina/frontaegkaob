<!--lahendus, kui kasutaja lisab 4+ pilti ja kui on vähem pilte-->
<!--layout-->
<!--ühe pildi kuvamine-->
<!--normaalne "lisa" nupp-->

<template>
  <div class="split-layout">
    <div class="left-half-screen centered-column">
      <div class="container text-center">
        <div class="row justify-content-center">
          <ErrorAlert :error-message="errorMessage"/>
          <SuccessAlert :success-message="successMessage"/>
        </div>
        <div class="row ">
          <div class="column">
            <div v-for="(imageInfo, index) in imageInfoList" :key="index" v-if="imageInfo.status = 'A'">
              <div class="row">
                <div class="col">
                  <img :src="imageInfo.imageData" class="image" alt="pilt"/>
                  <div class="image-info">
                    <div class="col">
                      <div class="image-title small-white-text-aligned-left">{{ imageInfo.title }}</div>
                      <button class="small-white-text-aligned-left" @click="deleteImage(imageInfo.title, index)">Kustuta
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!--              <div class="col-4 small-white-text-aligned-left">{{ imageInfo.title }}</div>-->
              <!--              <button @click="deleteImage(imageInfo.title)" type="button" class="white-button-text white-pg-header4">-->
              <!--                Kustuta-->
              <!--              </button>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-half-screen centered-column">
      <div class="black-pg-header2">Lisa oma kõige plulisemad pildid</div>
      <div class="black-pg-header4"> Pildi pealkiri:
        <input v-model="imageInfo.title" class="input-text-box-wide">
      </div>
      <ImageInput @event-emit-base64="setImageData"/>

      <button @click="setImageData" type="button" class="black-button-text">SALVESTA</button>
    </div>
  </div>
</template>

<script>
import ImageInput from "@/components/image/ImageInput.vue";
import SuccessAlert from "@/components/alert/SuccessAlert.vue";
import ErrorAlert from "@/components/alert/ErrorAlert.vue";

export default {
  name: 'GalleryView',
  components: {SuccessAlert, ErrorAlert, ImageInput},

  data() {
    return {
      successMessage: '',
      errorMessage: '',
      userId: Number(sessionStorage.getItem('userId')),

      imageInfoList: [
        {
          title: '',
          imageData: '',
          status: '',
        }
      ],
      imageInfo: {
        title: '',
        imageData: '',
      }
      ,

    }
  },
  methods: {
    setImageData(imageData) {
      console.log("jõudsin meetodisse")
      this.imageInfo.imageData = imageData;
      if (this.allFieldsAreFilled() && this.imageTitleIsUnique()) {
        console.log("fields filled and data unique")
        this.$http.post("/gallery", this.imageInfo, {
              params: {
                userId: this.userId
              }
            }
        ).then(response => {
          this.successMessage = 'Pilt edukalt lisatud'
          setTimeout(() => {
            this.resetSuccessMessage();
            this.getImages();
          }, 4000);

        }).catch(error => {
          if (!this.imageTitleIsUnique()) {
            this.errorMessage = 'Pildi pealkiri peab olema unikaalne'
          }
          this.errorMessage = 'Pildi lisamine ebaõnnestus'
          setTimeout(this.resetErrorMessage, 4000);
        })
      } else {
        console.log("jõudsin errorisse." + this.allFieldsAreFilled() + this.imageTitleIsUnique())
        this.errorMessage = 'Pealkiri puudub või on korduv'
        setTimeout(this.resetErrorMessage, 4000);
      }
    },
    getImages() {
      this.$http.get("/gallery", {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        this.imageInfoList = response.data


      }).catch(error => {
        console.log("pilte ei leitud")
      })
    },

    deleteImage(title) {
      this.$http.delete("gallery", {
            params: {
              userId: this.userId,
              title: title,
            }
          }
      ).then(response => {
        this.successMessage = 'Pilt edukalt kustutatud'
        setTimeout(() => {
          this.resetSuccessMessage();
          this.getImages();
        }, 4000);

        this.imageInfoList = this.imageInfoList.filter(image => image.title !== title);

      }).catch(error => {
        const errorResponseBody = error.response.data
        this.errorMessage = 'Pildi kustutamine ebaõnnestus'
        setTimeout(this.resetErrorMessage, 4000);

      })
    },

    allFieldsAreFilled() {
      return this.imageInfo.imageData.length > 0 && this.imageInfo.title.length > 0
    },
    imageTitleIsUnique() {
      this.getImages()
      return this.imageInfoList.every(imageFromList => {
        const titleFromList = imageFromList.title;
        return titleFromList !== this.imageInfo.title;
      });
    },

    resetErrorMessage() {
      this.errorMessage = ''
    },
    resetSuccessMessage() {
      this.successMessage = ''
    },


  },
  mounted() {
    this.getImages()
  }
}
</script>
<style>

.image {
  max-width: 300px;
  height: 200px;
  margin: 10px;
}

.column {
  float: left;
  width: 25%;
  padding: 10px;
}
</style>
