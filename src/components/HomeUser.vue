<template>
  <div class="pt-10">
    <v-container class="d-flex flex-column ga-10">
      <v-card color="red">
        <v-card-title>
          Mis próximas actividades
        </v-card-title>
        <v-data-table :headers="headers" :items="nextActivities"></v-data-table>
      </v-card>

      <v-row>
        <v-col cols="12">
          <v-card class="pa-3">
            <v-calendar ref="calendar" v-model="today" :events="events" type="week">
              <template #event="{event}">
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-chip color="red" v-bind="props">
                      {{ event.title }}
                    </v-chip>
                  </template>
                  <v-list>
                    <v-list-item @click="inscribeIntoActivity(event.id)">
                      <v-list-item-title>
                        Inscribirme
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-calendar>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { useActivitiesStore } from '@/stores/activities/activities.store'
import { mapActions, mapState } from 'pinia'
import { defineComponent } from 'vue'
import { useSessionStore } from '@/stores/session/session.store'

export default defineComponent({
  name: 'HomeUser',
  data() {
    return {
      headers: [
        {
          title: 'Tipo',
          value: 'activityType.name'
        },
        {
          title: 'Nombre',
          value: 'name'
        },
        {
          title: 'Duración estimada',
          value: 'estimatedDuration'
        },
        {
          title: 'Fecha y hora de inicio',
          value: 'startDatetime'
        },
        {
          title: 'Fecha y hora de finalización',
          value: 'finishDatetime'
        },
        {
          title: 'Sala',
          value: 'room.name'
        }
      ],

      today: [new Date()],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { title: 'Domingo - Sábado', value: [0, 1, 2, 3, 4, 5, 6] },
        { title: 'Lunes - Domingo', value: [1, 2, 3, 4, 5, 6, 0] },
        { title: 'Lunes - Viernes', value: [1, 2, 3, 4, 5] },
        { title: 'Lunes, Miércoles, Viernes', value: [1, 3, 5] }
      ],
      now: new Date()
    }
  },

  computed: {
    ...mapState(useActivitiesStore, ['activities']),
    ...mapState(useSessionStore, ['isAuthenticated']),
    nextActivities() {
      return this.activities.filter((activity: any) => new Date(activity.startDatetime) > this.now && activity.users.find((user: any) => user.id === this.isAuthenticated.id))
    },
    events() {
      return this.activities.map((activity: any) => ({
        id: activity.id,
        title: activity.name,
        start: new Date(activity.startDatetime),
        end: new Date(activity.finishDatetime)
      }))
    }
  },
  async created() {
    await this.getAllActivities()
  },
  methods: {
    ...mapActions(useActivitiesStore, ['getAllActivities', 'relateUserActivity']),
    async inscribeIntoActivity(activityId: number) {
      await this.relateUserActivity(activityId, this.isAuthenticated.id);
      this.getAllActivities();
    }
  }
})
</script>

<style scoped>

</style>