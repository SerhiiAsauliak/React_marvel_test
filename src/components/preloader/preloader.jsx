import s from './preloader.module.css';
import preloader from './spinner.svg';


export const Preloader = (props) => {
   return <img className={s.preloader} src={preloader} alt="spinner" />
}

 