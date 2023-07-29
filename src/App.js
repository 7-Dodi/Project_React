import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './Components/Pages/HomePage';
import NewProject from './Components/Pages/NewProject';
import Company from './Components/Pages/Company';
import Contact from './Components/Pages/Contact';
import Project from './Components/Pages/Project';

import Container from './Components/Layout/Container';
import NavBar from './Components/Layout/NavBar';
import Footer from './Components/Layout/Footer';
import EditProject from './Components/Pages/EditProject';

function App() {

  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route exact path='/' element={<Container customClass="min-height"><HomePage /></Container>} />
          <Route path='/project' element={<Container customClass="min-height"><Project /></Container>} />
          <Route path='/newProject' element={<Container customClass="min-height"><NewProject /></Container>} />
          <Route path='/company' element={<Container customClass="min-height"><Company /></Container>} />
          <Route path='/contact' element={<Container customClass="min-height"><Contact /></Container>} />
          <Route path='/editProject/:id' element={<Container customClass="min-height"><EditProject /></Container>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
