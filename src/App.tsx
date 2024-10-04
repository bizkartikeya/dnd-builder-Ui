import './App.css'
import DesignerContextProvider from './components/context/DesignerContext'
import Formbuilder from './components/Formbuilder'
import NavBar from './components/NavBar'

function App() {

  return (
    <DesignerContextProvider>
      <NavBar/>
      <Formbuilder/>
    </DesignerContextProvider>
  )
}

export default App
