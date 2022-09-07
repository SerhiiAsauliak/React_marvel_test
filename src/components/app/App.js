import React from "react";
import { AppHeader } from "../appHeader/AppHeader";
import AppBanner from "../appBanner/AppBanner"
import { RandomChar } from "../randomChar/RandomChar";
import  CharList  from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { ErrorBoundary } from "../errorBoundary/ErrorBoundary";
import decoration from "../../resources/img/vision.png";
import ComicsList from "../comicsList/ComicsList";

export const App = () => {
  const [selectedChar, setChar] = React.useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <div className="app">
      <AppHeader />
      <main>
        <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>
        <div className="char__content">
          <ErrorBoundary>
            <CharList onCharSelected={onCharSelected} />
          </ErrorBoundary>

          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
        {/* <AppBanner/>
        <ComicsList/> */}
      </main>
    </div>
  );
};
