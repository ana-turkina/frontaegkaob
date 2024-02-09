<template>
  <BucketlistItemModal ref="bucketlistItemModalRef" :bucketlist-long-view="bucketlistItemsView"/>
  <div class="split-layout">
    <div class="left-half-screen centered-column">
      <div class="white-pg-header2">Nukker statistika ütleb,</div>
      <div class="white-body-text">
        <p>et lausa 90% inimestest valdab oma lahkumise eel kahetsus tegemata jäetu üle – enim muserdab meid, et elati
          mitte enda soovide vaid teiste ootuste järgi.</p>
        <p> Soovime ju kõik siit ilmast lahkuda rahus, ent selle asemel, et keskenduda lõpule, anna kõigepealt oma elule
          mõte -
          küsi endalt, mis on Sinu tõelised soovid ning pane need siia kirja!
          Inspiratsiooniks on <a
              href="https://ekspress.delfi.ee/artikkel/63929475/viis-asja-mida-inimesed-enne-surma-enim-kahetsevad"
              title="Mida kahetsetakse" style="color: rgba(25,199,158,0.65);">artikkel viiest asjast</a>, mida enim
          kahetsetakse.</p>
      </div>
    </div>
    <div class="right-half-screen centered-column">
      <div class="black-title-text">Minu soovid</div>
      <div class="row-centered">
        <div class="table">
          <div class="row">
            <div class="header standard-subtext-black">Aeg</div>
            <div class="header standard-subtext-black">Soovi pealkiri</div>
          </div>
          <div class="row" v-for="bucketlistItem in bucketlistItemsView">
            <div class="cell standard-subtext-black">
              {{ bucketlistItem.bucketlistItemTimestamp }}
            </div>
            <div class="cell standard-subtext-black">
              <a class="black-title-text" href="#" @click="viewBucketlistInfo(bucketlistItem.bucketlistItemId)">
                {{ bucketlistItem.bucketlistItemTitle }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <button type="button" class="black-button-text">Lisa uus soov</button>
    </div>
  </div>
</template>
<script>
import BucketlistItemModal from "@/components/modal/BucketlistItemModal.vue";
import router from "@/router";

export default {
  name: 'BeforeView',
  components: {BucketlistItemModal},
  data() {
    return {
      userId: 0,
      bucketlistItemsView: {
        bucketlistItemId: 0,
        bucketlistItemTitle: '',
        bucketlistItemText: '',
        bucketlistItemTimestamp: '',
      },
    }
  },
  created() {
    this.userId = sessionStorage.getItem('userId');
    this.getBucketlistItems()
  },
  methods: {
    getBucketlistItems() {
      this.$http.get('/before/bucketlist', {
            params: {
              userId: this.userId,
            }
          }
      ).then(response => {
        this.bucketlistItemsView = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },
    async viewBucketlistInfo(bucketlistItemId) {
      const  requiredBucketlistItem = this.bucketlistItemsView.find
      (item => item.bucketlistItemId === bucketlistItemId);

      this.bucketlistItemsView = requiredBucketlistItem;

      this.$refs.bucketlistItemModalRef.$refs.modalRef.openModal();
    //
    //   // this.getBucketlistInfo(bucketlistItemId, this.userId)
    //   //     .then(() => this.$refs.bucketlistItemModalRef.$refs.modalRef.openModal())
    //   //     .catch((error) => {
    //   //       router.push({name: 'errorRoute'})
    //   //     });
    // },
    // async getBucketlistInfo(bucketlistItemId, userId) {
    //   this.$http.get('/before/bucketlist', {
    //         params: {
    //           bucketlistItemId: bucketlistItemId,
    //           userId: userId
    //         }
    //       }
    //   ).then(response => {
    //     console.log("Response data", response.data);
    //     this.bucketlistItemsView = Object.assign({}, response.data);
    //     console.log("bucketlistItemsView", this.bucketlistItemsView);
    //   }).catch(error => {
    //     router.push({name: 'errorRoute'})
    //   })
    }
  },
}
</script>