import React from "react";
//import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
//import Header from "../components/Header";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import PrivateRoute from "./PrivateRoute";

// By default, when we use BrowserRouter, behind the scenes,
// react router is creating an instance of "browser history",
// and is registering it with our new router
// But we can do it manually by installing a module called
// history (npm history), and we'll be able to use in other
// place in our app
// When we use our own history, we use Router instead of BrowserRouter
export const history = createHistory();
const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" component={LoginPage} exact />
        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>  
);

// const AppRouter = () => (
//   <Router history={history}>
//       <div>
//           <Header/>
//           <Switch>
//               <Route path="/" component={LoginPage} exact />
//               <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
//               <PrivateRoute path="/create" component={AddExpensePage} />
//               <PrivateRoute path="/edit/:id" component={EditExpensePage} />
//               <Route path="/help" component={HelpPage} />
//               <Route component={NotFoundPage} />
//           </Switch>
//       </div>
//   </Router>  
// );

// const AppRouter = () => (
//   <Router history={history}>
//       <div>
//           <Header/>
//           <Switch>
//               <Route path="/" component={LoginPage} exact />
//               <Route path="/dashboard" component={ExpenseDashboardPage} />
//               <Route path="/create" component={AddExpensePage} />
//               <Route path="/edit/:id" component={EditExpensePage} />
//               <Route path="/help" component={HelpPage} />
//               <Route component={NotFoundPage} />
//           </Switch>
//       </div>
//   </Router>  
// );

// const AppRouter = () => (
//   <BrowserRouter>
//       <div>
//           <Header/>
//           <Switch>
//               <Route path="/" component={LoginPage} exact />
//               <Route path="/dashboard" component={ExpenseDashboardPage} />
//               <Route path="/create" component={AddExpensePage} />
//               <Route path="/edit/:id" component={EditExpensePage} />
//               <Route path="/help" component={HelpPage} />
//               <Route component={NotFoundPage} />
//           </Switch>
//       </div>
//   </BrowserRouter>  
// );


export default AppRouter;