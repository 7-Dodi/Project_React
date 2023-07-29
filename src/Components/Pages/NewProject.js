import {useNavigate} from 'react-router-dom';

import NewProjectForm from '../Project/NewProjectForm';
import styles from './NewProject.module.css';

function NewProject(){

    const navigate = useNavigate();

    function createProject(project){

        project.cost = 0;
        project.service =[];

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json())
        .then((data)=>{
            console.log(data);
            //requiere
            navigate("/project");
            alert("Projeto criado com sucesso!")
        })
        .catch((err)=>console.log(err))
    }
    

    return(
        <div className={styles.project}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços!</p>
            <NewProjectForm handleChange={createProject} textBtn="Criar Projeto" />
        </div>
    )
}

export default NewProject;