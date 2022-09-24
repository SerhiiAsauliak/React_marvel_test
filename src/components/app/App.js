import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppHeader } from "../appHeader/AppHeader";
import { ComicsPage, MainPage, Page404, SinglePage } from "../pages";
import {SingleCharPage} from "../pages/singleCharacterPage/SingleCharPage"
import {SingleComicPage} from "../pages/singleComicLayout/SingleComicPage"


export const App = () => {
  
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/comics" element={<ComicsPage/>} />
            <Route path="/comics/:id" element={<SinglePage Component={SingleComicPage} dataType='comic'/>} />
            <Route path="/characters/:id" element={<SinglePage Component={SingleCharPage} dataType='character'/>} />
            <Route path="*" element={<Page404/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};
