import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppHeader } from "../appHeader/AppHeader";
import { ComicsPage, MainPage, Page404, SingleComicPage, SingleCharPage } from "../pages"

export const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/comics" element={<ComicsPage/>} />
            <Route path="/comics/:comicId" element={<SingleComicPage/>} />
            <Route path="/characters/:charId" element={<SingleCharPage/>} />
            <Route path="*" element={<Page404/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};
