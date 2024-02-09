<template>
  <div class="split-layout">
    <div class="left-half-screen centered-column">
      <div class="white-pg-header2">Sind mäletatakse...</div>
      <div class="white-body-text">
        <p>Selle lood Sa juba oma eluajal, ent siin on võimalus, et
          mälestus Sinust püsiks. Lisaks on meil kõigil oma mõtted ja saladused, mida soovime edasi anda – olulisematest
          mälestustest parimate seenekohtadeni.</p>
        <p>Siin tuleme meie Sulle appi – postita siia oma mälestused, ent pea meeles, see siin on Sinu pärand ja selle
          sisuks oled Sina!</p>
      </div>
    </div>

    <div class="right-half-screen space-around-column">
      <div class="row-space-around">
        <div>
          <div class="black-pg-content">
            <button class="black-button-text black-pg-header3" @click="goToMemory">Mälestus</button>
          </div>
          <div>
            <button class="black-button-text black-pg-header3" @click="goToMap">Koht kaardil</button>
            <br>
            <div class="black-body-text">Heli (V2.0)</div>
          </div>
        </div>
        <div>
          <div>
            <button class="black-button-text black-pg-header3" @click="gotoGallery">Pilt</button>
          </div>
          <div>
            <button class="black-button-text black-pg-header3" @click="goToFuneral">Matusesoovid</button>

            <br>
            <div class="black-body-text">Video (V2.0)</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
.right-half-screen {
  display: flex;
}

.column {
  flex: 1;
  margin-right: 10px;
}
</style>

<script>
import router from "@/router";

export default {
  name: 'AfterView',


  data() {

  },

  methods: {
    goToFuneral() {
      router.push({name: 'funeralRoute'})
    },
    gotoGallery() {
      router.push({name: 'galleryRoute'})
    },
    goToMap() {
      router.push({name: 'MapRoute'})
    },
    goToMemory() {
      router.push({name: 'memoryRoute'})
    },
  }
}
</script>