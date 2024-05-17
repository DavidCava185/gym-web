<template>
    <v-sheet class="mx-auto" width="300">
      <v-form fast-fail @submit.prevent>
        <v-text-field
          v-model="firstName"
          :rules="firstNameRules"
          label="mail"
        ></v-text-field>
  
        <v-text-field
          v-model="lastName"
          :rules="lastNameRules"
          label="Password"
        ></v-text-field>
  
        <v-btn class="mt-2" type="submit" block>Login</v-btn>
      </v-form>
    </v-sheet>
  </template>

  
<script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Login',
      data: () => ({
        firstName: '',
        firstNameRules: [
          (value: any) => {
            if (value?.length > 3) return true
  
            return 'First name must be at least 3 characters.'
          },
        ],
        lastName: '123',
        lastNameRules: [
          (value: any) => {
            if (/[^0-9]/.test(value)) return true
  
            return 'Last name can not contain digits.'
          },
        ],
      }),
    });
  </script>