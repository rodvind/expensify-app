// Always have the third-party import first and then your own
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";
import authReducer from "../reducers/auth";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



// Store creation
// const store = createStore(expensesReducer);

// We want our array to live on the expenses property (demoState)
// to set that up, we need to create our stroe by combineReducers function
// that allows us to break our application up to multiple small reducers as opposed
// to a gingantic out of control one
// on the object inside the combineReducers, we provide key-value pairs inside of it.
// The key is gonna be root state name, expenses and filter, and the value is gonna
// be the reducer that suppose to manage that
// const store = createStore(
//     combineReducers({
//         expenses: expensesReducer,
//         filters: filtersReducer
//     })
// );

export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer,
            auth: authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};