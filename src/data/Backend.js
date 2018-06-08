import { store } from './Store';
import {navigate} from "@reach/router";

// item structure
//    {
//    12345:{
//       settings:{
//          scoreId: 12345, // timestamp
//          title:'Titolo score',
//          author:'Autore',
//          metronome:120,
//          keySignature:['sharp', 2],
//          clef:'G',
//          time:'3/4',
//          instrument:'piano',
//          transpose:0,
//       },
//    }
// }

export const data ={
   // -----------------------------
   getScores: ()=>{
      // get scores from localstorage and pass to app store on app mount
      const localScores = localStorage.getItem('nanoScore');
      if(localScores){
         const scores = JSON.parse(localScores);
         store.setState({scores})
      }
   },
   // -----------------------------
   editScoreSettings: (scoreId, scoreSettings) => {
      // set default title
      scoreSettings.title = (scoreSettings.title === '') ? 'Brano senza Titolo' : scoreSettings.title;
      data.generateScore(scoreId, scoreSettings, null, true)
   },
   // -----------------------------
   editScoreMelody:(scoreId, scoreMelody) => {
      // generate score
      data.generateScore(scoreId, null, scoreMelody, false)
   },
   // -----------------------------
   generateScore:(scoreId, scoreSettings, scoreMelody, reload)=>{
      // get current collection and check if scoreId is already present in collection
      const scores = store.getState().scores;
      const scoresArray = Object.keys(scores);
      const newScore = scoresArray.indexOf(scoreId+'') >= 0 ? false : true;
      const score = newScore ? {} : {...scores[scoreId]};
      // init settings + melody
      score.settings = score.settings || {};
      score.melody = score.melody || '';
      // change if present, or leave as is
      score.settings = scoreSettings ? scoreSettings : score.settings;
      score.melody = scoreMelody ? scoreMelody : score.melody;
      // save
      scores[scoreId] = score;
      store.setState({scores});
      localStorage.setItem('nanoScore', JSON.stringify(scores));
      if(reload) navigate(`/save/${scoreId}`);
   },
   deleteScore:(scoreId)=>{
      const scores = store.getState().scores;
      delete scores[scoreId];
      store.setState({scores});
      localStorage.setItem('nanoScore', JSON.stringify(scores));
      navigate(`/delete`);
   }
}
