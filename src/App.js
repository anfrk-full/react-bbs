import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './bbs/component/pages/HomePage';
import BbsWritePage from './bbs/component/pages/BbsWritePage';
import BbsViewPage from './bbs/component/pages/BbsViewPage';
import BbsUpdatePage from './bbs/component/pages/BbsUpdatePage';
import './App.css';

function App() {
     return (
    
        <BrowserRouter>
            <h2>React BBS Project</h2>
            <Routes>
                <Route path='/' element={ <HomePage/> }></Route>
                <Route path='/bbs-write' element={ <BbsWritePage/> }></Route>
                <Route path='/bbs-view/:id' element={ <BbsViewPage/> }></Route>
                <Route path='/bbs-update/:id' element={ <BbsUpdatePage/> }></Route>
            </Routes>
        </BrowserRouter>

    );
}

export default App;
