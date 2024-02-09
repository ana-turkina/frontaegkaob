<template>
  <MapDetailsModal ref="mapDetailsModalRef" :title="selectedMarker.title" :description="selectedMarker.description"/>
  <div class="split-layout">
    <div class="left-half-screen centered-column">
        <ErrorAlert :error-message="errorMessage"/>
        <SuccessAlert :success-message="successMessage"/>
      <div class="white-body-text">
        <span id="inputGroup-sizing-default">Asukoha Pealkiri</span>
        <input v-model="newMarker.title" type="text" class="input-text-box-narrow">
      </div>
      <br>
      <br>
      <br>
      <div class="input-group mb-3 white-body-text">
        <span id="inputGroup-sizing-default">Asukoha Kirjeldus</span>
        <input v-model="newMarker.description" type="text" class="input-text-box-wide">
      </div>
      <br>
      <button class="white-button-text" @click="saveLocation">Salvesta</button>
    </div>
    <div class="right-half-screen centered-column">
      <div class="black-pg-header2">Lisa Oluline Koht Kaardile</div>
      <GoogleMap api-key="AIzaSyBx4LTHy8pbEI2fgGfK6q-kXsBMRiZt_Z0 " style="width: 90%; height: 500px" :center="center"
                 :zoom="10"
                 @click="addMarkerAndRemoveOldMarker">
        <Marker :key="index"
                v-for="(m, index) in markers"
                :options="{ position: m.position }"
                @click="selectMarkerAndOpenModal(m)"/>
<!--        <InfoWindow :position="selectedMarker.position" :options="{ pixelOffset: { width: 0, height: -30 } }">-->
<!--          <div>-->
<!--            <strong>{{ selectedMarker.title }}</strong><br/>-->
<!--            {{ selectedMarker.description }}-->
<!--          </div>-->
<!--        </InfoWindow>-->
      </GoogleMap>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {GoogleMap, Marker} from "vue3-google-map";
import SuccessAlert from "@/components/alert/SuccessAlert.vue";
import ErrorAlert from "@/components/alert/ErrorAlert.vue";
import MapDetailsModal from "@/components/modal/MapDetailsModal.vue";

export default({
  name: 'MapView',
  components: {MapDetailsModal, ErrorAlert, SuccessAlert, GoogleMap, Marker},
  data() {
    return {
      userId: Number(sessionStorage.getItem('userId')),
      center: {lat: 59.26449649524572, lng: 25.96152518878102},
      markers: [],
      selectedMarker: '',
      locationInfo: {
        title: '',
        longtitude: '',
        latitude: '',
        description: '',
      },
      newMarker: {
        position: {
          lat: '',
          lng: '',
        },
        title: '',
        description: '',
      },
      locationsInfoList: [{
        title: '',
        latitude: '',
        longtitude: '',
        description: '',
      }
      ],
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    addMarkerAndRemoveOldMarker(event) {
      this.markers = [];

      const newMarker = {
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        },
        title: this.newMarker.title,
        description: this.newMarker.description,
      };

      this.newMarker.position.lat = event.latLng.lat();
      this.newMarker.position.lng = event.latLng.lng();
      this.markers.push(newMarker);
    },


    saveLocation() {
      const newMarker = {
        position: {
          lat: this.newMarker.position.lat,
          lng: this.newMarker.position.lng,
        },
        title: this.newMarker.title,
        description: this.newMarker.description,
      };
      this.markers.push(newMarker);

      this.locationInfo.title = this.newMarker.title;
      this.locationInfo.description = this.newMarker.description;
      this.locationInfo.latitude = this.newMarker.position.lat;
      this.locationInfo.longtitude = this.newMarker.position.lng;

      if (
          !this.locationInfo.title ||
          !this.locationInfo.description ||
          !this.locationInfo.latitude ||
          !this.locationInfo.longtitude
      ) {
        this.errorMessage = "Palun täida kõik väljad";
        console.log("error message ilmus?")
        setTimeout(this.resetErrorMessage, 4000);
        return;
      }

      this.$http
          .post("/map", this.locationInfo, {
            params: {
              userId: this.userId,
            },
          })
          .then((response) => {
            this.locationInfo = {
              latitude: '',
              longtitude: '',
              title: '',
              description: '',
            };
            this.successMessage = "Asukoha salvestamine õnnestus";
            setTimeout(this.resetSuccessMessage, 4000);
          })
          .catch((error) => {
            this.errorMessage = "Asukoha salvestamine ebaõnnestus";
            setTimeout(this.resetErrorMessage, 4000);
          });
    },
    async showLocations() {
      try {
        const response = await this.$http.get("/map", {
          params: {
            userId: this.userId,
          },
        });

        const locationsInfoList = response.data;

        this.markers = [];

        locationsInfoList.forEach((location) => {
          const newMarker = {
            position: {
              lat: parseFloat(location.latitude),
              lng: parseFloat(location.longtitude),
            },
            title: location.title,
            description: location.description,
          };
          this.markers.push(newMarker);
        });
      } catch (error) {
        console.log("showLocation meetod failis")
      }
    },
    selectMarkerAndOpenModal(marker) {
      console.log("selectmarkerandopenmodal")
      this.selectedMarker = marker
      console.log(this.selectedMarker.title + this.selectedMarker.description)

      this.$refs.mapDetailsModalRef.$refs.modalRef.title = this.selectedMarker.title;
      this.$refs.mapDetailsModalRef.$refs.modalRef.description = this.selectedMarker.description;
      this.$refs.mapDetailsModalRef.$refs.modalRef.openModal()

    },

    resetErrorMessage() {
      this.errorMessage = ''
    },
    resetSuccessMessage() {
      this.successMessage = ''
    },
  },
  mounted() {
    this.showLocations();
  }
})
</script>