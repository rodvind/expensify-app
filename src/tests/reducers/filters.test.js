import moment from "moment";
import filtersRedeucer from "../../reducers/filters";

test('should setup default filter values', () => {
    // first argument is the current state, second argument
    // is the action object
    const state = filtersRedeucer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});
test('should set sortBy to amount', () => {
    const state = filtersRedeucer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
}); 

test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    // Type of the action we're dispatching
    const action = { type: 'SORT_BY_DATE' };
    const state = filtersRedeucer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const text = 'Some text';
    // const state = filtersRedeucer(undefined, { 
    //     type: 'SET_TEXT_FILTER',
    //     text
    //  });
    const action = {
        type: 'SET_TEXT_FILTER',
        text
    };
    const state = filtersRedeucer(undefined, action);
    expect(state.text).toBe(text);
});

test('should set startDate filter', () => {
    const start = moment();
    // const state = filtersRedeucer(undefined, { 
    //     type: 'SET_START_DATE',
    //     startDate
    // });
    const action = {
        type: 'SET_START_DATE',
        start
    };
    const state = filtersRedeucer(undefined, action);
    expect(state.startDate).toEqual(start);
});

test('should set endDate filter', () => {
    const end = moment();
    // const state = filtersRedeucer(undefined, { 
    //     type: 'SET_END_DATE',
    //     endDate
    // });
    const action = {
        type: 'SET_END_DATE',
        end
    };
    const state = filtersRedeucer(undefined, action);
    expect(state.endDate).toEqual(end);
});