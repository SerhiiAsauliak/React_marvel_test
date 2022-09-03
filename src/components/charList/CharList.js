import React from "react";
import "./charList.scss";
import { MarvelService } from "../../services/MarvelService";
import { Preloader } from "../preloader/preloader";
import { ErrorMessage } from "../errorMessage/errorMessage";
import { CharListItem } from "../charListItem/charListItem";

export class CharList extends React.Component {
  state = {
    chars: [],
    loading: true,
    error: false,
    active: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false
  };

  marvelService = new MarvelService();
  componentDidMount() {
    this.loadCharList();
  }

  onCharListLoading = () => {
    this.setState({ 
      loading: true,
      newItemLoading: true });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  onCharListLoaded = (chars) => {
    this.setState({ 
      chars, 
      loading: false, 
      newItemLoading: false });
  };

  loadCharList = () => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters()
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  updateCharList = (offset) => {
    console.log(offset);
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset + 9)
      .then(this.onCharListUpdated)
      .catch(this.onError);
  };

  onCharListUpdated = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
        ended = true;
    }
    this.setState(({offset, chars}) => ({
        chars: [...chars, ...newCharList],
        loading: false,
        newItemLoading: false,
        offset: offset + 9,
        charEnded: ended
    }))
}

  render() {
    const { chars, loading, error, offset, newItemLoading, charEnded } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const preloading = loading ? <Preloader /> : null;
    const content = !(error || loading) ? 
      <CharListItem chars={chars} onCharSelected={this.props.onCharSelected}/>
      : null;

    return (
      <div className="char__list">
        {errorMessage}
        {preloading}
        <ul className="char__grid">
          {content}
        </ul>
        <button className="button button__main button__long" 
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => this.updateCharList(offset)}
                >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}
