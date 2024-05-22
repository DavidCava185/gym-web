<template>
    <div class="pt-10">
        <v-card class="mx-auto" max-width="434">
                <v-avatar rounded="0" size="300">
                    <v-img src="https://lh3.googleusercontent.com/proxy/R-k_VUYZcaYzjtzPVF7-erEjR9h3IuTIbIsuSRxbhR3BFhBXcY41GQIQw7y0Q1vfNWBKIyz1Pe6I9j5E3zw6Gc92Pu4fL50S2SgGont2Lfzmr8oFQTlNyw" cover></v-img>
                </v-avatar>
                <v-card title="Mi perfil">
                    <v-card> Nombre:</v-card>
                    <v-card> Apellido:</v-card>
                    <v-card> Email:</v-card>
                    <v-card> Contraseña:</v-card>                    
                </v-card>
        </v-card>
    </div>
</template>

<script lang="ts">
import { useSessionStore } from '@/stores/session/session.store';
import { useUsersStore } from '@/stores/users/session.users';
import { mapState, mapActions } from 'pinia';

import { defineComponent } from 'vue';
export default defineComponent({
    name: 'UserProfile',
    computed: {
        ...mapState(useSessionStore, ['sessionFetching']),
        ...mapState(useSessionStore, ['users']),
        usersItems() {
            return this.users;
        }
    },
    methods: {
        ...mapActions(useUsersStore, ['getAllUsers', 'updateUser'])
    }
});
</script>