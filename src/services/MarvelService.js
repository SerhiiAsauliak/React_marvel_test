import { useHttp } from "../components/hooks/http.hook";

export const useMarvelService = () => {
  const {loading, error, request, clearError} = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  // _apiKey = `apikey=${process.env.REACT_APP_MARVEL_API_KEY}`;
  const _apiKey = `apikey=1fb08867ed447846e91a633ef22365b7`;
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
   const res = await request(
      `${_apiBase}characters?limit=9&&offset=${offset}&${_apiKey}`);
      return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
   const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
   return _transformCharacter(res.data.results[0]);
  };
 
  const _transformCharacter = (char) => { 
   return {
      id: char.id,
      name: char.name,
      description: char.description.length > 150 ? char.description.slice(1, 150) + '...' : char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[1].url,
      wiki: char.urls[0].url,
      comics: char.comics.items
    };
  };

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}comics?limit=8&&offset=${offset}&${_apiKey}`);
    return res.data.results.map(el => _transformComics(el));
    // return res.data.results;
  }
  
  const _transformComics = (comics) => { 
    return {
       id: comics.id,
       name: comics.title,
       price: comics.prices[0].price,
       thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
     };
   };

  return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics};
}

