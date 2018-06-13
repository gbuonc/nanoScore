import React from 'react';
import { connect } from 'unistore/react'
import {Header, Icon} from 'semantic-ui-react';
import {Link} from '@reach/router';

const HomeWithStore = connect(['scores'])(
({ scores }) => {
   // show 'Open' link only if ther's at least a score saved
   const hasScores = scores ? (Object.keys(scores).length > 0) : false;
   return(
      <Header as='h1' icon>
         <Icon name='music' circular />
         NanoScore
         <Header.Subheader>
            <Link to="/new">Nuovo</Link> {hasScores && (
               <React.Fragment>
               | <Link to="/load">Apri</Link>
               </React.Fragment>
               ) }
         </Header.Subheader>
      </Header>
   )
});

const Home = () => <HomeWithStore />;
export default Home;
