import'./public/content.css'
import{BrowserRouter,Route,Routes}from 'react-router-dom'
import Homepublic from './pages/homepublic/homepublic';
import Homeadmin from './pages/admin/home';

function App() {

 
  return (
    <div className="App">
    <BrowserRouter>
   
     <Routes>
    
      <Route path='/*'  element={<Homepublic/>}/>
      <Route path='/admin/*' element={<Homeadmin/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;
