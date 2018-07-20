'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const obj = {
//     name: "Rod",
//     getName() {
//         return this.name;
//     },
//     age: 34
// };
// const getName = obj.getName.bind(obj);
// const getName = obj.getName.bind({name:'Andrew'});
// console.log(getName());

// const jsx = (
//     <div>
//         <Header />
//         <Action />
//         <Options />
//         <AddOption />

//     </div>
// );

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);
        _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
        _this.state = {
            // Now that we get options from users we don't need to set it to
            // props.options, we can set it to an empty array
            // options: props.options
            options: []
        };
        return _this;
    }

    ///////////// Lifecycle Methods /////////////
    // They are only available in Class-based Components


    _createClass(IndecisionApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            // We need to catch if it is a bad data, not JSON data,
            // inside the options. We want to catch it before it crashes
            // our app
            try {
                var json = localStorage.getItem('options');
                var options = JSON.parse(json);

                // get the data fron localStorage and by using state
                // show it to the screen each time we refresh the page
                // we have our options appear on the page after each refresh

                // check to see if the options is not null
                if (options) {
                    this.setState(function () {
                        return { options: options };
                    });
                }
            } catch (error) {}
            // Do nothing at all if it catches the error
            // if the JSON is not valid, we want to use th 
            // default empty array

            //console.log('fetching data');
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            // localStorage is a key-value store which only works with strings
            // To store an array or object with use JSON data
            // JSON is just a string representation of JavaScript object or an array

            // Use a conditon to check if the options array length changes
            if (prevState.options.length !== this.state.options.length) {
                //console.log ('saving data');
                var json = JSON.stringify(this.state.options);
                localStorage.setItem('options', json);
            }
        }
        // use ReactDOM.render(React.createElement('p'), document.getElementById('app'));
        // Google dev Console

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            console.log('componentDidUnmount');
        }
        ////////////////////////////////////////////

    }, {
        key: 'handleDeleteOptions',
        value: function handleDeleteOptions() {
            // this.setState(() => {
            //     return {
            //         options: []
            //     };
            // });

            // New version this.setState arrow function
            // For returning an object with an arrow function, we can:
            this.setState(function () {
                return { options: [] };
            });
        }

        // A method to remove a sigle option, take an option as the argument
        // We're gonna pass this method to the <Options/>, as we don't have
        // access to Option, and then we're allowing <Options/> pass that in
        // to Option (as it is its child)
        // Event-handlers methods, like the one down below, get called with
        // the event object. We don't event object, we want the optionText instead
        // The first way is to change how Option works

    }, {
        key: 'handleDeleteOption',
        value: function handleDeleteOption(optionToRemove) {
            //console.log('hdo', option);
            this.setState(function (prevState) {
                return {
                    options: prevState.options.filter(function (opt) {
                        return optionToRemove !== opt;
                    }
                    //return optionToRemove !== opt;
                    )
                };
            });
        }
    }, {
        key: 'handlePick',
        value: function handlePick() {
            var randomNum = Math.floor(Math.random() * this.state.options.length);
            var option = this.state.options[randomNum];
            alert(option);
        }
    }, {
        key: 'handleAddOption',
        value: function handleAddOption(option) {
            // We need to add some validation to handleAddOption
            // First, check if the user enter an empty string
            // and it runs if there is an empty string is entered
            if (!option) {
                return 'Enter valid value to add item';
            } else if (this.state.options.indexOf(option) > -1) {
                //Check if the option already exist
                // if this is true it means that we found a match and item already exists
                return 'This option already exists';
            }
            // we can go with the else and put following lines of codes inside of it
            // but if one of the previous two conditions run, rest of the code 
            // never run, because of the "return" which if runs prevents running rest of the code
            //this.setState((prevState) => {
            // We don't want to change the previous State
            // if we use the following code previous state will change
            // instead of push, we use concat method
            // prevState.options.push(option);
            //return {
            // we can also add non-array option and is has the 
            // exact same affect as [option] array
            // options: prevState.options.concat(option)
            //options: prevState.options.concat([option])
            //options: prevState.options

            //};
            //});

            // New version this.setState arrow function
            this.setState(function (prevState) {
                return { options: prevState.options.concat(option) };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            //Props are like attribute in HTML, and we can
            // call them whatever we want
            // we can access them inside the class with "this"
            // const title = 'Indecision App';
            var subtitle = 'Put your life in the hands of a computer';
            //const options = ['Thing one', 'Thing two', 'Thing four'];
            return React.createElement(
                'div',
                null,
                React.createElement(Header, { subtitle: subtitle }),
                React.createElement(Action, {
                    hasOptions: this.state.options.length > 0,
                    handlePick: this.handlePick
                }),
                React.createElement(Options, {
                    options: this.state.options
                    // prop only gives us one-way access
                    // from parents to children. To have access from children
                    // parents we create function and pass them as props
                    // we define a new prop caleed handleDeleteOptions and sets it
                    // equals to the function handleDeleteOptions we created up in
                    // IndecisionApp class
                    , handleDeleteOptions: this.handleDeleteOptions,
                    handleDeleteOption: this.handleDeleteOption
                }),
                React.createElement(AddOption, {
                    handleAddOption: this.handleAddOption
                })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

// We can pass in options down below in:
// ReactDOM.render(<IndecisionApp options={['Thing one', 'Thing two']} />, document.getElementById('app'));
// The ability to pass on some options is really useful feature
// Now that we get the options from users we don't need default value
// IndecisionApp.defaultProps = {
//     options: []
// };
/////////////////////////////////////////////////////
// Class-based Components
// class Header extends React.Component {
//     render() {
//         return (
//             <div>
//                 <h1>{this.props.title}</h1>
//                 <h2>{this.props.subtitle}</h2>
//             </div>
//         );
//     }
// }

// class Action extends React.Component {
//     // handlePick(){
//     //     alert('handlePick');
//     // }
//     render () {
//         return (
//             <div>
//                 <button 
//                     onClick={this.props.handlePick}
//                     disabled={!this.props.hasOptions}
//                 >
//                 What Should I do?</button>
//             </div>
//         );
//     }
// }

// class Options extends React.Component {
//     render() {
//         return (
//             <div>
//                 {this.props.options.map((op) => <p key={op}>{op}</p>)}
//                 <Option />
//             </div>
//         );
//     }
// }

// class Options extends React.Component {
//     // constructor(props) {
//     //     super(props);
//     //     this.handleRemoveAll = this.handleRemoveAll.bind(this);
//     // }
//     // handleRemoveAll() {
//     //     //alert('All gone!');
//     //     console.log(this.props.options);
//     // }
//     render() {
//         return (
//             <div>
//                 <button onClick={this.props.handleDeleteOptions}>Remove All</button>
//                 {
//                     this.props.options.map((op) =><Option key={op} optionText={op}/>)
//                 }
//             </div>
//         );
//     }
// }

// class Option extends React.Component {
//     render() {
//         return (
//             <div>
//                 <p>{this.props.optionText}</p>
//             </div>
//         );
//     }
// }
//////////////////////////////////////////////////////

// stateless funcational component
// in stateless function we don't have access to "this"
// const User = (props) => {
//     return (
//         <div>
//             <P></P>
//             <P></P>
//         </div>
//     );
// };


var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        ),
        props.subtitle && React.createElement(
            'h2',
            null,
            props.subtitle
        )
    );
};

// Define default props value which is on object
Header.defaultProps = {
    title: 'Indecision'
};
var Action = function Action(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            {
                onClick: props.handlePick,
                disabled: !props.hasOptions
            },
            'What Should I do?'
        )
    );
};

