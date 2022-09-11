import React, { useState, useEffect } from "react";
import "./singleComicPage.scss";
import { useParams, Link } from 'react-router-dom';
import { useMarvelService } from "../../services/MarvelService";
import { Preloader } from "../preloader/preloader";
import { ErrorMessage } from "../errorMessage/errorMessage";

export const SingleComicPage = () => {
   const {comicId} = useParams();
   const [comic,setComic] = useState(null);
   const {loading, error, clearError, getComics} = useMarvelService();
  
    useEffect(() => {
      updateComic();
    }, [comicId]);
  
    const updateComic = () => {
      clearError();
      getComics(comicId).then(onComicLoaded);
    };
  
    const onComicLoaded = (comic) => {
      setComic(comic);
    };

   const errorMessage = error ? <ErrorMessage /> : null;
   const preloading = loading ? <Preloader /> : null;
   const content = !(error || loading || !comic) ? <View comic={comic} /> : null;

   return (
      <>
         {errorMessage}
         {preloading}
         {content}
      </>
   );
};


const View = ({ comic }) => {
  const { name, pageCount, thumbnail, descr, language, price } = comic;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={name} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{descr}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">{language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};