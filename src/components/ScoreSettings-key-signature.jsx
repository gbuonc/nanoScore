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
            0: { label:'Do magg./la min'},
            1: { label: 'Sol magg./mi min.' },
            2: { label: 'Re magg./si min.' },
            3: { label: 'La magg./fa♯ min.' },
            4: { label: 'Mi magg./do♯ min.' },
            5: { label: 'Si magg./sol♯ min.' },
            6: { label: 'Fa♯ magg./re♯ min.' },
            7: { label: 'Do♯ magg./la♯ min.' }
         },
         'flat': {
            0: { label: 'Do magg./la min' },
            7: { label: 'Do♭ magg./la♭ min.' },
            6: { label: 'Sol♭ magg./mi♭ min.' },
            5: { label: 'Re♭ magg./si♭ min.' },
            4: { label: 'La♭ magg./fa min.' },
            3: { label: 'Mi♭ magg./do min.' },
            2: { label: 'Si♭ magg./sol min.' },
            1: { label: 'Fa magg./re min.' }
         }
      }
      this.setSignature = this.setSignature.bind(this);
      this.setNumber = this.setNumber.bind(this);
   }
   setSignature(e, comp){
      this.setState({ keySig: comp.value }, ()=>{
         this.props.handleKeySignature([this.state.keySig, this.state.keyNumber]);
      })
   }
   setNumber(e, comp){
      this.setState({ keyNumber: parseInt(comp.value, 10) }, () => {
         this.props.handleKeySignature([this.state.keySig, this.state.keyNumber]);
      })
   }
   render() {
      const { keySig, keyNumber} = this.state;
      const keySigLabel = this.keySignature[keySig][keyNumber].label;
      return (
         <Form.Group inline>
            <label>Armatura di Chiave</label>
            <Form.Radio name="keySig" label='Diesis' value="sharp" checked={this.state.keySig === 'sharp'} onChange={this.setSignature} />
            <Form.Radio name="keySig" label='Bemolle' value="flat" checked={this.state.keySig === 'flat'} onChange={this.setSignature} />
            <Form.Input name="keyNumber" defaultValue={this.state.keyNumber} min="0" max="7" type="number" onChange={this.setNumber} />
            <label>{keySigLabel}</label>
         </Form.Group>
      );
   }
}

export default ScoreSettingsKeySignature;
