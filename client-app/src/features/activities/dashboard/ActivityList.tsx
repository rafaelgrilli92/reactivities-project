import React, { useContext } from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import ActivityStore from '../../../app/stores/activitiesStore';

const ActivityList: React.FC = () => {
   const { activitiesByDate, selectActivity, deleteActivity, submitting, target } = useContext(ActivityStore);
   
   return (
      <Segment clearing>
         <Item.Group divided>
            {activitiesByDate.map(activity => (
            <Item key={activity.id}>
               <Item.Content>
                  <Item.Header as="a">{activity.title}</Item.Header>
                  <Item.Meta>{activity.date}</Item.Meta>
                  <Item.Description>
                  <div>{activity.description}</div>
                  <div>
                     {activity.city}, {activity.venue}
                  </div>
                  </Item.Description>
                  <Item.Extra>
                     <Button
                        floated="right"
                        content="View"
                        color="blue"
                        onClick={() => selectActivity(activity.id)}
                     />
                     <Button
                        name={activity.id}
                        negative
                        floated="right"
                        content="Delete"
                        loading={target === activity.id && submitting}
                        onClick={e => deleteActivity(e, activity.id)}
                     />
                     <Label basic content={activity.category} />
                  </Item.Extra>
               </Item.Content>
            </Item>
            ))}
         </Item.Group>
      </Segment>
   );
}

export default observer(ActivityList);
