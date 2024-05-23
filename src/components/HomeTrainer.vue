<template>
  <div class="pt-10 d-flex flex-column ga-10 align-end">
    <v-dialog v-model="isDialogActive" max-width="600">
      <template #activator="{ props: activatorProps }">
        <v-btn rounded="lg" density="default" v-bind="activatorProps" color="red" text="Crear Actividad"
               variant="flat"></v-btn>
      </template>

      <template #default>
        <v-form ref="createActivity" v-model="isValidForm" @submit.prevent="submitActivity()">
          <v-card title="Crear Actividad" color="red">
            <v-card min-height="47em" class="d-flex flex-column justify-space-between">
              <v-card-text>
                <v-text-field label="Nombre" v-model="activityForm.name" :rules="[formRules.required]"></v-text-field>
                <v-textarea rows="2" v-model="activityForm.description" label="Description"></v-textarea>
                <v-text-field label="Duración" v-model="activityForm.estimatedDuration"></v-text-field>
                <div class="py-2">
                  <VueDatePicker v-model="activityForm.startDatetime"></VueDatePicker>
                </div>
                <div class="py-2">
                  <VueDatePicker v-model="activityForm.finishDatetime"></VueDatePicker>
                </div>
                <v-select
                  v-model="activityForm.roomId"
                  label="Sala"
                  :items="rooms"
                  item-value="id"
                  item-title="name"
                ></v-select>
                <v-select
                  v-model="activityForm.activityTypeId"
                  label="Tipo de actividad"
                  :items="activityTypes"
                  item-value="id"
                  item-title="name"
                ></v-select>
              </v-card-text>
              <v-card-actions>
                <v-btn :text="activityForm.id ? 'Actualizar' : 'Crear'" type="submit"></v-btn>
              </v-card-actions>
            </v-card>
          </v-card>
        </v-form>
      </template>
    </v-dialog>

    <v-card class="w-100" color="red">
      <v-card-title>
        Próximas actividades
      </v-card-title>
      <v-data-table :headers="headers" :items="nextActivities">
        <template #item.startDatetime="{ item }">
          {{ new Date(item.startDatetime).toLocaleString() }}
        </template>
        <template #item.finishDatetime="{ item }">
          {{ new Date(item.finishDatetime).toLocaleString() }}
        </template>
        <template #item.actions="{item}">
        <div class="d-flex ga-2">
          <v-btn color="info" variant="tonal" @click="editActivity(item.id)">
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn color="red" variant="tonal" @click="removeActivity(item.id)">
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </div>
      </template>
      </v-data-table>
    </v-card>
    <v-card class="w-100" color="red">
      <v-card-title>
        Historial de actividades
      </v-card-title>
      <v-data-table :headers="headers" :items="activitiesHistory">
        <template #item.startDatetime="{ item }">
          {{ new Date(item.startDatetime).toLocaleString() }}
        </template>
        <template #item.finishDatetime="{ item }">
          {{ new Date(item.finishDatetime).toLocaleString() }}
        </template>
        <template #item.actions="{item}">
          <div class="d-flex ga-2">
            <v-btn color="info" variant="tonal" @click="editActivity(item.id)">
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
            <v-btn color="red" variant="tonal" @click="removeActivity(item.id)">
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import { useActivitiesStore } from '@/stores/activities/activities.store'
import { useSessionStore } from '@/stores/session/session.store'
import { mapActions, mapState } from 'pinia'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeTrainer',
  data() {
    return {
      isDialogActive: false,
      menu1: false,
      menu2: false,
      formRules: {
        required: (v: any) => !!v || 'Campo requerido'
      },
      activityForm: {
        id: undefined,
        name: undefined,
        description: undefined,
        surname: undefined,
        estimatedDuration: undefined,
        startDatetime: undefined,
        finishDatetime: undefined,
        roomId: undefined,
        activityTypeId: undefined,
        trainerId: undefined
      },
      isValidForm: false,
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
        },
        {
          title: 'Acciones',
          value: 'actions'
        }
      ],
      now: new Date()
    }
  },
  computed: {
    ...mapState(useActivitiesStore, ['activities', 'activityTypes', 'activity', 'rooms']),
    ...mapState(useSessionStore, ['isAuthenticated']),
    nextActivities() {
      return this.activities.filter((activity: any) => new Date(activity.startDatetime) > this.now)
    },
    activitiesHistory() {
      return this.activities.filter((activity: any) => new Date(activity.startDatetime) <= this.now)
    }
  },
  async created() {
    await this.getAllActivities()
    await this.getAllRooms()
    await this.getAllActivityTypes()
  },
  methods: {
    ...mapActions(useActivitiesStore, ['getAllActivities', 'createActivity', 'getAllRooms', 'getAllActivityTypes', 'getOneActivity', 'deleteActivity', 'updateActivity']),
    async submitActivity() {
      const { valid } = await this.$refs['createActivity'].validate()
      if (this.activityForm.id) {
        await this.updateLocalActivity()
        this.isDialogActive = false
        return
      }

      if (valid) {
        this.activityForm.trainerId = this.isAuthenticated.id;
        await this.createActivity(this.activityForm);
        this.getAllActivities();
        this.isDialogActive = false;
        this.$refs['createActivity'].reset();
        this.activityForm = {
          name: undefined,
          description: undefined,
          surname: undefined,
          estimatedDuration: undefined,
          startDatetime: undefined,
          finishDatetime: undefined,
          roomId: undefined,
          activityTypeId: undefined,
          trainerId: undefined
        };
      }
    },
    async editActivity(activityId: any) {
      const activity: any = await this.getOneActivity(activityId);
      console.log(activity);
      this.activityForm = activity;
      this.activityForm.activityTypeId = activity.activityType.id;
      this.activityForm.roomId = activity.room.id;
      this.isDialogActive = true;
    },
    async updateLocalActivity() {
      await this.updateActivity(this.activityForm);
      this.getAllActivities();
    },
    async removeActivity(activityId: any) {
      await this.deleteActivity(activityId);
      this.getAllActivities();
    }
  }
})
</script>