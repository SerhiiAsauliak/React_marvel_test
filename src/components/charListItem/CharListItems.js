import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../charList/charList.scss"

export const CharListItems = ({ chars, onCharSelected }) => {
  const addActiveClass = (e) => {
    e.currentTarget.classList.add("char__item_selected");
  };
  const removeActiveClass = (e) => {
    e.currentTarget.classList.remove("char__item_selected");
  };

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
        onClick={() => onCharSelected(el.id)}
        onKeyDown={(e) => {
          return e.keyCode !== 13 || onCharSelected(el.id);
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

  return (
    <TransitionGroup component={null}>
      {items}
    </TransitionGroup>
  );
};
