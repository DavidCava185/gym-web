<template>
    <div class="pt-10 d-flex flex-column ga-10 align-end">
        <v-dialog max-width="600">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn rounded="lg" density="default" v-bind="activatorProps" color="red" text="Crear Actividad"
                    variant="flat"></v-btn>
            </template>

            <template v-slot:default="{ isActive }">
                <v-card title="Crear Actividad" color="red">
                    <v-card-text>
                        <v-text-field label="Nombre"></v-text-field>
                        <v-text-field label="Duración"></v-text-field>
                        <v-text-field label="Fecha/hora inicio"></v-text-field>
                        <v-text-field label="Fecha/hora fin"></v-text-field>
                        <v-text-field label="Descripción"></v-text-field>
                        <v-text-field label="Tipo de actividad"></v-text-field>
                        <v-text-field label="Sala"></v-text-field>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text="Crear" @click="" type="submit"></v-btn>
                        <!-- <v-btn text="cerrar" @click="isActive.value = false"></v-btn> -->
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>

        <v-card class="w-100" color="red">
            <v-card-title>
                Mis próximas actividades
            </v-card-title>
            <v-data-table :headers="headers" :items="nextActivities"></v-data-table>
        </v-card>
        <v-card class="w-100" color="red">
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
        nextActivities() {
            return this.activities.filter((activity: any) => new Date(activity.startDatetime) > this.now);
        },
        activitiesHistory() {
            return this.activities.filter((activity: any) => new Date(activity.startDatetime) <= this.now);
        }
    },
    async created() {
        await this.getAllActivities()
    },
    methods: {
        ...mapActions(useActivitiesStore, ['getAllActivities', 'createActivity']),
        submitActivity() {

        }
    }
});
</script>