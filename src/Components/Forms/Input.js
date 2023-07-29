import styles from './Input.module.css';

function Input({type, text, name, placeholder, onHandelChange, value}){

    return(
        <div className={styles.formControler}>
            <label htmlFor={name}>{text}:</label>
            <input type={type} name={name} id={name} placeholder={placeholder} onChange={onHandelChange} value={value}/>
        </div>
    )
}

export default Input;