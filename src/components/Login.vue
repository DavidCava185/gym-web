<template>
  <div class="h-100 pt-10">
    <v-sheet width="30em" class="h-100 d-flex flex-column justify-center">
      <v-form v-model="isValidForm" fast-fail @submit.prevent="submitForm">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Email"
        ></v-text-field>
  
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          type="password"
        ></v-text-field>
  
        <v-btn class="mt-2" type="submit" color="red" block>Login</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

  
<script lang="ts">
  import { useSessionStore } from '@/stores/session/session.store';
import { mapActions } from 'pinia';
import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Login',
    data: () => ({
      isValidForm: false,
      email: 'hugo@user.com',
      emailRules: [
        (value: any) => {
          if (value) return true

          return 'El email no puede estar vacío'
        },
      ],
      password: 'hugo',
      passwordRules: [
        (value: any) => {
          if (value) return true

          return 'La contraseña no puede estar vacía'
        },
      ],
    }),
    created () {
      console.log(this.$route.meta.isTrainer)

    },
    methods: {
      ...mapActions(useSessionStore, [ 'login', 'loginTrainer' ]),
      async submitForm () {
        if (this.isValidForm) {
          if (this.$route.meta.isTrainer) {
            await this.loginTrainer({
            email: this.email,
            password: this.password
          });
          } else {
            await this.login({
            email: this.email,
            password: this.password
          });
          }
        }
      }
    }
  });
  </script>