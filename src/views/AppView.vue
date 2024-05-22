<template>
  <v-layout class="w-200">
    <v-app-bar color="red">
      <v-img src="src\assets\Icono_gym.png"></v-img>
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
