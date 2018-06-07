import React, { Component } from 'react';
// style
import { Container } from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';
import './App.css';
// store
import { data } from './data/Backend';
import { store } from './data/Store';
import { Provider } from 'unistore/react'
// routing
import { Router, Redirect } from "@reach/router";
import Home from './views/Home.jsx';
import NewScore from './views/NewScore.jsx';
import LoadScore from './views/LoadScore.jsx';
import Score from './views/Score.jsx';
// ----------------------------------------------------

class App extends Component {
   componentDidMount(){
      // get scores from localstorage and pass to app store
      data.getScores();
   }
   render() {
      return (
         <Provider store={store}>
            <Container className="main-wrap">
               <Router>
                  <Home default path="/" />
                  <NewScore path="/new" />
                  <LoadScore path="/load" />
                  <Score path="/score/:scoreId" />
                  <Redirect from="/save/:scoreId" to="/score/:scoreId" noThrow/>
                  <Redirect from="/delete/" to="/load" noThrow />
               </Router>
            </Container>
         </Provider> 
      )
   }
}
export default App;
