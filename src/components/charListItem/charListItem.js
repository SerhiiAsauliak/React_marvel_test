export const CharListItem = ({ chars }) => {
  const addActiveClass = (e) => {
    e.currentTarget.classList.add("char__item_selected");
  };
  const removeActiveClass = (e) => {
    e.currentTarget.classList.remove("char__item_selected");
  };

  return (
    <>
      {chars.map((el) => {
        return (
          <li
            key={el.id}
            className={"char__item"}
            onMouseEnter={addActiveClass}
            onMouseLeave={removeActiveClass}
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
        );
      })}
    </>
  );
};
