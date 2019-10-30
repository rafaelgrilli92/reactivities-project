import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [enableEditMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id) || null);
    setEditMode(false);
  }

  const handleClickCreateNewActivity = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity])
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleUpdateActivity = (activity: IActivity) => {
    setActivities([...activities.filter(x => x.id !== activity.id), activity])
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(x => x.id !== id)])
    setSelectedActivity(null);
    setEditMode(false);
  }

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then(res => {
        let activities = res.data.map((activity: IActivity) => ({
          ...activity,
          date: activity.date.split('.')[0]
        }));
        setActivities(activities)
      });
  }, [])

  return (
    <Fragment>
      <NavBar onClickCreateNewActivity={handleClickCreateNewActivity} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          enableEditMode={enableEditMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          updateActivity={handleUpdateActivity}
          deleteActivity={handleDeleteActivity}
          onSelectActivity={handleSelectActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
