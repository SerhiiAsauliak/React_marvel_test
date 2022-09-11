import React, { useState, useEffect } from 'react';
import { useMarvelService } from '../../services/MarvelService';
import { Preloader } from "../preloader/preloader";
import { ErrorMessage } from "../errorMessage/errorMessage";
import { Link } from "react-router-dom"

import './comicsList.scss';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);
    const {loading, error, clearError, getAllComics} = useMarvelService();

    useEffect(() => {
        loadComicsList(offset, true);
    },[]);

    const loadComicsList = (offset, initial) => {
        clearError();
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset).then(onComicsListLoaded);
      };

      const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
          ended = true;
        }
        setComics([...comics, ...newComicsList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnded(comicsEnded => ended);
      };  

    const errorMessage = error ? <ErrorMessage /> : null;
    const preloading = loading && newItemLoading ? <Preloader /> : null;  

    return (
      <div className="comics__list">
        {errorMessage}
        {preloading}
        <ul className="comics__grid">
          {comics.map((comics, i) => {
            return (
              <li key={i} className="comics__item">
                <Link to={`/comics/${comics.id}`}>
                  <img
                    src={comics.thumbnail}
                    alt="ultimate war"
                    className="comics__item-img"
                  />
                  <div className="comics__item-name">
                    {comics.name}
                  </div>
                  <div className="comics__item-price">{comics.price}</div>
                </Link>
              </li>
            );
          })}
        </ul>
        <button className="button button__main button__long" 
                onClick={() => loadComicsList(offset)}
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                disabled={newItemLoading}>
          <div className="inner">load more</div>
        </button>
      </div>
    );
}

export default ComicsList;