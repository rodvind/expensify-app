import React from "react";
import { Link } from "react-router-dom";
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
const ExpenseListItem = ({ description, amount, createdAt, id, dispatch }) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>{amount} - {createdAt}</p>
    </div>
);

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