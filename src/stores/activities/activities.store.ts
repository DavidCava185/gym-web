import { defineStore } from 'pinia';
import RestService from '@/service';
import router from '@/router';
import ls from '@/composable/local-storage.composable';

const activityService = new RestService({ namespace: '/activities' });

const activityTypeService = new RestService({ namespace: '/activity-types' })

const roomService = new RestService({ namespace: '/rooms' })

export const useActivitiesStore = defineStore('activities', {
    state(): any {
        return {
            activities: [],
            rooms: [],
            activityTypes: [],
            activity: undefined,
        }
    },
    actions: {

        async createActivity(activity: any): Promise<void> {
            try {
                await activityService.request({
                    url: '',
                    method: 'post',
                    data: {
                        ...activity,
                    }
                });
            } catch (err) {
                console.error(err)
            }
        },

        async updateActivity(activity: any): Promise<void> {
            try {
                await activityService.request({
                    url: '',
                    method: 'put',
                    data: {
                        name: activity.name,
                        roomId: activity.roomId,
                        activityTypeId: activity.activityTypeId,
                    }
                });
            } catch (err) {
                console.error(err)
            }
        },

        async deleteActivity(activityId: number): Promise<void> {
            try {
                await activityService.request({
                    url: `/${activityId}`,
                    method: 'delete',
                });
            } catch (err) {
                console.error(err)
            }
        },

        async getOneActivity(activityId: number): Promise<void> {
            try {
                const data = await activityService.request({
                    url: `/${activityId}`,
                    method: 'get',
                });
                this.activity = data;
            } catch (err) {
                console.error(err)
            }
        },

        async getAllActivities(): Promise<void> {
            try {
                const data = await activityService.request({
                    url: ``,
                    method: 'get',
                });
                this.activities = data;
            } catch (err) {
                console.error(err)
            }
        },

        async getAllActivityTypes(): Promise<void> {
            try {
                const data = await activityTypeService.request({
                    url: ``,
                    method: 'get',
                });
                this.activityTypes = data;
            } catch (err) {
                console.error(err)
            }
        },

        async getAllRooms(): Promise<void> {
            try {
                const data = await roomService.request({
                    url: ``,
                    method: 'get',
                });
                this.rooms = data;
            } catch (err) {
                console.error(err)
            }
        },
        
        async relateUserActivity(): Promise<void> {
            try {
                const data = await roomService.request({
                    url: ``,
                    method: 'get',
                });
                this.activityTypes = data;
            } catch (err) {
                console.error(err)
            }
        },
    }
});