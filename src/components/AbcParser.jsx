import { Component } from 'react';

class AbcParser extends Component {
   renderAbc(){
      if(this.props.score){
         const { settings, melody } = this.props.score;
         const AbcNotation = `X:${settings.scoreId}
%T:${settings.title}
%C:${settings.author}
M:${settings.time}
Q:1/4=${settings.metronome}
L: 1/4
K:${settings.keySignature[2]} clef=${settings.clef} 
${melody || `y`}`;
         return AbcNotation;
      }
      return null;
   }
   render() {
      const abc = this.renderAbc();
      return this.props.render(abc);
   }
}
export default AbcParser;
