import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../actions/expenses";

// Step one is to connect the EditExpensePage component to the redux store. We have
// the "id", but it's not enough information. We want to be able to grab the etire
// expense object. Step one is to import "connect", and step two, is going to be the
// search the entire expenses array for the expense with the id that matches this id
// Then, we need to render ExpenseForm in EditExpensePage component. To get that done
// first import the ExpenseForm, and then render it inside the component.
// We wanto to the field get populated with the correct data when, for instance,
// click on the "water bill" expense. To do that, we need to get the "expense"
// and pass it down. We define a new prop on ExpenseForm, which is gonna be 
// be the existing expense, and we have access to that on "props.expense", which
// we prove via the console.log(props)
// Then, we're gonna set up the ExpenseForm to do something meaningful with
// this new prop that's getting.
// The goal is to get these four state values in ExpenseForm component, which
// are "description", "note", amount, and "createdAt", and only use their
// default values if no expense was passed down, that's gonna make sure that 
// the AddExpensePage still works, but if an expense was passed down, we want
// to start these four values off  of the new expense, instead of their default
// values
// To get that done, we have to look at the props, and currently there
// is no way to do that using the state object syntax, instead we have to define
// our state in the construction function to access the props.
// The last thing we need to do is to dispatch the correct stuff here
// Remove the expense via dispatch and then redirect to Dashboard page

// Refactor the EditExpensePage to be a class based component
export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };
  onRemove = () => {
    this.props.removeExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <ExpenseForm 
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    );
  };
};
// const EditExpensePage = (props) => {
//     //console.log(props);
//     return (
//         <div>
//             <ExpenseForm 
//                 expense={props.expense}
//                 onSubmit={(expense) => {
//                     // Distpatch the action to edit the expense
//                     props.dispatch(editExpense(props.expense.id, expense));
//                     // Then redirect to Dashboard Page
//                     props.history.push('/');
//                     console.log('updated', expense);
//                 }}
//             />
//             <button onClick={() => {
//                 //console.log('connected');
//                 props.dispatch(removeExpense({ id: props.expense.id }));
//                 props.history.push('/');
//             }}>Remove</button>
//         </div>
//     );
// };
// const EditExpensePage = (props) => {
//     console.log(props);
//     return (
//         <div>
//             Editting the expense with id of {props.match.params.id}
//         </div>
//     );
// };

// We want to be able to give the component the current expense object
// We have the access to "state" because that's where the expenses array lives
// and we're gonna search it. We're searching expenses array for the expense whose
// id matches the "props.match.params.id". We can access through the 'props' as the
// second argument in our mapStateToProps function. So, we can take some of the
// current props that are passed in to the HOC, and we can use them to calculate 
// the props that we want to add on
// So, the React router renders our HOC, connect()(EditExpensePage);, the HOC passes
// the props through and also allows us to pass on some new ones 
// Returning an object with the expense property which has the same id as 
// props.match.params.id
// Now, our component up above, EditExpensePage, actually has the
// access to the expense

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

// Setup mapDispatchToProps to return editExpense and removeEspense
const mapDispatchToProps = (dispatch, props) => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeEspense: (data) => dispatch(removeExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);