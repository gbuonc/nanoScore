import React, { Component } from 'react';
import abcjs from 'abcjs/midi';
import 'abcjs/abcjs-midi.css';

class StaveViewer extends Component {
   componentDidMount() {
      this.renderStave();
   }
   componentDidUpdate() {
      this.renderStave();
   }
   renderStave(){
      new abcjs.Editor(
         "test",
         {
            paper_id: 'stave',
            generate_midi: true,
            midi_id: "midi-inline",
            abcjsParams: {
               paddingright: 20,
               paddingleft: 20,
               staffwidth: document.body.getBoundingClientRect().width,
               add_classes: true,
               clickListener: function (abcElem, tuneNumber, classes) { 
                  console.log(abcElem, tuneNumber, classes); 
               },
               // midi
               inlineControls: {
                  hide: true,
               },
               program: 56,
               //midiTranspose: -2,
               animate: {
                  listener: function (lastRange, currentRange, context) {
                     function colorRange(range, color, checkPos) {
                        if (range && range.elements) {
                           range.elements.forEach(function (set) {
                              set.forEach(function (item) {
                                 item.setAttribute('fill', color);
                                 item.classList.remove('currentNote');
                              });
                           });
                        }
                     }
                     colorRange(lastRange, '#999', false);
                     colorRange(currentRange, '#1989f0', true);
                  }},
            }
         });
   }
   render() {
      return (
         <React.Fragment>
            <textarea id="test" value={this.props.abc} readOnly style={{'display':'none'}}></textarea>
            <div id="midi-inline"></div>
            <div id="stave"></div>
         </React.Fragment>
      )
   }
}
export default StaveViewer;
