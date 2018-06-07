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
//       scoreMeta:'',
//       scoreStaff:'abcdfgABC'
//    }
// }

export const data ={
   getScores: ()=>{
      // get scores from localstorage and pass to app store on app mount
      const localScores = localStorage.getItem('nanoScore');
      if(localScores){
         const scores = JSON.parse(localScores);
         store.setState({scores})
      }
   },
   editScoreSettings: (scoreId, scoreSettings) => {
      // get current collection and check if scoreId is already present in collection
      const scores = store.getState().scores;
      const scoresArray = Object.keys(scores);
      const newScore = scoresArray.indexOf(scoreId) >=0 ? false : true;
      // set default title
      scoreSettings.title = (scoreSettings.title === '') ? 'Brano senza Titolo' : scoreSettings.title;
      // TO DO: convert score settings to ABC NOTATION ...
      const score = newScore ? {} : {...scores[scoreId]};
      score.settings = scoreSettings;
      if(newScore){
         // add ABC Notation fields
         score.scoreMeta = '';
         score.scoreStaff = '';
      }
      // 4 - save changes to store and localStorage then redirect to score page
      scores[scoreId] = score;
      store.setState({scores});
      localStorage.setItem('nanoScore', JSON.stringify(scores));
      navigate(`/save/${scoreId}`);
   },
   deleteScore:(scoreId)=>{
      const scores = store.getState().scores;
      delete scores[scoreId];
      store.setState({scores});
      localStorage.setItem('nanoScore', JSON.stringify(scores));
      navigate(`/delete`);
   }
}
