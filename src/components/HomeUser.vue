<template>
    <div class="pt-10 d-flex flex-column ga-10">
        <v-card class="w-100" color="red">
            <v-card-title>
                Mis actividades
            </v-card-title>
            <v-data-table :headers="headers" :items="nextActivities"></v-data-table>
        </v-card>

        <v-row>
            <v-col cols="12">
                <v-sheet class="w-100">
                    <v-calendar ref="calendar" v-model="today" :events="events" type="week"></v-calendar>
                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { useActivitiesStore } from '@/stores/activities/activities.store';
import { mapActions, mapState } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomeUser',
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

            today: [new Date()],
            weekday: [0, 1, 2, 3, 4, 5, 6],
            weekdays: [
                { title: 'Domingo - Sábado', value: [0, 1, 2, 3, 4, 5, 6] },
                { title: 'Lunes - Domingo', value: [1, 2, 3, 4, 5, 6, 0] },
                { title: 'Lunes - Viernes', value: [1, 2, 3, 4, 5] },
                { title: 'Lunes, Miércoles, Viernes', value: [1, 3, 5] },
            ],
            now: new Date(),
        }
    },

    computed: {
        ...mapState(useActivitiesStore, ['activities']),
        nextActivities() {
            return this.activities.filter((activity: any) => new Date(activity.startDatetime) > this.now);
        },
        events() {
            return this.activities.map((activity: any) => ({
                title: activity.name,
                start: new Date(activity.startDatetime),
                end: new Date(activity.finishDatetime),
            }))
        }
    },
    async created() {
        await this.getAllActivities()
    },
    methods: {
        ...mapActions(useActivitiesStore, ['getAllActivities']),
    }
});
</script>

<style scoped>
.my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    left: 4px;
    margin-right: 8px;
    position: relative;
}

.my-event.with-time {
    position: absolute;
    right: 4px;
    margin-right: 0px;
}
</style>