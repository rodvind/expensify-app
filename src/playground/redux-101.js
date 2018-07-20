import { createStore } from "redux";

// Action Generator - function that returns action objects
// Accessing a property on an object which is undefined, will throw an error, so
// set default value of the "payload" to an empty object
// const incrementCount = (payload={}) => ({
//     type: 'INCREMENT',
//     incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
// });

// Destructuring incrementCount version//
// We're destructuring incrementBy. This is gonna give access to
// incrementBy value off of that first object, which means we can access
// it directly, so we no longer need "payload". We can set up a default value
// for incrementBy as well
// We're gonna use "1" by default, and we'll use "incrementBy" value, if it's
// actually passed in
// It's gonna set to "1", if an object is provided and doesn't include "incrementBy",
// if an object is not provided, the default is gonna be set to an empty object,
// and when we're trying to destructuring that empty object, we don't have 
// "incrementBy", so once again its value is gonna be set to "1"
const incrementCount = ({ incrementBy = 1 } = {} ) => ({
    type: 'INCREMENT',
    //incrementBy: incrementBy
    incrementBy
});

// Destructutring decrementBy version
const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

// Destructutring reset version - there is no way to pass data in.
// It's always set to zero (in store function). It is complete
const resetCount = () => ({
    type: 'RESET',
});

// Destructutring set version - we always require a count value, so 
// there is no need for the default value
const setCount = ({ count }) => ({
    type: 'SET',
    count
});

// Reducers
// 1. Reducers are pure functions in which the output only is determined by input,
// in our case, it uses only 'state' and 'actio'as input, and doesn't use anything from 
// outside of the function scope, and doesn't change anything outside of function scope
// 2. Never change state and action - we don't want to directly change them - we don't
// want to reassign any values to them, and if they are objects, we don't want to mutate them,
// instead, we should just be reading off of them, returning an object that represents
// the new state
// In the case to mutate 'state', only retun it on a new object instead
const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            //const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            return {
                //count: state.count + incrementBy
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            //const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
                //count: state.count - decrementBy
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
};

const store = createStore(countReducer);
// const store = createStore((state = {count: 0}, action) => {
//     switch (action.type) {
//         case 'INCREMENT':
//             //const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
//             return {
//                 //count: state.count + incrementBy
//                 count: state.count + action.incrementBy
//             };
//         case 'DECREMENT':
//             //const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
//             return {
//                 //count: state.count - decrementBy
//                 count: state.count - action.decrementBy
//             };
//         case 'SET':
//             return {
//                 count: action.count
//             };
//         case 'RESET':
//             return {
//                 count: 0
//             };
//         default:
//             return state;
//     }
// });

/////////////////// Playground for destructuring an object///////////////////
// const add = (data) => {
//     return data.a + data.b;
// };
// If we want to destructure this object, we just remove the name "data",
// and use {}. Here, we're destructuring first argument that is passed into
// the "add" function, and then we pull of a and b off of that object, and
// refrencing 'a' and 'b' in return, without needing to access to "data" object itself
// const add = ({ a, b }) => {
//     return a + b;
// };
// If we want to add a third argument in 
// So when we're destructuring, we can destructure just one of the arguments,
// as long as that one is either an object or an array
// We can also set up a default value as well
// const add = ({ a, b }, c) => {
//     return a + b + c;
// };
// console.log(add({a:10, b:12}, -199));
///////////////////////////////////////////////////////////////////////////////// 

store.subscribe(() => {
    console.log(store.getState());
});

// return-value for the subscribe is function that we can call to unsubscrib
// const unsubscribe = store.subscribe(() => {
//     console.log(store.getState());
// });


// Action is nothing more than an object that gets sent to the store
// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });
// There is no action handler for the incrementBy: 5 as an argument,
// unlees we set it up in our incrementCount function
store.dispatch(incrementCount({incrementBy:5}));

//unsubscribe();


// store.dispatch({
//     type: 'INCREMENT'
// });
store.dispatch(incrementCount());

// store.dispatch({
//     type: 'RESET'
// });
store.dispatch(resetCount());

// store.dispatch({
//     type: 'DECREMENT'
// });
store.dispatch(decrementCount());

// store.dispatch({
//     type: 'DECREMENT',
//     decrementBy: 10
// });
store.dispatch(decrementCount({decrementBy: 10}));

// store.dispatch(({
//     type: 'SET',
//     count: 101
// }));
store.dispatch(setCount({ count:101 }));

