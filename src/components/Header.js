import React from "react";
//import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { startLogOut } from "../actions/auth";

// const Header = () => (
//     <header>
//         <h1>Expensify</h1>
//         <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
//         <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
//         <NavLink to="/edit" activeClassName="is-active">Edit Expense</NavLink>
//         <NavLink to="/help" activeClassName="is-active">Help</NavLink>
//     </header>
// );

// For testing porpuses we export Header by name as well
export const Header = ({ startLogOut }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Expensify</h1>
        </Link>
        <button className="button button--link" onClick={startLogOut}>Logout</button>
      </div>
    </div>
  </header>
);

// export const Header = ({ startLogOut }) => (
//   <header>
//       <h1>Expensify</h1>
//       <NavLink to="/dashboard" activeClassName="is-active">Dashboard</NavLink>
//       <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
//       <button onClick={startLogOut}>Logout</button>
//   </header>
// );

//export default Header;

const mapDispatchToProps = (dispatch) => ({
  startLogOut: () => dispatch(startLogOut())
});
export default connect(undefined, mapDispatchToProps)(Header);