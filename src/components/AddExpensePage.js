import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
//import { addExpense } from "../actions/expenses";
import { startAddExpense } from "../actions/expenses";

// To avoid inline functions, switch to class-based component
// We must use this.props for the class-based component
// To test unconnected component version, we need to export it
// export class AddExpensePage extends React.Component {
//   onSubmit = (expense) => {
//     this.props.addExpense(expense);
//     this.props.history.push('/');
//   };
//   render() {
//     return (
//       <div>
//         <h1>Add Expense</h1>
//         <ExpenseForm
//         // We no longer define the function inline which would need
//         // to get recalculated on every render, instead, we just 
//         // reference "this.onSubmit"
//           onSubmit={this.onSubmit}
//         />
//     </div>
//     );
//   };
// };

export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startAddExpense(expense);
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
          // We no longer define the function inline which would need
          // to get recalculated on every render, instead, we just 
          // reference "this.onSubmit"
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  };
};

// Stateless functional component
// const AddExpensePage = (props) => (
//     <div>
//         <h1>Add Expense</h1>
//         <ExpenseForm
//             // The function which will get called when the form gets submitted with
//             // the valid data, and we get that data, so in this case, we'll get the
//             // expense object back with the all of its properies on it we would expect
//             // we will call it in the onSubmit function in the ExpenseForm component
//             // The last thing we want to do is to automate the redirect to the 
//             // DashboardPage when Create Expense page form is submitted
//             onSubmit={(expense) =>{
//                 //console.log(expense);
//                 // To make testig easy we need to use onSubmit prop
//                 // instead of dispatch
//                 props.onSubmit(expense);
//                 //props.dispatch(addExpense(expense));
//                 // 
//                 // automatically take yo to the Dashboard Page after the form
//                 // being submitted. We are not gonna go through the full page
//                 // referesh, it's going to switch over using the browser routing
//                 props.history.push('/'); 
//             }}
//         />
//     </div>
// );
// We do want to connect AddExpensePage component to the redux store, so it can
// dispatch
// We don't need anything from state, so we leave the first argument empty. And
// now we have the access to the "props.dispatch"
//export default connect()(AddExpensePage);

// We do the following for the tesing with Jest as we use the
// unconnected version, and we have "addExpense" function imported
// here and that make this component complicated
// It's similar to mapStateToProps, insetead of working with
// the state working with the dispatch
// It's a way to return your dispatcher functions allowing you to 
// abstract them away from the component itself
const mapDispatchToProps = (dispatch) => ({
  // We pass addexpense property to be able to use it inside the 
  // ExpenseForm tag
  // Use the name of the action generator, addExpense
    //addExpense: (expense) => dispatch(addExpense(expense))
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
});


export default connect(undefined, mapDispatchToProps)(AddExpensePage);