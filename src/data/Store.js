import createStore from 'unistore';
import {navigate} from "@reach/router";

export const store= createStore({
   scores:{},
   ref: null
})

export const data = {
   // -----------------------------
   getScores: () => {
      // get scores from localstorage and pass to app store on app mount
      console.log('getting scores from localstorage ------------');
      const localScores = localStorage.getItem('nanoScore');
      if (localScores) {
         const scores = JSON.parse(localScores);
         store.setState({scores})
      }
   },
   updateScore(e, scoreId) {
      const updatedScores = { ...store.getState()['scores']};
      updatedScores[scoreId].melody = e.target.value;
      store.setState({scores: updatedScores});
      localStorage.setItem('nanoScore', JSON.stringify(updatedScores));
   },
   // -----------------------------
   editScoreSettings: (scoreId, scoreSettings) => {
      console.log('edit score settings -------------------------');
      // set default title
      scoreSettings.title = (scoreSettings.title === '') ? 'Brano senza Titolo' : scoreSettings.title;
      data.saveScore(scoreId, scoreSettings, null, true)
   },
   // -----------------------------
   editScoreMelody: (scoreId, scoreMelody) => {
      console.log('edit score melody --------------------------');
      // generate score
      data.saveScore(scoreId, null, scoreMelody, false)
   },
   // -----------------------------
   saveScore: (scoreId, scoreSettings, scoreMelody, reload) => {
      console.log('saving score -------------------------------');
      // get current collection and check if scoreId is already present in collection
      const scores = store.getState().scores;
      const scoresArray = Object.keys(scores);
      const newScore = scoresArray.indexOf(scoreId + '') >= 0 ? false : true;
      const score = newScore ? {} : { ...scores[scoreId]
      };
      // init settings + melody
      score.settings = score.settings || {};
      score.melody = score.melody || '';
      // change if present, or leave as is
      score.settings = scoreSettings ? scoreSettings : score.settings;
      score.melody = scoreMelody ? scoreMelody : score.melody;
      // save
      scores[scoreId] = score;
      store.setState({
         scores
      });
      localStorage.setItem('nanoScore', JSON.stringify(scores));
      if (reload) navigate(`/save/${scoreId}`);
   },
   deleteScore: (scoreId) => {
      console.log('deleting score ', scoreId, '----------------');
      const scores = store.getState().scores;
      delete scores[scoreId];
      store.setState({
         scores
      });
      localStorage.setItem('nanoScore', JSON.stringify(scores));
      navigate(`/delete`);
   }
}

export const actions = store =>({
   getScores: function(){
      // get scores from localstorage and pass to app store on app mount
      const localScores = localStorage.getItem('nanoScore');
      if (localScores) {
         const scores = JSON.parse(localScores);
         return {scores}
      }
   },
   editScoreSettings(){

   },
   editScoreMelody(scoreId, scoreMelody){

   },
   writeToScore(e, scoreId) {
      console.log(e.target.value);
   },
   saveScore: (scoreId, scoreSettings, scoreMelody, reload) => {
         // get current collection and check if scoreId is already present in collection
         const scores = store.getState().scores;
         const scoresArray = Object.keys(scores);
         const newScore = scoresArray.indexOf(scoreId + '') >= 0 ? false : true;
         const score = newScore ? {} : { ...scores[scoreId]
         };
         // init settings + melody
         score.settings = score.settings || {};
         score.melody = score.melody || '';
         // change if present, or leave as is
         score.settings = scoreSettings ? scoreSettings : score.settings;
         score.melody = scoreMelody ? scoreMelody : score.melody;
         // save
         scores[scoreId] = score;
         store.setState({
            scores
         });
         localStorage.setItem('nanoScore', JSON.stringify(scores));
         if (reload) navigate(`/save/${scoreId}`);
      },
      deleteScore: (scoreId) => {
         const scores = store.getState().scores;
         delete scores[scoreId];
         store.setState({
            scores
         });
         localStorage.setItem('nanoScore', JSON.stringify(scores));
         navigate(`/delete`);
      },
   
   saveCurrentScore(state, score){
      const scores = {...state.scores};
      console.log('saving current score', score);
      return {scores}
   }
})