var Options = function Options(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: props.handleDeleteOptions },
            'Remove All'
        ),
        props.options.length === 0 && React.createElement(
            'p',
            null,
            'Please add an option to get started'
        ),
        props.options.map(function (op) {
            return React.createElement(Option, {
                key: op,
                optionText: op,
                handleDeleteOption: props.handleDeleteOption
            });
        })
    );
};

// The first way is to change how Option works to get optionText
// Instead of passing props.handleDeleteOption, we define an
// inline arrow function

var Option = function Option(props) {
    return React.createElement(
        'div',
        null,
        props.optionText,
        React.createElement(
            'button',
            {
                onClick: function onClick(e) {
                    props.handleDeleteOption(props.optionText);
                }
            },
            'Remove'
        )
    );
};

// Class-Based Component

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
        // We're gonna introduce here component state, and state in here
        // because the error message is specific to this form
        // it's the only place need to live
        // so we're going to set default value here, to undefined
        // by default, there will be no error
        // the user hasn't submitted the form and we won't 
        // actually render a message
        _this2.state = {
            error: undefined
        };
        return _this2;
    }

    _createClass(AddOption, [{
        key: 'handleAddOption',
        value: function handleAddOption(e) {
            e.preventDefault();

            var opt = e.target.elements.user.value.trim();
            // potential error message, set it to whatever comes (return) back
            // if nothing comes back, it shows everything wokrs well
            // if an error comes back we're gonna figure out how
            // we can show that to the screen
            var error = this.props.handleAddOption(opt);

            // no longer need this condition as it is handled
            // in hadnleAddOption in indecisionApp. We
            // only need this.props.handleAddOption(opt);
            // if (opt) {
            //     this.props.handleAddOption(opt);
            // }

            // so when they submitted a form with an error, we're gonna
            // go ahead and update the error state

            //this.setState(() => {
            // We don't need the previous state, we only need to access
            // to the error
            //error: error
            //return {
            // In ES6, we have an object-shorthand. Whenever we have
            // a property whose values come from a variable with the exact same name
            // we can actually leave it off like this:
            //error
            //};
            //});

            // New version this.setState arrow function
            this.setState(function () {
                return { error: error };
            });

            // Clear option field input, after valid data being entered
            if (!error) {
                e.target.elements.user.value = '';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return (
                // If either we have an error or undefined, we'll set it here
                React.createElement(
                    'div',
                    null,
                    this.state.error && React.createElement(
                        'p',
                        null,
                        this.state.error
                    ),
                    React.createElement(
                        'form',
                        { onSubmit: this.handleAddOption },
                        React.createElement('input', { type: 'text', name: 'user' }),
                        React.createElement(
                            'button',
                            null,
                            'Add Option'
                        )
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

// We use IndecisionApp instead of const jsx to render it direcly
// in the ReanderDOM.render()


ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
