import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMarvelService } from "../../services/MarvelService";
import "./charInfo.scss";
import { setContent } from './../utils/setContent';

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const {clearError, process, setProcess, getCharacter} = useMarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    clearError();
    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'));
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  return (
    <div className="char__info">
      {setContent(process, View, char)}
    </div>
  );
};

const View = ({ data }) => {
  const { name, thumbnail, description, homepage, wiki, comics } = data;

  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt={name}
          style={
            thumbnail.includes("image_not_available")
              ? { objectFit: "fill" }
              : null
          }
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a
              target={"_blank"}
              href={homepage}
              className="button button__main"
            >
              <div className="inner">Homepage</div>
            </a>
            <a
              target={"_blank"}
              href={wiki}
              className="button button__secondary"
            >
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "This character dont have description..."}
        {comics.map((el, i) => {
          if (i >= 10) {
            return;
          }
          return (
            <li key={i} className="char__comics-item">
              {el.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;

CharInfo.propTypes = {
  charId: PropTypes.number,
};
