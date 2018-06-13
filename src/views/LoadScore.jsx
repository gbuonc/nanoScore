import React from 'react';
import { connect } from 'unistore/react'
import { Table, Button, Icon, Container, Header, Segment } from 'semantic-ui-react';
import distanceInWords from 'date-fns/distance_in_words';
import it from 'date-fns/locale/it';
import { Link, Redirect, navigate } from '@reach/router';
import { data } from '../data/Store';

const LoadScoreWithStore = connect(['scores'])(
({ scores }) => {
   // convert scores to array
   const scoreArray = Object.keys(scores).map((score)=>{
      const formattedScore = scores[score].settings;
      return formattedScore;
   });
   const handleDelete =(scoreId)=>{
      if (window.confirm("Eliminare il brano?")) {
         data.deleteScore(scoreId);
      }
   }
   return(
      <Container>
         <Header as="h3">Apri Brano</Header>
         <Table basic='very' striped unstackable singleLine compact="very">
            <Table.Body>
               {scoreArray.length > 0 && scoreArray.map((score) =>{
                  return(
                     <Table.Row key={score.scoreId}>
                        <Table.Cell><Link to={`/score/${score.scoreId}`}><strong>{score.title}</strong></Link></Table.Cell>
                        <Table.Cell>{distanceInWords(Date.now(), score.scoreId, { addSuffix: true, locale:it })}</Table.Cell>
                        {/* <Table.Cell>{score.metronome} BPM</Table.Cell>
                        <Table.Cell>{score.instrument}</Table.Cell> */}
                        <Table.Cell textAlign="right">
                           <Button icon basic size="tiny" color="red" className="unbordered" onClick={()=>{handleDelete(score.scoreId)}}><Icon name='cancel' /></Button>
                        </Table.Cell>
                     </Table.Row>
                  )
               })}
               {scoreArray.length === 0 && <Redirect to="/" noThrow/>}
            </Table.Body>
         </Table>
      </Container>
   ) 
});
const LoadScore = () => {
   return (
      <React.Fragment>
         <Segment className="score-view-top" color="teal" secondary>
            <Header as="h3" onClick={() => navigate('/')}><Icon name='music' size="mini"/> NanoScore</Header>
         </Segment>
         <LoadScoreWithStore />
      </React.Fragment>
   );
};
export default LoadScore;
