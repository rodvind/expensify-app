import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altiFlters } from "../fixtures/filters";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters 
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test('should rendere ExpenseListFilters correctly', () =>{
  expect(wrapper).toMatchSnapshot();
});

// .setProps acts like setState
test('should rendere ExpenseListFilters with alt data correctly', () =>{
  wrapper.setProps({
    filters: altiFlters
  });
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
  const value = 'rent';
  wrapper.find('input').simulate('change', {
    target: { value }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});
test('should sort by date', () => {
  const value = 'date';
  // Firts we change it to sort by amount, as by default is set to date
  wrapper.setProps({
    filters: altiFlters
  });
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(sortByDate).toHaveBeenCalled();
});
test('should sort by amount', () => {
  const value = 'amount';
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(sortByAmount).toHaveBeenCalled();
});
test('should handle date changes', () => {
  const startDate = moment(0).add(4, 'years');
  const endDate = moment(0).add(8, 'years');
  wrapper.find(DateRangePicker).prop('onDatesChange')({ startDate, endDate });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});
test('should handle date focus changes', () => {
  const calendarFocused = 'endDate';
  wrapper.find(DateRangePicker).prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});