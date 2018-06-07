import React, {Component} from 'react';
import { Container } from 'semantic-ui-react';
import { Header, Form, Button, Divider} from 'semantic-ui-react';
import { navigate } from "@reach/router";
import { data } from '../data/Backend';
import ScoreSettingsKeySignature from './ScoreSettings-key-signature';

const instruments = [
   {
      'text': 'Pianoforte',
      'value': 'piano',
      'transposing': 'false'
   },
   {
      'text': 'Tromba',
      'value': 'tromba',
      'transposing': 'true'
   },
]
const clefOptions = [
   {
      'text': 'Violino',
      'value': 'G'
   },
   {
      'text': 'Basso',
      'value': 'F'
   }
]

class ScoreSettings extends Component {
   constructor(props) {
      super(props);
      const defaultState={
         scoreId: null,
         title: '',
         author: '',
         clef: 'G',
         metronome: 120,
         time: '4/4',
         keySignature: ['sharp', 0],
         instrument: instruments[0].value,
         transposing: false,
         transpose: false
      }
      this.state=props.settings || defaultState;
   }
   handleChange(e, comp){
      const tempObj = {};
      tempObj[comp.name] = comp.value;
      this.setState(tempObj)
   }
   handleTimeChange(e, comp){
      const tempTime = this.state.time.split('/');
      tempTime[comp.name]=comp.value;
      const time = tempTime.join('/');
      this.setState({ time })
   }
   handleKeySignature(val){
      this.setState({ keySignature: val })
   }
   saveScoreSettings(){
      if(!this.state.scoreId){
         // Create a new score
         const scoreId = Date.now();
         this.setState({scoreId}, ()=>{
            data.editScoreSettings(scoreId, this.state);
         })
      }else{
         // edit  existing score
         data.editScoreSettings(this.state.scoreId, this.state);
      }
   }
   handleUndo(){
      if(this.props.settings){
         this.props.handleClose(); // close modal
      }else{
         navigate('/'); // back home
      }
   }
   render() {
      return (
         <Container>
            <Header as="h3">{this.props.newScore ? 'Nuovo Brano' : 'Impostazioni'}</Header>
            <Container textAlign="left">
               <Form size="tiny">
                  <Form.Group>
                     <Form.Input name="title" label='Titolo' placeholder='Brano Senza Titolo' 
                        width={11} onChange={(e, comp) => this.handleChange(e, comp)} value={this.state.title} />
                     {/* ------------ */}
                     <Form.Input name="author" label='Autore' placeholder='' value={this.state.author}
                        width={7} onChange={(e, comp) => this.handleChange(e, comp)}/>
                     {/* ------------ */}
                  </Form.Group>
                  <Form.Group inline unstackable>
                     <Form.Select name="clef" label='Chiave' options={clefOptions} 
                        defaultValue={this.state.clef} onChange={(e, comp) => this.handleChange(e, comp)}/>
                     {/* ------------ */}
                     <Form.Input name="metronome" label='Metronomo' defaultValue={this.state.metronome} 
                        min="40" max="240" type="number" onChange={(e, comp) => this.handleChange(e, comp)}/>
                     {/* ------------ */}
                     <Form.Input label="Tempo" defaultValue={this.state.time.split('/')[0]} min="2" max="21" 
                        type="number" name={0} onChange={(e, comp) => this.handleTimeChange(e, comp, 0)}/>
                     {/* ------------ */}
                     <Form.Input defaultValue={this.state.time.split('/')[1]} min="2" max="16" step="2" 
                        type="number" name={1} onChange={(e, comp) => this.handleTimeChange(e, comp, 1)}/>
                  </Form.Group>
                  <ScoreSettingsKeySignature defaultValue={this.state.keySignature} 
                     handleKeySignature={this.handleKeySignature.bind(this)}/>
                  {/* TO DO ---------------- */}
                  <Form.Group inline>
                     <label>Strumento</label>
                     <Form.Select name="instrument" options={instruments} defaultValue={this.state.instrument} 
                        onChange={(e, comp) => this.handleChange(e, comp)} />
                     {/* <Radio slider name="transpose" label="Partitura trasposta" disabled
                        onChange={(e, comp) => this.handleChange(e, comp)} /> */}
                  </Form.Group>
                  {/* TO DO ---------------- */}
                  <Divider />
                  <Button primary basic compact onClick={()=>this.saveScoreSettings()}>Crea</Button>
                  <Button compact basic className="unbordered" onClick={() => this.handleUndo()}>Annulla</Button>
               </Form>
            </Container>
         </Container>
      );
   }
}
export default ScoreSettings;
