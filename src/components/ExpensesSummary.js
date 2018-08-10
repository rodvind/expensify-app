// Rendered by ExpensesDashboardPage
// Test with two snapshot tests
// Connected to redux store for 
// - expenseCount (how many visible expenses?)
// - expenseTotal (What's the total of the visible expenses?)

// Example:
// viewing two expenses totalling $94.34

// Example:
// viewing one expense totalling $94.34

// Commit and deploy
// Get the feature live

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import numeral from "numeral";
import selectExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total";

 export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount===1 ? 'expense' : 'expenses';
  const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');

  return(
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Viewing <span>{expenseCount}</span> {expenseWord} totalling <span>{formattedExpensesTotal}</span></h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Expense</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);