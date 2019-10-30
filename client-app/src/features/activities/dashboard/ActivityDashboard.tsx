import React from 'react'
import { Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import ActivityList from './ActivityList'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'

interface IProps {
   activities: IActivity[];
   selectedActivity: IActivity | null;
   enableEditMode: boolean;
   setEditMode: (enableEditMode: boolean) => void;
   setSelectedActivity: (activity: IActivity | null) => void;
   onSelectActivity: (id: string) => void;
   createActivity: (activity: IActivity) => void;
   updateActivity: (activity: IActivity) => void;
   deleteActivity: (id: string) => void;
}

const ActivityDashboard: React.FC<IProps> = ({
   activities,
   selectedActivity,
   enableEditMode,
   setEditMode,
   setSelectedActivity,
   createActivity,
   updateActivity,
   deleteActivity,
   onSelectActivity,
})=> {
   return (
      <Grid>
         <Grid.Column width={10}>
            <ActivityList
               activities={activities}
               deleteActivity={deleteActivity}
               onSelectActivity={onSelectActivity}
            />
         </Grid.Column>
         <Grid.Column width={6}>
            { 
               selectedActivity && !enableEditMode && (
                  <ActivityDetails 
                     activity={selectedActivity}
                     setEditMode={setEditMode}
                     setSelectedActivity={setSelectedActivity}
                  />
               )
            }
            { 
               enableEditMode && (
                  <ActivityForm
                     key={selectedActivity ? selectedActivity.id : 0}
                     activity={selectedActivity}
                     setEditMode={setEditMode}
                     createActivity={createActivity}
                     updateActivity={updateActivity}
                     deleteActivity={deleteActivity}
                  /> 
               )
            }
           
         </Grid.Column>
      </Grid>
   );
}

export default ActivityDashboard
