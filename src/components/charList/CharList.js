import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import "./charList.scss";
import { useMarvelService } from "../../services/MarvelService";
import { Preloader } from "../preloader/preloader";
import { ErrorMessage } from "../errorMessage/errorMessage"; 
import { TransitionGroup, CSSTransition } from "react-transition-group";


const CharList = (props) => {
  const [chars, setChars] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);
  const{process, setProcess, clearError, getAllCharacters} = useMarvelService();

  const setContent = (process, Component, newItemLoading) => {
    switch (process) {
      case 'waiting':
        return <Preloader />
      case 'loading':
        return newItemLoading ? <Component/> : <Preloader />  
      case 'confirmed':
        return  <Component/>
      case 'error':
        return <ErrorMessage />
      default:
        throw new Error('Unexpected process state');
    }
  }

  useEffect(() => {
    loadCharList(offset, true);
  }, []);

  const loadCharList = (offset, initial) => {
    clearError();
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => setProcess('confirmed'))
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

  const addActiveClass = (e) => {
    e.currentTarget.classList.add("char__item_selected");
  };
  const removeActiveClass = (e) => {
    e.currentTarget.classList.remove("char__item_selected");
  };

  const renderItems = arr => {
    console.log('render');
    const items = chars.map((el) => {
      return (
        <CSSTransition key={el.id} timeout={500} classNames="char__item">
          <li
          tabIndex="0"
          className={"char__item"}
          onMouseEnter={addActiveClass}
          onFocus={addActiveClass}
          onBlur={removeActiveClass}
          onMouseLeave={removeActiveClass}
          onClick={() => props.onCharSelected(el.id)}
          onKeyDown={(e) => {
            return e.keyCode !== 13 || props.onCharSelected(el.id);
          }}
          >
          <img
            src={el.thumbnail}
            style={
              el.thumbnail.includes("image_not_available")
                ? { objectFit: "fill" }
                : null
            }
            alt={el.name}
          />
          <div className="char__name">{el.name}</div>
        </li>
        </CSSTransition>
      );
    })
    return(
      <ul className="char__grid">
        <TransitionGroup component={null}>
          {items}
        </TransitionGroup>        
      </ul>
    )
  }

  const elements = useMemo(() => {
    return setContent(process, () => renderItems(chars), newItemLoading)
  }, [process])

  return (
    <div className="char__list">
      {elements}
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
