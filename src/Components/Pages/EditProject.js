import {parse, v4 as uuidv4} from 'uuid';

import style from './EditProject.module.css';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Loading from '../Layout/Loading';
import Container from '../Layout/Container';
import NewProjectForm from '../Project/NewProjectForm';
import FormService from '../Service/FormService';
import ServiceCard from '../Service/ServiceCard';

function EditProject(){

    const {id} = useParams();
    
    const [project, setProject] = useState([]);
    const [service, setService] = useState([]);
    const [showClick, setShowClick] = useState(false);
    const [showService, setShowService] = useState(false);

    useEffect(()=>{
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        }).then((resp) => resp.json())
        .then((data)=>{
            setProject(data);
            setService(data.service);
        })
        .catch((err)=>console.log(err));
    });

    function showClickButton(){
        setShowClick(!showClick);
    }

    function editPost(project){
        if(project.getbuy < project.cost){
            alert("Alteração inválida. Valor do orçamento não pode ser menor que os custos");
        }

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json())
        .then((data)=>{
            setProject(data);
            setShowClick(!showClick);
            alert("Dados alterados!");
        })
        .catch((err)=>console.log(err));
    }

    function toglleService(){
        setShowService(!showService);
    }

    function createService(project){
        const last = project.service[project.service.length -1];
        last.id = uuidv4();

        const lastCost = last.cost;
        const newCost = parseFloat(project.cost) + parseFloat(lastCost);

        if(newCost > parseFloat(project.getbuy)){
            alert("Erro, valor do orçamento é insuficiente.");
            project.service.pop();
            return false;
        }

        project.cost = newCost;

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then((resp) =>resp.json())
        .then((data)=> {
             alert("Serviço adicionado.");
             setShowService(false);
        })
        .catch((err)=> console.log(err))

    }

    function removeService(id, cost){
        const updateFilter = project.service.filter((item) =>(item.id !== id));
        const projectUpdate = project;
        projectUpdate.service = updateFilter;

        projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost);

        fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdate),
        }).then((resp) =>resp.json())
        .then((data)=> {
             setProject(projectUpdate);
             setService(updateFilter);
             alert("Serviço removido.");
        })
        .catch((err)=> console.log(err))

    }

    return(
        <>
        {project.name ? (
            <div className={style.details}>
                <Container customClass="column">
                    <div className={style.container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={style.btn} onClick={showClickButton}>{!showClick ? 'Editar Projeto': 'Fechar'}</button>
                        {!showClick ? (
                            <div className={style.info}>
                                <p><span>Categoria:</span> {project.category?.title}</p>
                                <p><span>Orçamento:</span> R$ {project.getbuy}</p>
                                <p><span>Utilizado:</span> R$ {project.cost}</p>
                            </div>
                        ): (
                            <div className={style.info}>
                                <NewProjectForm handleChange={editPost} textBtn="Concluir Edição" projectData={project}/>
                            </div>
                        )}
                    </div>
                    <div className={style.formConteiner}>
                        <h2>Serviços:</h2>
                        <button className={style.btn} onClick={toglleService}>{!showService? 'Adicionar serviço': 'Fechar'}</button>
                        {showService && (
                            <div className={style.info}>
                                <FormService projectData={project} textBtn="Adicionar serviço" handleSubmit={createService}/>
                            </div>
                        )}
                    </div>
                    <h2>Itens de serviço:</h2>
                    <Container customClass="start">
                        {service.length > 0 &&
                            service.map((item) => (
                                <ServiceCard
                                    id={item.id}
                                    name={item.name}
                                    desciption={item.desciption}
                                    cost={item.cost}
                                    key={item.id}
                                    handleRemove={removeService}
                                />
                            ) )
                        }
                        {service.length === 0 && <p>Não há serviços cadastrados.</p>}
                    </Container>
                </Container>
            </div>
        ) : (
            <Loading/>
        )}
        </>
    )
}

export default EditProject;