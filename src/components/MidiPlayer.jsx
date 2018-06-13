import React, { Component } from 'react';
import abcjs from 'abcjs/midi';

class MidiPlayer extends Component {
   play(){
      abcjs.midi.startPlaying(document.querySelector(".abcjs-inline-midi"));
   }
   pause(){
      abcjs.midi.stopPlaying();
   }
   render() {
      return (
         <div>
            <span onClick={this.play}>Play</span> |
            <span onClick={this.pause}>Stop</span>
         </div>
      ); 
   }
}

export default MidiPlayer;
