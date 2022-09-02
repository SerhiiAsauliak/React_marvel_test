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
  };

  marvelService = new MarvelService();
  componentDidMount() {
    this.updateCharList();
  }

  onCharListLoading = () => {
    this.setState({ loading: true });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  onCharListLoaded = (chars) => {
    this.setState({ chars, loading: false });
  };

  updateCharList = () => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters()
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  render() {
    const { chars, loading, error } = this.state;
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
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}
