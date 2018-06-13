import React, { Component } from 'react';
import { Segment, Header, Icon, Grid, Modal} from 'semantic-ui-react';
import ScoreSettings from '../components/ScoreSettings';
import MainEditor from '../components/MainEditor';
import AbcParser from '../components/AbcParser';
import StaveViewer from '../components/StaveViewer';
import MidiPlayer from '../components/MidiPlayer';
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

const ScoreWithStore = connect(['scores', 'currentScore'])(
   ({ scores, scoreId }) => {
      const currentScore = scores[scoreId];
      if(!currentScore) return null;
      return (
         <React.Fragment>
            {/* header ----------------- */}
            <Segment className="score-view-top" color="teal" secondary>
               <Grid columns='equal'>
                  <Grid.Row>
                     <Grid.Column textAlign="left" verticalAlign="middle">
                        <Icon name="home" onClick={() => navigate('/')} />
                     </Grid.Column>
                     <Grid.Column>
                        <Header as="h4">
                           {currentScore.settings.title}
                           <Header.Subheader>{currentScore.settings.author}</Header.Subheader>
                        </Header>
                     </Grid.Column>
                     <Grid.Column textAlign="right" verticalAlign="middle">
                        <ModalController settings={currentScore.settings} />
                     </Grid.Column>
                  </Grid.Row>
               </Grid>
            </Segment>
            {/* content ----------------- */}
            <Segment className="score-view-middle" basic>
               <AbcParser score={currentScore} render={(abc) => <StaveViewer abc={abc} />} />
               <MainEditor melodicLine={currentScore.melody} scoreId={scoreId} />
            </Segment>
            {/* footer ----------------- */}
            <Segment className="score-view-bottom">
               <AbcParser score={currentScore} render={(abc) => <MidiPlayer abc={abc} />} />
            </Segment>
         </React.Fragment>
      )
   });
const Score = (props) => <ScoreWithStore scoreId={props.scoreId} />
export default Score;
