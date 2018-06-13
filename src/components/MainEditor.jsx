import React from 'react';
import { data } from '../data/Store';

const MainEditor = (props) => {
   return (
      <React.Fragment>
         <h3>editor</h3>
         <textarea style={{ 'border': '1px solid #000', 'width': '90%', 'left': '5%' }}
            defaultValue={props.melodicLine}
            onChange={(e) => data.updateScore(e, props.scoreId)}
         ></textarea>
      </React.Fragment>
   );
};
export default MainEditor;

