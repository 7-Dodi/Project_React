import savings from '../../img/savings.svg';
import LinkButton from '../Layout/LinkButton';
import styles from './HomePage.module.css';
function HomePage(){

    return(
        <section className={styles.home}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to="/newProject" text="Criar projeto"/>
            <img src={savings} alt='Costs'/>
        </section>
    )
}

export default HomePage;