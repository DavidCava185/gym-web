<template>
  <div>
    <v-toolbar
      dark
      prominent
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Gym app [Trainers]</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent( {
        name: 'HomeTrainer'
    });
</script>