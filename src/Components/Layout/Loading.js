import style from './Loading.module.css';
import loading from '../../img/loading.svg';

function Loading(){
    return(
        <div className={style.load}>
            <img className={style.loader} src={loading} alt='Loading...'/>
        </div>
    )
}

export default Loading;