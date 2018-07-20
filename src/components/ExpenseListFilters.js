import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from "../actions/filters";

// Stateless fuctional component - explicitly returns a JSX
// We're focusing just on text filter
// We're gonna import it in the ExpenseDashboardPage,
// as we want to change that component
// The goal from here is to actually get old value off of the store,
// because there is a value set behind the scenes in the app.js,
// we set it to 'water', and 'bill', and it's really important for us to
// make sure that the input always matches up with the current text value
// on the redux store. So if that changes via a dispatch call, we want to
// make sure we're reading that value and using it inside of here.
// We get this done by actually connecting ExpenseListFilters to the store, so
// we need to import 'connect'. Then created a connected version of ExpenseListFilters
// So we don't use export default for that. 
// We're reading off of the store, but How do we dispatch from the component
// anytime the text input gets changed by the user
// What we need to do is to just provide an "onChange" handler
// "onChange" takes a function, and every single time the input changes,
// the function fires
// After printing "e.target.value", we only see the changes on the console.
// On the Chrome developre, if we go the "react" tab, after digging into the 
// components we can see that we have two props, one that we created (filters),
// and the other one is "dispatch". Even if we didn't use it directly, it's
// called from our component, this is because we connected our component,
// so we're gonna call it directly to dispatch the actoin, in order to update the store
// we need to pass in the action objec. In our case, we're trying
// to set the text filter, and we have access to that via the "actions" directory
// from "filters.js", via "setTextFilter" function.
// So, first we need to import "filters.js", then pass setTextFilter into our
// dispatch call, and pass "e.target.value" to "setTextFilter"
// So now what's going to happen? every single time we take a keystroke, you can
// see that the keyboard actions are indeed being registered correctly

// The goal here is to allow us to change these filters
// Called Controlled Input in React documentation

// Because we change from a statelss function to a class-based component
// we need to access props with "this" word
export class ExpenseListFilters extends React.Component {
  // We need to keep track of calendarFocused which we did in ExpenseForm
  // This is gonna start at "null". It's not gonna be true or false for us
  // it's gonna be null for us or it's gonna be a string. It's gonna be a 
  // string we focuse on the first other two calendars, or the second. We are
  // not gonna do anything with it, we only track it and pass it down to the
  // react-dates component, DateRangePicker
  state = {
      calendarFocused: null
  };
  onDatesChange = ({ startDate, endDate }) => {
      this.props.setStartDate(startDate);
      this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
      this.setState(() => ({ calendarFocused }));
  };
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
    } else if (e.target.value === 'amount') {
        this.props.sortByAmount();
    }
  };
  render () {
    return (
      <div>
      <input
        type="text"
        value={this.props.filters.text}
        onChange={this.onTextChange}
      />
      <select
        value={this.props.filters.sortBy} onChange={this.onSortChange}>
        <option value="date">Date</option>
        <option value="amount">Amount</option>
      </select>
      <DateRangePicker
        startDate={this.props.filters.startDate}
        endDate={this.props.filters.endDate}
        onDatesChange={this.onDatesChange}
        focusedInput={this.state.calendarFocused}
        onFocusChange={this.onFocusChange}
        showClearDates={true}
        numberOfMonths={1}
        isOutsideRange={() => false}
      />
      </div>
    );
  }
};

// const ExpenseListFilters = (props) => (
//     <div>
//         <input 
//             type="text" 
//             value={props.filters.text} 
//             onChange={(e) => {
//                 props.dispatch(setTextFilter(e.target.value));
//                 //console.log(e.target.value);
//             }} 
//             />
//         <select 
//             // Value comes from filters and then sortBy
//             value={props.filters.sortBy} onChange={(e) => {
//             //e.target.value.toLowerCase === "date" ? props.dispatch(sortByDate(e.target.value)) : 
//             //props.dispatch(sortByAmount(e.target.value));
//             if (e.target.value === 'date'){
//                 props.dispatch(sortByDate());
//             } else if (e.target.value === 'amount') {
//                 props.dispatch(sortByAmount());
//             }
//         }}>
//             // put the visible value inside of the option tag. These are the values
//             // that user can see. The "value" props are the ones we use behind the
//             // scenes when we actually track "select" tags for changes
//             // We need to add exact same procbs as above to select that we added
//             // to "input" up above. We have to set the value and hadle the changes
//             // The API for getting this done is exactly the same as it is above
//             // for "text". We also need to set up "onChange" in the API
//             // We'll set the "value" using the exact same prop and then it just picks
//             // which one matches. So if I set the value to date, it'll show date, if
//             // I set the value to amount, it'll show the amount option. 
//             // For "onChange", we access the event argument, "e", and then we access
//             // the "e.target.value" to get the value

//             <option value="date">Date</option>
//             <option value="amount">Amount</option>
//         </select>
//     </div>
// );
//export default ExpenseListFilters;

// What we want off of the store
// This means ExpenseListFilters has the access to the props.filters.text
const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);