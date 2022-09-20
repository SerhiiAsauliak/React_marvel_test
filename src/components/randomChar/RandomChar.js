import { useMarvelService } from "../../services/MarvelService";
import React, {useEffect, useState} from "react";
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { Preloader } from "../preloader/preloader";
import { ErrorMessage } from '../errorMessage/errorMessage';

export const RandomChar = (props) => {
   
    const {loading, error, getCharacter, clearError} = useMarvelService();
    const [char, setChar] = useState(null);
   
    useEffect(() => {
        updateChar();
    },[])

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id).then(onCharLoaded);
    }

        const errorMessage = error ? <ErrorMessage/> : null;
        const preloading = loading ? <Preloader/> : null;
        const content = !(error || loading || !char) ? <View char={char}/> : null;

        return (
            <div className="randomchar">
               {errorMessage}
               {preloading}
               {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    
}

const View = ({char}) => {
    const {name, thumbnail, description, homepage, wiki} = char;

    return (
      <div className="randomchar__block">
        <img style={thumbnail.includes('image_not_available') ? {objectFit: 'fill'} : null}
              src={thumbnail}
              alt="Random character"
              className="randomchar__img"/>
        <div className="randomchar__info">
          <p className="randomchar__name">{name}</p>
          <p className="randomchar__descr">
            {description
              ? description
              : "This character have no description..."}
          </p>
          <div className="randomchar__btns">
            <a target={'_blank'} href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a target={'_blank'} href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
    );
}




