import React, { useState, useEffect } from 'react';
import { useMarvelService } from '../../services/MarvelService';
import { Preloader } from "../preloader/preloader";
import { ErrorMessage } from "../errorMessage/errorMessage";
import './comicsList.scss';
import uw from '../../resources/img/UW.png';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    const {loading, error, request, clearError, getAllComics} = useMarvelService();

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
        setCharEnded(charEnded => ended);
      };  

    const errorMessage = error ? <ErrorMessage /> : null;
    const preloading = loading && newItemLoading ? <Preloader /> : null;  

    return (
      <div className="comics__list">
        {errorMessage}
        {preloading}
        <ul className="comics__grid">
          {comics.map((comics) => {
            return (
              <li key={comics.id} className="comics__item">
                <a href="#">
                  <img
                    src={comics.thumbnail}
                    alt="ultimate war"
                    className="comics__item-img"
                  />
                  <div className="comics__item-name">
                    {comics.name}
                  </div>
                  <div className="comics__item-price">{comics.price}</div>
                </a>
              </li>
            );
          })}
          
        </ul>
        <button className="button button__main button__long" 
                onClick={() => loadComicsList(offset)}
                disabled={newItemLoading}>
          <div className="inner">load more</div>
        </button>
      </div>
    );
}

export default ComicsList;