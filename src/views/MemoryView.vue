<template>
  <MemoryInfoModal ref="memoryInfoModalRef" :memory-long-view="memoryLongView"/>
  <div class="split-layout">
    <div class="left-half-screen centered-column">
      <div class="white-title-text">Minu mälestused</div>
      <div class="row-centered">
        <div v-for="memoryShort in memoryShortView">
          <div class="standard-subtext-white">Pealkiri</div>
          <a class="white-title-text" href="#" @click="viewMemoryInfo(memoryShort.memoryId)">
            {{ memoryShort.memoryTitle }}
          </a>
        </div>
        <div v-for="memoryShort in memoryShortView">
          <div class="standard-subtext-white">Aeg</div>
          <div class="standard-subtext-white">
            {{ memoryShort.memoryTimestamp }}
          </div>
        </div>
      </div>
    </div>
    <div class="right-half-screen centered-column ">
      <div class="textarea-container-for-white-half-page">
        <div class="black-pg-header2">Lisa uus mälestus</div>
        <input ref="titleRef" type="text" placeholder="Pealkiri" class="input-text-box-wide">
        <textarea ref="textRef"></textarea>
        <div class="standard-subtext-black">Mälestust salvestatakse tabelisse vasakul poolel.</div>
        <div class="footer-button-wrapper">
          <button @click="addNewMemory" type="button" class="black-button-text">SALVESTA</button>
          <button type="button" @click="$router.go(-1)" class="black-button-text">Mine tagasi</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import MemoryInfoModal from "@/components/modal/MemoryInfoModal.vue";

export default {
  name: 'memoryView',
  components: {MemoryInfoModal},

  data() {
    return {
      userId: 0,
      memoryLongView: [{
        memoryTitle: '',
        memoryText: '',
        memoryTimestamp: '',
      }],
      memoryShortView: [{
        memoryId: 0,
        memoryTitle: '',
        memoryTimestamp: '',
      }]
    }
  },
  created() {
    this.userId = sessionStorage.getItem('userId');
    this.getMemoriesForShortView()
  },
  methods: {
    getMemoriesForShortView() {
      this.$http.get('/memories', {
            params: {
              userId: this.userId,
            }
          }
      ).then(response => {
        this.memoryShortView = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },
    async viewMemoryInfo(memoryId) {
      await this.getMemoryInfo(memoryId, this.userId);
      this.$refs.memoryInfoModalRef.$refs.modalRef.openModal()
    },
    async getMemoryInfo(memoryId, userId) {
      this.$http.get('/memory', {
            params: {
              memoryId: memoryId,
              userId: userId
            }
          }
      ).then(response => {
        this.memoryLongView = Object.assign({}, response.data);
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    addNewMemory() {
      this.getAndSetMemoryInfos();
      this.postMemory();
    },
    getAndSetMemoryInfos() {
      this.memoryLongView[0].memoryTitle = this.$refs.titleRef.value;
      this.memoryLongView[0].memoryText = this.$refs.textRef.value;
    },
    postMemory() {
      this.$http.post('/memory', this.memoryLongView[0], {
            params: {
              userId: this.userId
            }
          }
      )
          .then(response => {
            this.resetAllFields()
          })
          .catch(error => {
            this.errorResponse = error.response
            router.push({name: 'errorRoute'})
          })
    },
    resetAllFields() {
      this.$refs.titleRef.value = ''
      this.$refs.textRef.value = ''
    }
  }
}
</script>