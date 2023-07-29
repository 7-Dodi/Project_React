import styles from './Select.module.css';

function Select({text, name, options, onHandelChange, value}){

    return(
        <div className={styles.selectControler}>
           <label htmlFor={name}>{text}:</label>
           <select name={name} id={name} onChange={onHandelChange} value={value || ''}>
                <option>Selecione uma opção</option>
                {options.map((option)=>(
                    <option value={option.id} key={option.id}>{option.title}</option>
                ))}
           </select>
        </div>
    )
}

export default Select;