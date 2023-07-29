import {useState} from 'react'

import styles from '../Pages/Project.module.css';
import Input from '../Forms/Input';
import SubmitBtn from '../Forms/SubmitBtn';

function FormService({handleSubmit, textBtn, projectData}){

    const [service, setService] = useState({});
    
    function submit(e){
        e.preventDefault();
        projectData.service.push(service);
        handleSubmit(projectData);
    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value});
    }

    return(
        <form onSubmit={submit} className={styles.container}>
            <Input type="text" text="Nome do serviço" name="name" placeholder="Informe o serviço" onHandelChange={handleChange}/>
            <Input type="number" text="Valor do serviço" name="cost" placeholder="Informe o valor do serviço" onHandelChange={handleChange}/>
            <Input type="text" text="Descrição do serviço" name="desciption" placeholder="Descreva o serviço" onHandelChange={handleChange}/>
            <SubmitBtn text={textBtn}/>
        </form>
    )
}

export default FormService;