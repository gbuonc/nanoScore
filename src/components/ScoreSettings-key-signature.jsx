import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

class ScoreSettingsKeySignature extends Component {
   constructor(props) {
      super();
      this.state = {
         keySig: props.defaultValue[0],
         keyNumber: props.defaultValue[1]
      }
      this.keySignature={
         'sharp':{
            0: { label:'Do magg./la min', abc:'C'},
            1: { label: 'Sol magg./mi min.', abc: 'G' },
            2: { label: 'Re magg./si min.', abc: 'D' },
            3: { label: 'La magg./fa♯ min.', abc: 'A' },
            4: { label: 'Mi magg./do♯ min.', abc: 'E' },
            5: { label: 'Si magg./sol♯ min.', abc: 'B' },
            6: { label: 'Fa♯ magg./re♯ min.', abc: 'F#' },
            7: { label: 'Do♯ magg./la♯ min.', abc: 'C#' }
         },
         'flat': {
            0: { label: 'Do magg./la min', abc: 'C' },
            7: { label: 'Do♭ magg./la♭ min.', abc: 'Cb' },
            6: { label: 'Sol♭ magg./mi♭ min.', abc: 'Gb' },
            5: { label: 'Re♭ magg./si♭ min.', abc: 'Db' },
            4: { label: 'La♭ magg./fa min.', abc: 'Ab' },
            3: { label: 'Mi♭ magg./do min.', abc: 'Eb' },
            2: { label: 'Si♭ magg./sol min.', abc: 'Bb' },
            1: { label: 'Fa magg./re min.', abc: 'F' }
         }
      }
      this.setSignature = this.setSignature.bind(this);
      this.setNumber = this.setNumber.bind(this);
   }
   setSignature(e, comp){
      this.setState({ keySig: comp.value }, ()=>{
         const abcKey = this.keySignature[this.state.keySig][this.state.keyNumber].abc;
         this.props.handleKeySignature([this.state.keySig, this.state.keyNumber, abcKey]);
      })
   }
   setNumber(e, comp){
      this.setState({ keyNumber: parseInt(comp.value, 10) }, () => {
         const abcKey = this.keySignature[this.state.keySig][this.state.keyNumber].abc;
         this.props.handleKeySignature([this.state.keySig, this.state.keyNumber, abcKey]);
      })
   }
   render() {
      const { keySig, keyNumber} = this.state;
      const keySigLabel = this.keySignature[keySig][keyNumber].label;
      return (
         <Form.Group grouped>
            <label>Armatura di Chiave</label>
               <Form.Group inline>
                  <Form.Radio name="keySig" label='Diesis' value="sharp" checked={this.state.keySig === 'sharp'} onChange={this.setSignature} />
                  <Form.Radio name="keySig" label='Bemolle' value="flat" checked={this.state.keySig === 'flat'} onChange={this.setSignature} />
                  <Form.Input name="keyNumber" defaultValue={this.state.keyNumber} min="0" max="7" type="number" onChange={this.setNumber} />
                  <label>{keySigLabel}</label>
               </Form.Group>
         </Form.Group>
      );
   }
}

export default ScoreSettingsKeySignature;
