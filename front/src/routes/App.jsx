import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ScrollToTop from './ScrollToTop'; // ajuste o caminho


// Login
import Login from '../paginas/Login_pasta/Login/Login';
import Aluno_login from '../paginas/Login_pasta/Aluno_login/Aluno_login';
import Colab_login from '../paginas/Login_pasta/Colab_login/Colab_login';

// Aluno
import Home from '../paginas/Aluno_pasta/Home/Home';
    // Manifestações
    import Denuncias from '../paginas/Aluno_pasta/Home/Manifestacoes/Denuncias/Denuncias';
    import Elogios from '../paginas/Aluno_pasta/Home/Manifestacoes/Elogios/Elogios';
    import Reclamacoes from '../paginas/Aluno_pasta/Home/Manifestacoes/Reclamacoes/Reclamacoes';
    import Solicitacoes from '../paginas/Aluno_pasta/Home/Manifestacoes/Solicitacoes/Solicitacoes';
    import Sugestoes from '../paginas/Aluno_pasta/Home/Manifestacoes/Sugestoes/Sugestoes';
import Sobre from '../paginas/Aluno_pasta/Sobre/Sobre';
import Contato from '../paginas/Aluno_pasta/Contato/Contato';
import Aluno_perfil from '../paginas/Aluno_pasta/Aluno_perfil/Aluno_perfil';
    import Perfil_M from '../paginas/Aluno_pasta/Aluno_perfil/Perfil_M/Perfil_M';
import Equipe from '../paginas/Aluno_pasta/Equipe/Equipe';

// Colaborador
import Colab_home from '../paginas/Colab_pasta/Colab_home/Colab_home';
import Colab_perfil from '../paginas/Colab_pasta/Colab_perfil/Colab_perfil';
import Colab_sobre from '../paginas/Colab_pasta/Colab_sobre/Colab_sobre';
import Colab_equipe from '../paginas/Colab_pasta/Colab_equipe/Colab_equipe';
    import Colab_el from '../paginas/Colab_pasta/Colab_elogios/C_elogios';
    import Colab_re from '../paginas/Colab_pasta/Colab_reclamacoes/C_reclamacoes';
    import Colab_so from '../paginas/Colab_pasta/Colab_solicitacoes/C_solicitacoes';
    import Colab_su from '../paginas/Colab_pasta/Colab_sugestoes/C_sugestoes';
    import Colab_de from '../paginas/Colab_pasta/Colab_denuncias/C_denuncias';

// Administrador
import Admin_home from '../paginas/Admin_pasta/Admin_home/Admin_home';
import Admin_perfil from '../paginas/Admin_pasta/Admin_perfil/Admin_perfil';





// import Teste from './paginas/Aluno_pasta/Sobre Teste/Sobre';


function App() {

  return (
    <>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        {/* Login */}
        <Route path='/' element={<Login/>}/>
        <Route path='/aluno_login' element={<Aluno_login/>}/>
        <Route path='/colab_login' element={<Colab_login/>}/>

        {/* Aluno */}
        <Route path='/home' element={<Home/>}/>
            {/* Manifestações */}
            <Route path='/manifestacoes/denuncias' element={<Denuncias/>}/>
            <Route path='/manifestacoes/elogios' element={<Elogios/>}/>
            <Route path='/manifestacoes/reclamacoes' element={<Reclamacoes/>}/>
            <Route path='/manifestacoes/solicitacoes' element={<Solicitacoes/>}/>
            <Route path='/manifestacoes/sugestoes' element={<Sugestoes/>}/>
        <Route path='/sobre' element={<Sobre/>}/>
        <Route path='/contato' element={<Contato/>}/>
        <Route path='/aluno_perfil' element={<Aluno_perfil/>}/>
                <Route path='/aluno_perfil/manifestacoes' element={<Perfil_M/>}/>
        <Route path='/equipe' element={<Equipe/>}/>

        {/* Colaborador */}
        <Route path='/colab_home' element={<Colab_home/>}/>
            {/* Manifestações */}
            <Route path='/colab/manifestacoes/denuncias' element={<Colab_de/>}/>
            <Route path='/colab/manifestacoes/elogios' element={<Colab_el/>}/>
            <Route path='/colab/manifestacoes/reclamacoes' element={<Colab_re/>}/>
            <Route path='/colab/manifestacoes/solicitacoes' element={<Colab_so/>}/>
            <Route path='/colab/manifestacoes/sugestoes' element={<Colab_su/>}/>
        <Route path='/colab_perfil' element={<Colab_perfil/>}/>
        <Route path='/colab_sobre' element={<Colab_sobre/>}/>
        <Route path='/colab_equipe' element={<Colab_equipe/>}/>

        {/* Admin */}
        <Route path='/admin_home' element={<Admin_home/>}/>
        <Route path='/admin_perfil' element={<Admin_perfil/>}/>

        {/* <Route path='/teste' element={<Teste/>}/> */}

        <Route path='*' element={<h1>Not found</h1>}/>
      </Routes>    
    </BrowserRouter>
    </>
  );
}

export default App