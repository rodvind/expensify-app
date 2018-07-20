// Higher Order Component (HOC) - A component (HOC) that renders another component
// Advantages of using HOC:
// Reuse code
// Render hijacking
// Prop manipulation
// Abstract state
import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

// This function is gonna get called with the component that we want to wrap (render)
// The component that we retun is a new component, and it is the HOC
// We can use SPREAD operator to be able to pass props to our HOC component. When
// we're instantiating a component inside of the JSX we can actully use a JS expression
// and we can spread out any given object we like (in our case, props). This has
// the effect of taking every key-value pair of that object, and passing them 
// down as props, in our case there is only "info=There are the details"
// We can also pass special props into HOC, for instance whether we should show
// the message if the user is not an admin, isAdmin, a boolean prop
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAdmin && <p>This is private info. Please don't share!</p> }
            <WrappedComponent {...props} />
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {/* !!props.isAuthenticated && <p>Please sign in to see the info</p> */}
            {props.isAuthenticated ? (
                <WrappedComponent {...props} />
            ) : (
                <p>Please log in to view the info</p>
            )}
            
        </div>
    );
};

// Argument,is the component we want to wrap, and is gonna be the alternative
// version of our components - Higher Order Component
const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<Info info="These are the details" />, document.getElementById('app'));
//ReactDOM.render(<AdminInfo isAdmin={true} info="There are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="There are the details" />, document.getElementById('app'));
