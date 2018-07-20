import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";
import "normalize.css/normalize.css";
import './styles/styles.scss';
import "react-dates/lib/css/_datepicker.css";

// This is gonna get the return value from configureStore, and
// give us the access to store.dispatch(), store.getState(), and store.subscribe()
const store = configureStore();
store.dispatch(addExpense({ description:'Water bill', amount: 4500 }));
store.dispatch(addExpense({ description:'Gas bill', createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 10950 }));
//store.dispatch(setTextFilter('bill'));
//store.dispatch(setTextFilter('water'));
//console.log(getVisibleExpenses());

// to see how the data changes and render to the screen
// setTimeout(() => {
//     store.dispatch(setTextFilter('bill'));
// }, 3000);

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);



//console.log(store.getState());

//ReactDOM.render(<AppRouter />, document.getElementById('app'));

// Provider component is gonna to allow us to provide the store
// to all of the components that make up our application. It means we do not need to
// manually pass the store around. Instead, the individual component that want to
// access store can just access it
// by passing our redux stroe, defined as store on top, as a prop
// all of our app components have the access to the store
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider> 
);

ReactDOM.render(jsx, document.getElementById('app'));