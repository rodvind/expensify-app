// react-test-renderer library allows us to render our components
// inside of just regular JavaScript code and then we
// can assert something about what got rendered
import { shallow } from "enzyme";
//import ReactShallowRenderer from "react-test-renderer/shallow";
import React from "react";
//import toJSON from "enzyme-to-json"; 
//import Header from "../../components/Header";
import { Header } from "../../components/Header";

test('should render Header correctly', () => {
    const wrapper = shallow(<Header startLogOut={() => { }}/>);

    // Create a snapshot based off of the enzyme wrapper
    //expect(wrapper).toMatchSnapshot();
    
    // To make enzyme works with snapshot testing functionality, there
    // one utility library we have to install, since we only want
    // our Header stuffs to be shown in the snapshots' Header.test.js,
    // we don't want this files includes any stuffs from Enzyme library

    // toJSON is going to take the wrapper and it's goint to 
    // extract just the meaningful stuff from rendered output
    //expect(toJSON(wrapper)).toMatchSnapshot();

    // after add serializer to jest.config.test, we can remove
    // toJSON and import for toJSON as it's gonna run automatically
    // and no need to use it explicitely with our wrapper
    expect(wrapper).toMatchSnapshot();

    //expect(wrapper.find('h1').length).toBe(1);
    //expect(wrapper.find('h1').text()).toBe('Expensify');
    // const renderer = new ReactShallowRenderer();
    // renderer.render(<Header />);
    // expect(renderer.getRenderOutput()).toMatchSnapshot();
    //console.log(renderer.getRenderOutput());
});

test('should call startLogout on button click', () => {
  // Use spies
  const startLogOut = jest.fn();
  const wrapper = shallow(<Header startLogOut={startLogOut} />);
  wrapper.find('button').simulate('click');
  expect(startLogOut).toHaveBeenCalled();
});
//test('should call startLogin on button click', () => {});