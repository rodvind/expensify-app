import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

// When using a test to compare two objects or arrays, use "toEqual"
test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('Should setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'This is a test note' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'This is a test note'
        }
    });
});

test('should setup add expense action object with provided values', () => {
    // create an object to provide some properties
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'This was last month rent'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test('should setup add expense action object with default values', () => {
   const action = addExpense();
   expect(action).toEqual({
       type: 'ADD_EXPENSE',
       expense: {
           id: expect.any(String),
           description: '',
           note: '',
           amount: 0,
           createdAt: 0
       }
   }); 
});