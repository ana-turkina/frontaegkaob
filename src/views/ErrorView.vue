<template>
  <div class="split-layout">
    <div class="left-half-screen centered-column">
      <span class="white-aeg-text">Oo</span>
      <span class="white-title-text">Midagi läks valesti...</span>
      <div>
        <button type="button" @click="$router.go(-1)" class="white-button-text">Mine tagasi</button>
      </div>
    </div>
    <div class="right-half-screen centered-column">
      <span class="black-kaob-text">ps!</span>
      <span class="black-text-aligned-left"></span>
      <div class="black-text-aligned-left">
        <div><span class="black-title-text">Või hoopis alusta otsast peale...</span></div>
        <button class="black-button-text" @click="goToHome">Alguselehele</button>
      </div>
    </div>
  </div>
</template>


<script>
import {useRouter} from "vue-router";

export default {
  name: 'ErrorView',

  setup() {
    const router = useRouter();

    const goToHome = () => {
      router.push({name: 'homeRoute'});
    };

    return {
      goToHome
    };
  },
};

</script>