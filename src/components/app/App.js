import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppHeader } from "../appHeader/AppHeader";
import { ComicsPage, MainPage } from "../pages"

export const App = () => {
  
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Switch>
            <Route path="/comics">
              <ComicsPage/>
            </Route>
            <Route path="/">
              <MainPage/>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};
