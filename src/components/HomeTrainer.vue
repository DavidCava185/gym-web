<template>
    <div class="pt-10 d-flex flex-column ga-10 align-end">
        <v-dialog max-width="600">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn rounded="lg" density="default" v-bind="activatorProps" color="red" text="Crear Actividad"
                    variant="flat"></v-btn>
            </template>

            <template v-slot:default="{ isActive }">
                <v-form ref="createActivity" v-model="isValidForm" @submit.prevent="submitActivity()">
                    <v-card title="Crear Actividad" color="red">
                        <v-card>
                            <v-card-text>
                                <v-text-field label="Nombre" v-model="activityForm.name"
                                    :rules="[formRules.required]"></v-text-field>
                                <v-text-field label="Duración" v-model="activityForm.estimatedDuration"></v-text-field>
                                <v-date-input label="Fecha de inicio" v-model="activityForm.startDate"
                                    :rules="[formRules.required]"></v-date-input>
                                <v-text-field v-model="activityForm.startTime" :rules="[formRules.required]"
                                    :active="menu1" :focus="menu1" label="Hora de inicio"
                                    prepend-icon="mdi-clock-time-four-outline" readonly>
                                    <v-menu v-model="menu1" :close-on-content-click="false" activator="parent"
                                        transition="scale-transition">
                                        <v-time-picker v-if="menu1" v-model="activityForm.startTime"
                                            full-width></v-time-picker>
                                    </v-menu>
                                </v-text-field>
                                <v-date-input label="Fecha de finalización" v-model="activityForm.finishDate"
                                    :rules="[formRules.required]"></v-date-input>
                                <v-text-field v-model="activityForm.finishTime" :rules="[formRules.required]"
                                    :active="menu2" :focus="menu2" label="Hora de finalización"
                                    prepend-icon="mdi-clock-time-four-outline" readonly>
                                    <v-menu v-model="menu2" :close-on-content-click="false" activator="parent"
                                        transition="scale-transition">
                                        <v-time-picker v-if="menu2" v-model="activityForm.finishTime"
                                            full-width></v-time-picker>
                                    </v-menu>
                                </v-text-field>

                                <v-card-actions>
                                    <v-btn text="Crear" type="submit"></v-btn>
                                </v-card-actions>
                            </v-card-text>
                        </v-card>
                    </v-card>
                </v-form>
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
import { useSessionStore } from '@/stores/session/session.store';
import { mapActions, mapState } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomeTrainer',
    data() {
        return {
            menu1: false,
            menu2: false,
            formRules: {
                required: (v: any) => !!v || 'Campo requerido',
            },
            activityForm: {
                name: undefined,
                description: undefined,
                surname: undefined,
                estimatedDuration: undefined,
                startDatetime: undefined,
                startTime: new Date().toISOString(),
                startDate: new Date().toISOString(),
                finishDatetime: undefined,
                finishTime: new Date().toISOString(),
                finishDate: new Date().toISOString(),
                roomId: undefined,
                activityTypeId: undefined,
                trainerId: undefined
            },
            isValidForm: false,
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
        ...mapState(useSessionStore, ['isAuthenticated']),
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
        async submitActivity() {
            const { valid } = await this.$refs['createActivity'].validate();
            if (valid) {
                this.activityForm.trainerId = this.isAuthenticated.id;
                this.activityForm.startDatetime = `${this.activityForm.startDate} ${this.activityForm.startTime}`;
                this.activityForm.finishDatetime = `${this.activityForm.finishDate} ${this.activityForm.finishTime}`;
                await this.createActivity(this.activityForm)
            }
        }
    }
});
</script>