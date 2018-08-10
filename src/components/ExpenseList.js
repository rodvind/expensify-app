import React from "react";

// Import connect that connect your component to the redux store
import { connect } from "react-redux";

import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";
// Create stateless functional component, import it in the ExpenseDashboard
// When we want to test our React Components, we want to actually
// test the un-connected version, because we want to be able to
// provide a set of dynamic props, so we don't actually want these
// props to come from the store, instead, we're gonna just provide
// expenses directly
// So if we are gonna be testin the un-connected version, we actually
// have to export it by name 
export const ExpenseList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expense</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
    {
      props.expenses.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No expenses</span>
        </div>
      ) : (
        props.expenses.map((expense) => {
          return <ExpenseListItem key={expense.id} {...expense}/>;
        })
      )
    }
    </div>
  </div>
);

// Create a new const for the Higher Order Component
// For the connected component put the word "Connected" in front
// of the component name to make it easier to differentiate between two components
// connect() won't return a HOC, it'll return a function, which means we need to call
// that function with the component, ExpenseList
// Inside the first pranthesis, we provide the information about
// what we want it to connect, so we define a fuction inside it as an argument.
// This function lets us determine what information from the store we want
// our component to be able to access, and the store state will get passed
// as the first argument
// This function will return an object. On this object we can put any pari-values
// we like. Usually is things from state
// Now ConnectedExpenseList has access to the name, and we can pass it as
// a prop up in the ExpenseList 

// const ConnectedExpenseList = connect((state) => {
//     return {
//         //name: 'Rodvin'
//         expenses: state.expenses
//     };
// })(ExpenseList);

// export default connect((state) => {
//     return {
//         //name: 'Rodvin'
//         expenses: state.expenses
//     };
// })(ExpenseList);

//export default ExpenseList;

// set up ConnectedExpenseList as the default export to be able to use it
// export default ConnectedExpenseList;

// As the store changes, this function automatically is gonna re-run,
// getting the fresh values into the component
// When you connect a component to the redux store, it's reactive which
// means as the store changes, your component is gonna get re-rendered with
// those new values 
const mapStateToProps = (state) => {
    return {
        //name: 'Rodvin'
        //expenses: state.expenses,
        //filters: state.filters
        expenses:selectExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);
