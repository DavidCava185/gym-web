<template>
  <v-layout class="rounded rounded-md">
    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <router-view v-slot="{ Component }">
        <v-fade-transition leave-absolute>
          <component :is="Component" />
        </v-fade-transition>
        </router-view>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'LoginView',
  })
</script>
