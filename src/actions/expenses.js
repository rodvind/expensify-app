import uuid from 'uuid';
import database from "../firebase/firebase";
//import { firebase } from "../firebase/firebase";

// component calls action generator
// action generator returns object
// component dispatches object
// redux store changes

// With asynchronous actions:
// component calls action generator
// action generator returns function
// component dispatches function: redux by default does not allow you to return
// functions, that's why we're gonna be setting up a module which is a piece
// of redux middleware that is gonna add support for this behavior
// function runs (has the ability to dispatch other actions and do whatever it
// wants). So when we do dispatch this function, redux internally is going to
// execute the function, and this is going to allow the function to do whatever
// it wants, and this where we're going to put our firebase code  

// ADD_EXPENSE - Action generator - we only set ID, other properties
// will be entered by the user
// Its returned object is gonna be dispatched which changes the redux store
// export const addExpense = (
//     {
//         description = '',
//         note = '',
//         amount = 0,
//         createdAt = 0
//     } = {}
// ) => ({
//     type: 'ADD_EXPENSE',
//     expense: {
//         id: uuid(),
//         description,
//         note,
//         amount,
//         createdAt
//     }
// });
// Modified addExpense to use with firebase
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

// It's going to start the process of changing the redux store
// It'll return a function. This function works since we setup the middleware
// for redux-thunk in configureStore (store directory)
// This function gets called internally by redux, and gets called with dispatch
// This just gives us access to dispatch, so we can use it inside of the function,
// after writing some data to firebase, waiting for that data to correctly sync,
// then we'll use the dispatch to dispatch addExpense, making sure the redux
// store reflect those changes as well 
// At the end, we need to dispatch startAddExpense in AddExpensePage 
// instead of addExpense
export const startAddExpense = (expensesData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expensesData;
    const expense = { description, note, amount, createdAt };
    // We need to return the value from then() to be able to chain the
    // returned value to another then() in our test suites
    return database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};

// REMOVE_EXPENSE - Action generator
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE - Implicitly returns an object with updated properties/property
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// Changes the redux store: SET_EXPENSES: This is gonna allow us to completely
// set the array value. We get the array back from firebase, we set and we're done
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

// Asynchronous Action which is responsible for fetching data from firebase
// and dispatch setExpenses
// Fetch all expense data once
// Parse that data into an array
// Dispatch setExpenses to change the data
export const startSetExpenses = () => {
  return (dispatch) => {
    // return the promise to allow us access to then() to be able to dispatch
    return database.ref('expenses').once('value').then((snapshot) => {
      const expenses = [];

      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setExpenses(expenses))
    });
  };
};

// Asynchronous action
// Create startRemoveExpense (same call signature as removeExpense)
// Test startRemoveExpense with 'should remove expense from firebase'
// Use startRemoveExpense in EditExpensePage instead of removeExpense
// Adjust EditEspensePage tests
export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({ id }));
    });
  };
};