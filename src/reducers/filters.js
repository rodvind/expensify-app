// Filters Reducer
// Adding an expense doesn't affect filtersReducerDefaultState object at all

// const filtersReducerDefaultState = {
//     text: '',
//     sortBy: 'date',
//     startDate: undefined,
//     endDate: undefined
// };

// const filtersReducer = (state = filtersReducerDefaultState, action) => {
//     switch (action.type) {
//         case 'SET_TEXT_FILTER':
//             return {
//                 ...state,
//                 text: action.text
//             };
//         case 'SORT_BY_AMOUNT':
//             return {
//                 ...state,
//                 sortBy: 'amount'
//             };
//         case 'SORT_BY_DATE':
//             return {
//                 ...state,
//                 sortBy: 'date'
//             };
//         case 'SET_START_DATE':
//             return {
//                 ...state,
//                 startDate: action.start
//             };
//         case 'SET_END_DATE':
//             return {
//                 ...state,
//                 endDate: action.end
//             };
//         default:
//             return state;
//     }
// };

import moment from "moment";

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    //startDate: undefined,
    //endDate: undefined
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
};

export default (state = filtersReducerDefaultState, action) => {
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
