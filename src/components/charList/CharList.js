import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./charList.scss";
import { MarvelService } from "../../services/MarvelService";
import { Preloader } from "../preloader/preloader";
import { ErrorMessage } from "../errorMessage/errorMessage";
import { CharListItem } from "../charListItem/charListItem";

const CharList = (props) => {
  const [chars, setChars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [active, setActive] = useState(false);
  const [newItemLoading, setNewItemLoading] = React.useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    loadCharList();
  }, []);

  const onCharListLoading = () => {
    setLoading((loading) => true);
    setNewItemLoading((newItemLoading) => true);
  };

  const onError = () => {
    setLoading((loading) => false);
    setError(true);
  };

  const onCharListLoaded = (chars) => {
    setChars(chars);
    setLoading((loading) => false);
    setNewItemLoading((newItemLoading) => false);
  };

  const loadCharList = () => {
    onCharListLoading();
    marvelService.getAllCharacters().then(onCharListLoaded).catch(onError);
  };

  const updateCharList = (offset) => {
    onCharListLoading();
    marvelService
      .getAllCharacters(offset + 9)
      .then(onCharListUpdated)
      .catch(onError);
  };

  const onCharListUpdated = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    setChars([...chars, ...newCharList]);
    setLoading((loading) => false);
    setNewItemLoading((newItemLoading) => false);
    setOffset(offset + 9);
    setCharEnded(ended);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const preloading = loading ? <Preloader /> : null;
  const content = !(error || loading) ? (
    <CharListItem chars={chars} onCharSelected={props.onCharSelected} />
  ) : null;

  return (
    <div className="char__list">
      {errorMessage}
      {preloading}
      <ul className="char__grid">{content}</ul>
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
        onClick={() => updateCharList(offset)}
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
