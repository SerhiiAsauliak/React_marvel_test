import React, { useState, useEffect } from 'react';
import { useMarvelService } from '../../services/MarvelService';
import { Preloader } from "../preloader/preloader";
import { ErrorMessage } from "../errorMessage/errorMessage";
import { Link } from "react-router-dom";

import './comicsList.scss';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);
    const {clearError, process, setProcess, getAllComics} = useMarvelService();

    useEffect(() => {
        loadComicsList(offset, true);
    },[]);

    const loadComicsList = (offset, initial) => {
        clearError();
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
        .then(onComicsListLoaded)
        .then(() => setProcess('confirmed'));
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

    const setContent = (process, Component, newItemLoading) => {
      switch (process) {
        case 'waiting':
          return <Preloader />
        case 'loading':
          return newItemLoading ? <Component/> : <Preloader />
        case 'confirmed':
          return <Component/>
        case 'error':
          return <ErrorMessage />
        default:
          throw new Error('Unexpected process state');
      }
    }
    function renderItems(arr) {
      const items = arr.map((comics, i) => {
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
      })
      
      return(
        <ul className="comics__grid">
          {items}
        </ul>
      )
    }

    return (
      <div className="comics__list">
        {setContent(process, () => renderItems(comics), newItemLoading)};        
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