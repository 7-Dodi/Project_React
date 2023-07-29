import {useState, useEffect} from 'react'

import Input from "../Forms/Input";
import Select from "../Forms/Select";
import SubmitBtn from "../Forms/SubmitBtn";

 function NewProjectForm({handleChange, textBtn, projectData}){
    const [category, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});
    
    useEffect(()=>{ //Consumindo API
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        }).then((resp) =>resp.json())
        .then((data)=> {
             setCategories(data)
        })
        .catch((err)=> console.log(err))
         }, []);

    const submit = (e)=>{
        e.preventDefault();
       handleChange(project);
    }

    function handleOnChange(e){
        setProject({...project, [e.target.name]: e.target.value});
    }

    function handleCategory(e){
        setProject({...project, category:{ 
            id:e.target.value,
            title: e.target.options[e.target.selectedIndex].text,
        }, });
    }
    
    return(
        <form onSubmit={submit}>
            <Input type="text" placeholder="Informe o nome do Projeto" text="Nome do projeto" name="name" onHandelChange={handleOnChange} value={project.name ? project.name : ''}/>
            <Input type="number" placeholder="Informe o orçamento do Projeto" text="Orçamento do projeto" name="getbuy" onHandelChange={handleOnChange} value={project.getbuy ? project.getbuy : ''}/>

            <Select text="Selecione a categoria" name="category_is" options={category} onHandelChange={handleCategory} value={project.category ? project.category.id : '' }/>
            
            <SubmitBtn text={textBtn} />
        </form>
    )
}

export default NewProjectForm