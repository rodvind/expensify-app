import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
//import { connect } from "react-redux";
//import { removeExpense } from "../actions/expenses";

// const ExpenseListItem = (props) => (
//     <div>
//         <h1>Expense List Item: </h1>
//         {props.expenses.map((expense) => (
//             <p>
//                 {expense.description}
//                 {expense.amount}
//                 {expense.createdAt}
//             </p>
//         ))}
//     </div>
// );

// we have access to the "id" and "dispatch"
// we can call dispatch inside the "onClick" event-handler, and pass 
// "removeExpense" to it, and pass an object with the property "id"
// const ExpenseListItem = ({ description, amount, createdAt, id, dispatch }) => (
//     <div>
//         <Link to={`/edit/${id}`}>
//             <h3>{description}</h3>
//         </Link>
//         <p>{amount} - {createdAt}</p>
//         <button onClick={() => {
//             //console.log('connected');
//             dispatch(removeExpense({ id }));
            
//         }}>Remove</button>
//     </div>
// );

// We can remove the destructuring for the dispatch as we no longer need and have
// the access to the dispatch
// const ExpenseListItem = ({ description, amount, createdAt, id, dispatch }) => (
//     <div>
//         <Link to={`/edit/${id}`}>
//             <h3>{description}</h3>
//         </Link>
//         <p>{amount} - {createdAt}</p>
//     </div>
// );

// Remove the root div and let Link to be the root element
const ExpenseListItem = ({ description, amount, createdAt, id, dispatch }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{description}</h3>
      <span className="list-item__sub-title">{moment(createdAt).format('MMMM Do, YYYY')}</span>
    </div>
    <h3 className="list-item__data">
      {numeral(amount / 100).format('$0,0.00')}
    </h3>
  </Link>
);

// const ExpenseListItem = ({ description, amount, createdAt, id, dispatch }) => (
//   <div>
//     <Link to={`/edit/${id}`}>
//       <h3>{description}</h3>
//     </Link>
//     <p>
//       {numeral(amount / 100).format('$0,0.00')}
//       - 
//       {moment(createdAt).format('MMMM Do, YYYY')}
//      </p>
//   </div>
// );

// const mapStateToProps = (state) => {
//     return {
//         expenses: state.expenses
//     };
// };

// export default connect(mapStateToProps)(ExpenseListItem);
//export default ExpenseListItem;

// because we move the remove button from here to EditExpensePage, we no longer need
// to connect the component to the redux store
//export default connect()(ExpenseListItem);

// Instead, we use regualr default export
export default ExpenseListItem;