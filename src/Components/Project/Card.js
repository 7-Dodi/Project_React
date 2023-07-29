import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import {BsPencil, BsFillTrashFill} from 'react-icons/bs';

function Card({id, name, buyget, category, handleRemove}){

    const remove = (e)=>{
        e.preventDefault();
        handleRemove(id);
    }

    return(
        <div className={styles.card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span> R$ {buyget}
            </p>
            <p className={styles.text}>
                <span className={`${styles[category]}`}></span>{category}
            </p>
            <div className={styles.actions}>
                <Link to={`/editProject/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill/> Excluir
                </button>
            </div>
        </div>
    )
}

export default Card;