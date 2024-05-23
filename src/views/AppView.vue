<template>
  <v-layout class="h-100 w-100">
    <v-app-bar color="red">
      <v-btn @click="goToProfile">
        <v-icon>
          mdi-account
        </v-icon>
      </v-btn>
      <v-img @click="goToHome" class="cursor-pointer" src="src\assets\Icono_gym.png"></v-img>
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
import { mapActions, mapState } from 'pinia'

export default defineComponent({
  name: 'AppView',
  computed: {
    ...mapState(useSessionStore, ['isTrainer']),
  },
  methods: {
    ...mapActions(useSessionStore, ['logout']),
    goToProfile () {
      if (this.isTrainer) {
        this.$router.push({ name: 'TrainerProfile' });
      } else {
        this.$router.push({ name: 'UserProfile' });
      }
    },
    goToHome () {
      if (this.isTrainer) {
        this.$router.push({ name: 'TrainerHome' });
      } else {
        this.$router.push({ name: 'UserHome' });
      }
    },
  },
})
</script>
