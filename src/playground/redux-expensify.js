import { createStore, combineReducers } from "redux";
import uuid from 'uuid';

// ADD_EXPENSE - Action generator - we only set ID, other properties
// will be entered by the user
const addExpense = (
    { 
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE - Action generator
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE - Implicitly returns an object with updated properties/property
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// Expenses Reducer - return a new state - for expenses, which we show
// with the state, the default value is an empty array
// Add the case for the reducer to do sth when addExpense gets dispatched
const espenseReducerDefaultState = [];
const expensesReducer = (state = espenseReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            //return state.concat(action.expense);
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            // fileter doesn't change the array it's called on, 
            // it returns a new array with the subset of the values
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    // We want to grab all expense properties, then
                    // we want to just override the ones the user passed in
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                }
            });
        default:
            return state;
    }
};

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text

});

// SORT_BY_AMOUNT
// const sortByAmount = (sortBy = 'date') => ({
//     type: 'SORT_BY_AMOUNT',
//     sortBy: 'amount'
// });
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

// SORT_BY_DATE 
// const sortByDate = (sortBy = 'date') => ({
//     type: 'SORT_BY_DATE',
//     sortBy
// });
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

// SET_START_DATE
const setStartDate = (start) => ({
    type: 'SET_START_DATE',
    start
});

// SET_END_DATE
const setEndDate = (end) => ({
    type: 'SET_END_DATE',
    end

});

// Filters Reducer
// Adding an expense doesn't affect filtersReducerDefaultState object at all
const filtersReducerDefaultState = {
    text:'', 
    sortBy:'date', 
    startDate: undefined, 
    endDate: undefined 
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.start
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.end
            };
        default:
            return state;
    }
};

// Get visible expenses
// const getVisibleExpenses = (expenses, filters) => {
//     return expenses;
// };
// Destructuring filters
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    // if startDate or endDate are not numbers(i.e.it's undefined) 
    // then have both startDateMatch and endDateMatch evaluate to true
    // so all expenses are shown regardless of their date.
    // This is basically what happens when you boot the app up for the first time.
    // The startDate and endDate are undefined in the beginning.
    // If they aren't a number, we can assume that those dates haven't been set yet
    // so by default startDateMatch and endDateMatch will be true
    // rendering all of the expenses (based on their date).
    // Figure out if a given expense happened after the date the user is trying to file by.
    // This would allow us to show the expense since it would match the filter.
    // We also check that the expense happened before the end date picked by the user.
    return expenses.filter((expense) => {
        // if first-part, type of startDate !== 'number',
        // resaults in True, it is not a number,
        // the item won't be filtered
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        // convert the description to lowercase, then convert the text to lowercase
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            // -1, retuns a. 1 returns b: if b is greater than a, returns 1
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};


// Store creation
// const store = createStore(expensesReducer);

// We want our array to live on the expenses property (demoState)
// to set that up, we need to create our stroe by combineReducers function
// that allows us to break our application up to multiple small reducers as opposed
// to a gingantic out of control one
// on the object inside the combineReducers, we provide key-value pairs inside of it.
// The key is gonna be root state name, expenses and filter, and the value is gonna
// be the reducer that suppose to manage that
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

// To track changes, we use store.subscribe
// We get the state back from this call
store.subscribe(() => {
    // Get the entire state, including expenses array and etire filters
    const state = store.getState();

    // Set the visibleExpenses to the return-value from getVisibleExpenses
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

    // Log visibleExpenses to the screen as opposed to the raw data (store.getState())
    // It will show three empty arrays to the screen
    console.log(visibleExpenses);
});

// To dispatch addExpense action generator, and we paas an object into that
// addExpense is gonna be dispatch to both reducers. expensesReducer and 
// filterReducer
// We can add multiple expenses by adding multiple dispatch call
// We get the action object back from store.dispatch as the return-value
// store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
// store.dispatch(addExpense({ description: 'Coffee', amount: 300 }));
// So we can assign a variable to each dispatch call to store the returned
// action object for each call
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 200, createdAt: -2100 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 }));
// console.log(expenseOne);
// console.log(expenseTwo);

//store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// Second argument is gonna be an updates object, which property we want to update
//store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// challenge
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// Challenge
// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));

const demoState = {
    expenses: [{
        id: 'piojsd',
        description: 'January Rent',
        note: 'This was the final payment for that address.',
        amount: 54500,
        createdAt: 0
    }],
    filter: {
        text: 'rent',
        sortBy: 'amount', // amount or date
        startDate: undefined,
        endDate: undefined
    }
};

// const user = {
//     name: 'Rodvin',
//     age: 34
// };
// console.log({
//     ...user,
//     location: 'Calgary',
//     age: 30
// });
