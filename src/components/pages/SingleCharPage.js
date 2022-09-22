import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { useMarvelService } from "../../services/MarvelService";
import { Preloader } from "../preloader/preloader";
import { ErrorMessage } from "../errorMessage/errorMessage";
import "./singleCharPage.scss"
import AppBanner from './../appBanner/AppBanner';


export const SingleCharPage = () => {
   const {charId} = useParams();
   const [char,setChar] = useState(null);
   const {loading, error, clearError, getCharacter} = useMarvelService();

   useEffect(() => {
      updateChar();
   }, [charId]);

   const updateChar = () => {
      clearError();
      getCharacter(charId).then(onCharLoaded);
   };

   const onCharLoaded = (char) => {
      setChar(char);
   };
   
   const errorMessage = error ? <ErrorMessage /> : null;
   const preloading = loading ? <Preloader /> : null;
   const content = !(error || loading || !char) ? <View char={char} /> : null;

   return( 
      <>
         <AppBanner/>
         {errorMessage}
         {preloading}
         {content}
      </>
   )
}

const View = ({ char }) => {
   const { name, thumbnail, description} = char;
   
   return (
     <div className="single-char">
       <img src={thumbnail} alt={name} className="single-char-img" />
       <div className="single-char__info">
         <h2 className="single-char__name">{name}</h2>
         <p className="single-char__descr">{description}</p>
       </div>
     </div>
   );
 };