import React from 'react';
import { Dimmer, Loader as LoaderSemanticUI } from 'semantic-ui-react';

interface IProps {
   inverted?: boolean;
   content?: string;
}

const Loader: React.FC<IProps> = ({
   inverted = true,
   content
}) => (
   <Dimmer active inverted={inverted}>
      <LoaderSemanticUI content={content}/>
   </Dimmer>
)

export default Loader;