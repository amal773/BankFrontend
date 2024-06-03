import logo from './logo.svg';
import './App.css';
import CrudOperation from './CRUD/crudOperation';
import Navbar from './Components/Navbar/navbar';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <CrudOperation/>
      <Footer/>
    </div>
  );
}

export default App;
