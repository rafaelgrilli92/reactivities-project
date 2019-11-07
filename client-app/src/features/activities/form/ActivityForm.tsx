import React, { useState, FormEvent, useContext } from 'react'
import { v4 as uuid } from 'uuid';
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import ActivityStore from '../../../app/stores/activitiesStore';
import { observer } from 'mobx-react-lite';

interface IProps {
   activity: IActivity | undefined;
}

const ActivityForm: React.FC<IProps> = ({
   activity: initialFormState
}) => {
   const activityStore = useContext(ActivityStore);
   const { createActivity, updateActivity, submitting, cancelFormOpen } = activityStore;

   const initForm = () => {
      if (initialFormState)
         return initialFormState;
      
      return {
         id: '',
         title: '',
         category: '',
         description: '',
         date: '',
         city: '',
         venue: ''
      }
   }
   
   const [activity, setActivity] = useState<IActivity>(initForm);

   const handleSubmit = () => {
      if (!activity.id)
         createActivity({
            ...activity,
            id: uuid()
         });
      else  
         updateActivity(activity);
   }

   const handleInputChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.currentTarget;
      setActivity({
         ...activity, [name]: value
      })
   }

   return (
      <Segment clearing>
         <Form onSubmit={handleSubmit}>
            <Form.Input name="title" placeholder="Title" value={activity.title} onChange={handleInputChange} />
            <Form.TextArea name="description" rows={2} placeholder="Description" value={activity.description} onChange={handleInputChange} />
            <Form.Input name="category" placeholder="Category" value={activity.category} onChange={handleInputChange} />
            <Form.Input name="date" type="datetime-local" placeholder="Date" value={activity.date} onChange={handleInputChange} />
            <Form.Input name="city" placeholder="City" value={activity.city} onChange={handleInputChange} />
            <Form.Input name="venue" placeholder="Venue" value={activity.venue} onChange={handleInputChange} />
            <Button loading={submitting} positive type="submit" content="Submit" />
            <Button type="button" floated="right" content="Cancel" onClick={cancelFormOpen} />
         </Form>
      </Segment>
   )
}

export default observer(ActivityForm);
