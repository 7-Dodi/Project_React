import {useState, useEffect} from 'react';

import Container from "../Layout/Container";
import LinkButton from "../Layout/LinkButton";
import Loading from '../Layout/Loading';
import styles from "./Project.module.css";
import Card from "../Project/Card";

function Project(){

    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);

    useEffect(()=>{
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        }).then((resp) => resp.json())
        .then((data)=>{
            setProjects(data);
            setRemoveLoading(true);
        })
        .catch((err)=>console.log(err))
    }, []);

    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
            },
        }).then((resp) => resp.json())
        .then((data)=>{
            setProjects(projects.filter((project) => project.id !== id));
            alert("Projeto removido com sucesso!");
        })
        .catch((err)=>console.log(err));
    }

    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newProject" text="Criar projeto"/>
            </div>
            <Container customClass="start">
                {projects.length >0 &&(
                    projects.map((project)=>( <Card
                    id={project.id}
                    name={project.name}
                    buyget={project.getbuy}
                    category={project.category?.title}
                    key={project.id}
                    handleRemove= {removeProject}/>
                    ))
                )}
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos!!!</p>
                )
                }
            </Container>
        </div>
    )
}

export default Project;