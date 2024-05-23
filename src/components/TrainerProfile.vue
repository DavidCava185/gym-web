<template>
  <div class="pt-10">
    <v-card width="500" color="red">
      <div class="d-flex align-center justify-center">
        <v-avatar rounded="0" size="100">
          <v-icon size="100" color="white">
            mdi-account
          </v-icon>
        </v-avatar>
      </div>
      <v-card class="pa-4" title="Mi perfil">
        <v-text-field label="Nombre" v-model="trainerForm.name"></v-text-field>
        <v-text-field label="Apellido" v-model="trainerForm.surname"></v-text-field>
        <v-text-field label="Email" v-model="trainerForm.email"></v-text-field>
        <v-text-field label="Contraseña" v-model="trainerForm.password" type="password"></v-text-field>
        <v-btn color="red" text @click="update">Actualizar</v-btn>
      </v-card>
    </v-card>
  </div>
</template>

<script lang="ts">
import { useSessionStore } from '@/stores/session/session.store'
import { mapState, mapActions } from 'pinia'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TrainerProfile',
  data() {
    return {
      trainerForm: {
        name: undefined,
        surname: undefined,
        email: undefined,
        password: undefined,
      }
    }
  },
  computed: {
    ...mapState(useSessionStore, ['isAuthenticated', 'isTrainer']),
  },
  created() {
    this.trainerForm = this.isAuthenticated;
  },
  methods: {
    ...mapActions(useSessionStore, ['updateTrainer', 'updateTrainer']),
    async update() {
      await this.updateTrainer(this.trainerForm);
    }
  }
})
</script>