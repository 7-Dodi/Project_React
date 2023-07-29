import styles from '../Project/Card.module.css';
import {BsFillTrashFill} from 'react-icons/bs'

function ServiceCard({id, name, desciption, cost, handleRemove}){

    const remove = (e)=>{
        e.preventDefault();
        handleRemove(id, cost);
    }

    return(
        <div className={styles.card}>
            <h4>{name}</h4>
            <p>
                <span>Custo total</span> R$ {cost}
            </p>
            <p>{desciption}</p>
            <div className={styles.actions}>
                <button onClick={remove}>
                    <BsFillTrashFill/> Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCard;