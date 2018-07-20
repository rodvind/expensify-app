// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_AMOUNT
// const sortByAmount = (sortBy = 'date') => ({
//     type: 'SORT_BY_AMOUNT',
//     sortBy: 'amount'
// });
export const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

// SORT_BY_DATE 
// const sortByDate = (sortBy = 'date') => ({
//     type: 'SORT_BY_DATE',
//     sortBy
// });
export const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

// SET_START_DATE
export const setStartDate = (start) => ({
    type: 'SET_START_DATE',
    start
});

// SET_END_DATE
export const setEndDate = (end) => ({
    type: 'SET_END_DATE',
    end
});