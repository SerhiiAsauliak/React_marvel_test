import { Helmet } from 'react-helmet';
import "./singleCharPage.scss";

export const SingleCharPage = ({ data }) => {
  const { name, thumbnail, description } = data;

  return (
    <div className="single-char">
      <Helmet>
        <meta name="description" content={`${name} character`} />
        <title>{name}</title>
      </Helmet>
      <img src={thumbnail} alt={name} className="single-char-img" />
      <div className="single-char__info">
        <h2 className="single-char__name">{name}</h2>
        <p className="single-char__descr">{description}</p>
      </div>
    </div>
  );
};
