<template>
  <LogOutModal ref="logOutModalRef" @event-execute-logout="executeLogOut"/>
  <div>
    <div id="nav-container">
      <div class="bg"></div>
      <div class="hamburger-button" tabindex="0">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </div>
      <div id="nav-content" tabindex="0">
        <ul>
          <template v-if="!isLoggedIn">
            <li>
              <router-link to="/about">Meist</router-link>
            </li>
          </template>
          <template v-if="isLoggedIn">
            <li>
              <router-link to="/welcome">Algusesse</router-link>
            </li>
            <li>
              <router-link to="/before">Vaata 'Before'</router-link>
            </li>
            <li>
              <router-link to="/after">Vaata 'After'</router-link>
            </li>
            <li>
              <router-link to="/invite">Saada Sõbrale Kutset</router-link>
            </li>
            <li>
              <a ref="#" @click="handleLogOut">Logi välja</a>
            </li>
            <template class="hamburger-wrapper-small">
              <li class="small">
                <router-link to="/user-profile">Muuda Profiili</router-link>
              </li>
              <li class="small">
                <router-link to="/about">Meist</router-link>
              </li>
            </template>
          </template>
        </ul>
      </div>
    </div>
  </div>
  <router-view @event-update-nav-menu="updateNavMenu"/>
</template>

<script>
import router from "@/router";
import LogOutModal from "@/components/modal/LogOutModal.vue";

export default {
  name: 'App',

  components: {LogOutModal},

  data() {
    return {
      isLoggedIn: false
    }
  },
  methods: {

    updateNavMenu() {
      const userId = sessionStorage.getItem('userId')
      this.isLoggedIn = userId !== null
    },
    handleLogOut() {
      this.$refs.logOutModalRef.$refs.modalRef.openModal()
    },
    executeLogOut() {
      sessionStorage.clear()
      this.updateNavMenu()
      router.push({name: 'homeRoute'})
    },
  },
  mounted() {
    this.updateNavMenu()
  }
}
</script>