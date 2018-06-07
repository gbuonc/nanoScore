import React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
import ScoreSettings from '../components/ScoreSettings.jsx';
import { navigate } from "@reach/router";

const NewScore = () => {
   return (
      <React.Fragment>
         <Segment className="score-view-top" color="teal" secondary>
            <Header as="h3" onClick={() => navigate('/')}><Icon name='music' size="mini" /> NanoScore</Header>
         </Segment>
         <ScoreSettings newScore={true} />
      </React.Fragment>
   );
};

export default NewScore;
