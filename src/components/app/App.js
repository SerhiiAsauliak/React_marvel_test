import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import { MarvelService } from "../../services/MarvelService";



const Character = new MarvelService();
Character.getAllCharacters().then(res => {
    res.data.results.forEach(el => {console.log(el.name)});

 });
Character.getCharacter(1011198).then(res => {
    console.log(res.data.results);
 });

const App = () => {
    return (
        <div className="app">
            <AppHeader/>
            <main>
                
                <RandomChar/>
                <div className="char__content">
                    <CharList/>
                    <CharInfo/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;