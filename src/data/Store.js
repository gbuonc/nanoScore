import createStore from 'unistore';
export const store= createStore({
   scores:{},
   currentScore:null,
   // count: 0
})

export const actions = store =>({
   increment(state) {
      return {
         count: state.count + 1
      };
   }
})

