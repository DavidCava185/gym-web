<template>
    <div class="pt-10 d-flex flex-column ga-10 align-end">
        <v-btn width="20em" @click="">Crear actividad</v-btn>
        
        <v-card class="w-100">
            <v-card-title>
                Mis próximas actividades
            </v-card-title>
            <v-data-table :headers="headers" :items="nextActivities"></v-data-table>
        </v-card>
        <v-card class="w-100">
            <v-card-title>
                Historial de actividades
            </v-card-title>
            <v-data-table :headers="headers" :items="activitiesHistory"></v-data-table>
        </v-card>
    </div>
</template>

<script lang="ts">
import { useActivitiesStore } from '@/stores/activities/activities.store';
import { mapActions, mapState } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomeTrainer',
    data() {
        return {
            headers: [
                {
                    title: "Tipo",
                    value: "activityType.name",
                },
                {
                    title: "Nombre",
                    value: "name",
                },
                {
                    title: "Duración estimada",
                    value: "estimatedDuration",
                },
                {
                    title: "Fecha y hora de inicio",
                    value: "startDatetime",
                },
                {
                    title: "Fecha y hora de finalización",
                    value: "finishDatetime",
                },
                {
                    title: "Sala",
                    value: "room.name",
                }
            ],
            now: new Date(),
        }
    },
    computed: {
        ...mapState(useActivitiesStore, ['activities']),
        nextActivities () {
            return this.activities.filter((activity: any) => new Date(activity.startDatetime) > this.now);
        },
        activitiesHistory () {
            return this.activities.filter((activity: any) => new Date(activity.startDatetime) <= this.now);
        }
    },
    async created() {
        await this.getAllActivities()
    },
    methods: {
        ...mapActions(useActivitiesStore, ['getAllActivities','createActivity']),
        submitActivity () {

        }
    }
});
</script>