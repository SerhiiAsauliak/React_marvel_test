import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./charList.scss";
import { useMarvelService } from "../../services/MarvelService";
import { Preloader } from "../preloader/preloader";
import { ErrorMessage } from "../errorMessage/errorMessage";
import { CharListItems } from "../charListItem/CharListItems";

const CharList = (props) => {
  const [chars, setChars] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);
  const{loading, error, clearError, getAllCharacters} = useMarvelService();

  useEffect(() => {
    loadCharList(offset, true);
  }, []);

  const loadCharList = (offset, initial) => {
    clearError();
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset).then(onCharListLoaded)
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    setChars([...chars, ...newCharList]);
    setNewItemLoading(newItemLoading => false);
    setOffset(offset => offset + 9);
    setCharEnded(charEnded => ended);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const preloading = loading && newItemLoading ? <Preloader /> : null;
  
  return (
    <div className="char__list">
      {errorMessage}
      {preloading}
      <ul className="char__grid">
        <CharListItems chars={chars} onCharSelected={props.onCharSelected}/>        
      </ul>
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block"}}
        onClick={() => loadCharList(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
