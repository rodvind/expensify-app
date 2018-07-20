// It is going to contain all of the form fields,
// all of the validation, all of the logic to get the form to work
import React from "react";
import 'react-dates/initialize';
import moment from "moment";
import { SingleDatePicker } from "react-dates";
//import "react-dates/lib/css/_datepicker.css";

//const date = new Date();
const now = moment();
console.log(now.format('MMM Do, YYYY'));


// The goal is to use the local component state to track the changes to
// all of these inputs. Only when the user actually submits the form, we will
// do something with that information. So we're going to keep track of the 
// changes to every single input. When they submit the form, we will actually
// send that off to redux to either edit the existing expense or create a new one.
// And that does mean we're gonna to introduce some local component
// states right here 
// Dispatch the proper action is not gonna happen in this component
// The whole goal of ExpenseForm is to be reused in EditExpensePage and 
// AddExpensePage, we need to dispatch different stuff for adding and editing,
// so we're gonna pass the data to AddExpensePage and EditExpensePage, this is
// gonna to allow us to determine what to do with the data when the user submits
// the form on a dynamic basis, so for the AddExpensePage, we can dispatch
// addExpense action, and for the EditExpensePage component, we can dispatch
// editExpense action
export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        };
    }
    // state = {
    //     description: '',
    //     note:'',
    //     amount: '',
    //     createdAt: moment(),
    //     calendarFocused: false,
    //     error: ''
    // };
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onNoteChange = (e) => {
        // e.persist();
        // this.setState(() => ({ note: e.target.value }));
        const note = e.target.value;
        this.setState(() => ({ note }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount}));
        }
    };
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };
    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            // Set error state equal to 'Please provide description and amount' 
            this.setState(() => ({ error: 'Please provide description and amount'  }));
        } else {
            // Clear the error
            this.setState(() => ({ error: '' }));
            //console.log('Submitted!');
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    };
    // Set up onSubmit for the "form", and that's going to allow us to dispatch the
    // Action that adda an expense, we're gonna redirect the user over to the
    // Dashboard Page where they can view the new expense they added
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text"
                        placeholder="Description"
                        // put the cursor on the input field
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        //type="number"
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        );
    }
}