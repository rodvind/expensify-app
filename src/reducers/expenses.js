// Expenses Reducer - return a new state - for expenses, which we show
// with the state, the default value is an empty array
// Add the case for the reducer to do sth when addExpense gets dispatched

// const espenseReducerDefaultState = [];
// const expensesReducer = (state = espenseReducerDefaultState, action) => {
//     switch (action.type) {
//         case 'ADD_EXPENSE':
//             //return state.concat(action.expense);
//             return [
//                 ...state,
//                 action.expense
//             ];
//         case 'REMOVE_EXPENSE':
//             // fileter doesn't change the array it's called on, 
//             // it returns a new array with the subset of the values
//             return state.filter(({ id }) => id !== action.id);
//         case 'EDIT_EXPENSE':
//             return state.map((expense) => {
//                 if (expense.id === action.id) {
//                     // We want to grab all expense properties, then
//                     // we want to just override the ones the user passed in
//                     return {
//                         ...expense,
//                         ...action.updates
//                     };
//                 } else {
//                     return expense;
//                 }
//             });
//         default:
//             return state;
//     }
// };
//export default expensesReducer;

const espenseReducerDefaultState = [];
export default (state = espenseReducerDefaultState, action) => {
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
        case 'SET_EXPENSES':
          return action.expenses;
        default:
            return state;
    }
};
