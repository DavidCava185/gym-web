<template>
  <v-layout class="w-100">
    <v-app-bar color="red">
      <v-img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlOF92ZWN0b3JfbGluZV9hcnRfb2ZfZml0bmVzc19fbWluaW1hbF9maXRuZXNfbGluZV84YTlkMTJmMC0wY2I0LTRhYWItYTU3My1jNDJmMTI5NjM5ZmFfMS5wbmc.png"></v-img>
      <v-btn @click="logout">
        <svg-icon type="mdi" :path="path" size="3em"></svg-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center">
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import { useSessionStore } from '@/stores/session/session.store';
  import { defineComponent } from 'vue';
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiLogout } from '@mdi/js';
import { mapActions } from 'pinia';
  
  export default defineComponent({
    name: 'AppView',
    components: {
    SvgIcon
  },
  methods: {
        ...mapActions(useSessionStore, ['logout']),
    },
  data() {
    return {
       path: mdiLogout,
    }
  }
  })
</script>
