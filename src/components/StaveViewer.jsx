import React, { Component } from 'react';
import ABCJS from 'abcjs';
import { data } from '../data/Backend';

class StaveViewer extends Component {
   constructor(props) {
      super(props);
      this.scoreId = props.score.settings.scoreId;
      this.state={
         settings: props.score.settings,
         melody: props.score.melody ||''
      }
   }
   componentDidMount() {
      const abcNotation = this.setAbcNotation();
      ABCJS.renderAbc("paper1", abcNotation,{});
   }
   changeMelody(e){
      const melody = e.target.value;
      this.setState({melody}, ()=>{
         const abcNotation = this.setAbcNotation();
         ABCJS.renderAbc("paper1", abcNotation, {});
         data.editScoreMelody(this.scoreId, this.state.melody); // save changes
      })
   }
   setAbcNotation(){
      // set ABC NOTATION
      const AbcNotation = `X:${this.scoreId}
%T:${this.state.settings.title}
%C:${this.state.settings.author}
M:${this.state.settings.time}
Q:1/4=${this.state.settings.metronome}
L: 1/4
K:${this.state.settings.keySignature[2]}
${this.state.melody || 'x'}`;
      return AbcNotation;
   }
   render() {
      return (
         <div>
            <textarea style={{'position':'fixed', 'bottom':'0', 'zIndex':'10'}}defaultValue={this.state.melody} onChange={(e)=>this.changeMelody(e)}></textarea>
            <div id="paper1"></div>
         </div>
      );
   }
}
export default StaveViewer;
