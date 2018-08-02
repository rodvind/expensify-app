import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { 
  startAddExpense, 
  addExpense, 
  editExpense, 
  removeExpense,
  startEditExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense 
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

// create redux mock store configuration to allow other tests to
// create the same mock store
// pass an array of middleware to configureMockStore
const createMockStore = configureMockStore([thunk]);

// Test Data
beforeEach((done) => {
const expensesData = {};
// loop over the expenses array, add a new item on to the expensesData for 
// each one, to be able to set things successfully
expenses.forEach(({ id, description, note, amount, createdAt }) => {
  expensesData[id] = { description, note, amount, createdAt };
});
// done() it will make sure that beforeEach() doesn't allow the test case
// to run until firebase has actually synced up the data
database.ref('expenses').set(expensesData).then(() => done());
});
// When using a test to compare two objects or arrays, use "toEqual"
test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

// Asynchronous test
test('should remove expense from firebase', (done) => {
  const store = createMockStore({});
  const id = expenses[2].id;
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    return database.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
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

test('should edit expense from firebase', (done)=> {
  const store = createMockStore({});
  const id = expenses[0].id;
  const updates = { amount: 21045 };
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });
    return database.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().amount).toBe(updates.amount);
    done();
  });

});
test('should setup add expense action object with provided values', () => {
  // firebase is gonna generate the id now  
  // create an object to provide some properties
    // const expenseData = {
    //     description: 'Rent',
    //     amount: 109500,
    //     createdAt: 1000,
    //     note: 'This was last month rent'
    // };
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        // expense: {
        //     ...expenseData,
        //     id: expect.any(String)
        // }
        expense: expenses[2]
    });
});

// We want ot verify if data was saved to the database, and
// if we dispatch the correct action
test('should add expense to database and store', (done) =>{
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };
  // When we're working with a synchronous test cases in jest, we need to
  // tell jest the given test is a synchronous. If we don't, Jest is gonna
  // go throught the function, and it's going to wait for the function test, 
  // second argument in the test, to return. If an erro got thrown during the
  // process, failure, if no error, success.
  // The problem is that the store.dispatch doesn't run until long after the
  // parent function, second argument in the test, has returned. It is a 
  // synchronous, we have to wait for the firebase to do all its stuff, and
  // then and only then does this function get called
  // So if we want jest to wait until a specific point in time we have to
  // provide an argument to our test function, which is called "done", and
  // this test case is no longer going to be considered a success or a
  // failure until after we call done()
  // Calling done() is going to have the effect of forcing just to wait until
  // this moment of time. All of our assertion happen before that.
  // dispatch an asynchronous action
  store.dispatch(startAddExpense(expenseData)).then(() => {
    // expect(1).toBe(2);
    
    // Figure out how we can get all actions dispatched to our mock-store
    // Get all of the actions. This is gonna retun an array of all actions
    // where actions[0] is the first action and so on and so forth
    // In this case we expect only one action gets dispatched, which is the 
    // fist action in the array
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    // This callback is gonna be a asynchronous function. If we want to this
    // to be completed too, we have to place done() inside the callback
    // function
    // Check database to verify if the data got stored
    // Fetching data by id. We have access to the id because we have access
    // to the complete actions object and id is on there
    // This is the id created by the firebase
    // database.ref(`expenses/${actions[0].expense.id}`).once('value')
    // .then((snapshot) => {
    //   expect(snapshot.val()).toEqual(expenseData);
    //   done();
    // });

    // Another way of writing the chain promise, use the promise as the 
    // returned value
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    
    //done();
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});


test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  };
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });
    
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults);
    done();
  });

});

// This is not asynchronous test
test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

// Asynchronous test
// Create the mock store, making the request, assert something about 
// the action we're gonna dispatch
test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore({});
  // Dispatch startSetExpenses
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});

// test('should setup add expense action object with default values', () => {
//    const action = addExpense();
//    expect(action).toEqual({
//        type: 'ADD_EXPENSE',
//        expense: {
//            id: expect.any(String),
//            description: '',
//            note: '',
//            amount: 0,
//            createdAt: 0
//        }
//    }); 
// });