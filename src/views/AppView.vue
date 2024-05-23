<template>
  <v-layout class="h-100 w-100">
    <v-app-bar color="red">
      <v-img src="src\assets\Icono_gym.png"></v-img>
      <v-btn @click="logout">
        <v-icon>
          mdi-logout
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="h-100 d-flex align-center justify-center">
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import { useSessionStore } from '@/stores/session/session.store';
import { defineComponent } from 'vue';
import { mapActions } from 'pinia';

export default defineComponent({
  name: 'AppView',
  methods: {
    ...mapActions(useSessionStore, ['logout']),
  },
})
</script>
