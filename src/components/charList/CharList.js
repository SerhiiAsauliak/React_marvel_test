import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./charList.scss";
import { useMarvelService } from "../../services/MarvelService";
import { Preloader } from "../preloader/preloader";
import { ErrorMessage } from "../errorMessage/errorMessage";
import { CharListItem } from "../charListItem/charListItem";

const CharList = (props) => {
  const [chars, setChars] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const{loading, error, clearError, getAllCharacters} = useMarvelService();

  useEffect(() => {
    loadCharList();
  }, []);

  const onCharListLoaded = (chars) => {
    setChars(chars);
    setNewItemLoading((newItemLoading) => false);
  };

  const loadCharList = () => {
    clearError();
    setNewItemLoading((newItemLoading) => true);
    getAllCharacters().then(onCharListLoaded);
  };

  const updateCharList = (offset, initial) => {
    clearError();
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset + 9).then(onCharListUpdated)
  };

  const onCharListUpdated = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    setChars([...chars, ...newCharList]);
    setNewItemLoading((newItemLoading) => false);
    setOffset(offset + 9);
    setCharEnded(ended);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const preloading = loading && newItemLoading ? <Preloader /> : null;
  
  return (
    <div className="char__list">
      {errorMessage}
      {preloading}
      <ul className="char__grid">
        <CharListItem chars={chars} onCharSelected={props.onCharSelected} />
      </ul>
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
        onClick={() => updateCharList(offset, true)}
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
