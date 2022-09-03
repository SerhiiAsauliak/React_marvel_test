import React from 'react';
import PropTypes from 'prop-types'
import { MarvelService } from "../../services/MarvelService";
import './charInfo.scss';
import { Preloader } from "../preloader/preloader";
import { ErrorMessage } from '../errorMessage/errorMessage';
import { Skeleton } from './../skeleton/Skeleton';

export class CharInfo extends React.Component {

    state = {
        char: null,
        loading: false,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevstate) {
        if(this.props.charId !== prevProps.charId){
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props;
        if(!charId){
            return;
        }
        this.onCharLoading();
        this.marvelService
        .getCharacter(charId).then(this.onCharLoaded)
        .catch(this.onError);
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }

    onCharLoading = () => {
        this.setState({loading: true})
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    

    render() {
        const {char, loading, error} = this.state;
        const skeleton = char || null || error ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null;
        const preloading = loading ? <Preloader/> : null;
        const content = !(error || loading || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {preloading}
                {content}
            </div>
        )
    }
    
}

const View = ({char}) => {
    const {name, thumbnail, description, homepage, wiki, comics} = char;

    return (
      <>
        <div className="char__basics">
                    <img src={thumbnail} alt={name} 
                            style={thumbnail.includes('image_not_available')
                             ? {objectFit: 'fill'} : null}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a target={'_blank'} href={homepage} className="button button__main">
                                <div className="inner">Homepage</div>
                            </a>
                            <a target={'_blank'} href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : "This character dont have description..."}
                    {comics.map((el, i) => {
                        if(i >=10){
                            return;
                        }
                        return <li key={i} className="char__comics-item">
                        {el.name}
                    </li>
                    })}
                </ul>
      </>
    );
}

CharInfo.propTypes = {
    charId: PropTypes.number
}