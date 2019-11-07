import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

configure({ enforceActions: 'always' });

class ActivityStore {
   @observable activitiesRegistry = new Map();
   @observable activities: IActivity[] = [];
   @observable selectedActivity: IActivity | undefined;
   
   @observable loading = false;
   @observable editMode = false;
   @observable submitting = false;
   @observable target = '';

   @computed get activitiesByDate() {
      return Array.from(this.activitiesRegistry.values()).sort(
         (a, b) => Date.parse(a.date) - Date.parse(b.date)
      );
   }

   @action loadActivities = async () => {
      this.loading = true;
      try {
         const activities =  await agent.Activities.list();
         runInAction('loading activities', () => {
            activities.forEach(activity => {
               activity.date = activity.date.split('.')[0];
               this.activitiesRegistry.set(activity.id, activity);
            });
         })
      } catch (error) {
         console.error(error)
      } finally {
         runInAction('load activities error', () => {
            this.loading = false
         });
      }
   }

   @action createActivity = async (activity: IActivity) => {
      this.submitting = true;
      try {
         await agent.Activities.create(activity);
         runInAction('creating activity', () => {
            this.activitiesRegistry.set(activity.id, activity);
            this.editMode = false;
         })
      } catch (error) {
         console.error(error);
      } finally {
         runInAction('create activity error', () => {
            this.submitting = false;
         })
      }
   }

   @action updateActivity = async (activity: IActivity) => {
      this.submitting = true;
      try {
         await agent.Activities.update(activity);
         runInAction('updating activity', () => {
            this.activitiesRegistry.set(activity.id, activity);
            this.selectedActivity = activity;
            this.editMode = false;
         })
      } catch (error) {
         console.log(error);
      } finally {
         runInAction('update activity error', () => {
            this.submitting = false;
         })
      }
   }

   @action deleteActivity = async (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
      this.submitting = true;
      this.target = e.currentTarget.name;
      try {
         await agent.Activities.delete(id);
         runInAction('deleting activity', () => {
            this.activitiesRegistry.delete(id);
         })
      } catch (error) {
         console.log(error);
      } finally {
         runInAction('delete activity error', () => {
            this.submitting = false;
            this.target = '';
         })
      }
   }

   @action openCreateForm = () => {
      this.editMode = true;
      this.selectedActivity = undefined;
   }

   @action openEditForm = (id: string) => {
      this.selectedActivity = this.activitiesRegistry.get(id);
      this.editMode = true;
   }

   @action cancelSelectedActivity = () => {
      this.selectedActivity = undefined;
   }

   @action cancelFormOpen = () => {
      this.editMode = false;
   }

   @action selectActivity = (id: string) => {
      this.selectedActivity = this.activitiesRegistry.get(id);
      this.editMode = false;
   }
}

export default createContext(new ActivityStore());