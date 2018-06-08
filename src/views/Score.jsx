import React, { Component } from 'react';
import { Segment, Header, Icon, Grid, Modal} from 'semantic-ui-react';
import ScoreSettings from '../components/ScoreSettings';
import StaveViewer from '../components/StaveViewer';
import { connect } from 'unistore/react';
import { navigate } from "@reach/router";


class ModalController extends Component {
   constructor(props) {
      super(props);
      this.state = { modalOpen: false }
   }
   handleOpen = () => this.setState({ modalOpen: true })
   handleClose = () => this.setState({ modalOpen: false })
   render() {
      return (
         <Modal trigger={<Icon name="setting" onClick={this.handleOpen}/>} 
            open={this.state.modalOpen}
            onClose={this.handleClose}>
            <Modal.Content>
               <ScoreSettings settings={this.props.settings} handleClose={this.handleClose.bind(this)}/>
            </Modal.Content>
         </Modal>
      );
   }
}

const ScoreWithStore = connect(['scores'])(
   ({ scores, scoreId }) => {
      const score = scores[scoreId];
      if(!score) return null;
      return (
         <React.Fragment>
            <Segment className="score-view-top" color="teal" secondary>
            <Grid columns='equal'>
               <Grid.Row>
                  <Grid.Column textAlign="left" verticalAlign="middle">
                     <Icon name="home" onClick={()=>navigate('/')}/>
                  </Grid.Column>
                  <Grid.Column>
                     <Header as="h4">
                        {score.settings.title}
                        <Header.Subheader>{score.settings.author}</Header.Subheader>
                     </Header>
                  </Grid.Column>
                     <Grid.Column textAlign="right" verticalAlign="middle">
                        <ModalController settings={score.settings} />
                  </Grid.Column>
               </Grid.Row>
            </Grid>
            </Segment>
            <StaveViewer score={score} />
            <Segment className="score-view-bottom">Bottom</Segment>
         </React.Fragment>
      )
   });

const Score = (props) => <ScoreWithStore {...props}/>
export default Score;
