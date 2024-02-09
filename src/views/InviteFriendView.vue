<template>
  <div class="split-layout">
    <div class="left-half-screen centered-column">
      <div class="white-title-text">Invite a Friend WIP</div>
    </div>
    <div class="right-half-screen centered-column ">
      <div class="textarea-container-for-white-half-page">
        <div class="black-pg-header2">Saada kutset (V2.0)</div>
        <input type="text" placeholder="Pealkiri" class="input-text-box-wide">
        <textarea>Tere, xxx!
Just Sina oled YYY jaoks niivõrd oluline inimene, et ta on valinud Sind oma pärandi hoidjaks!

Palun registreeri end:
        </textarea>
        <input type="email" class="input-text-box-wide" placeholder="Sõbra Email">
        <div class="footer-button-wrapper">
          <button type="button" class="black-button-text">SAADA</button>
          <button type="button" @click="$router.go(-1)" class="black-button-text">Mine tagasi</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inviteFriendView',
}

</script>