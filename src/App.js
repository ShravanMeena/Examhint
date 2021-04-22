import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./pages/Home";

import Dashboard from "./pages/admin/Dashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateSubCategory from "./pages/admin/CreateSubCategory";
import CreatePaper from "./pages/admin/CreatePaper";
import SubCategory from "./pages/SubCategory";
import Years from "./pages/Years";
import AllYears from "./pages/AllYears";
import Papers from "./pages/Papers";
import CreateYear from "./pages/admin/CreateYear";
import CreateStreamCategory from "./pages/admin/CreateStreamCategory";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
// import SectionPage from "./pages/SectionPage";
import Header from "../src/component/Header";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/home' component={Home} />
          {/* <Route path='/section' component={SectionPage} /> */}
          <Route path='/category/:id' component={SubCategory} />
          <Route path='/sub/category/:id' component={Years} />
          <Route path='/by/:year' component={Papers} />
          <Route path='/all-years/:id' component={AllYears} />
          <Route exact path='/login' component={Login} />

          {JSON.parse(localStorage.getItem("verify")) ? (
            <>
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/create/category' component={CreateCategory} />
              <Route path='/create/stream' component={CreateStreamCategory} />
              <Route
                path='/create/sub/category'
                component={CreateSubCategory}
              />
              <Route path='/create/paper' component={CreatePaper} />
              <Route path='/create/year' component={CreateYear} />
            </>
          ) : (
            <>
              <Redirect to='/login' />
            </>
          )}
        </Switch>
      </Router>
    );
  }
}
