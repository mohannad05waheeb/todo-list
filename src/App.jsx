import TodoList from "./components/TodoList";
import './App.css'; 
import { createTheme , ThemeProvider } from "@mui/material/styles"; 
import todosContext from "./contexts/todosContext";  
import { useState } from "react"; 
const theme = createTheme({
  typography: {
    fontFamily: ['Alexandria'],
  } ,
    palette: {
    primary: {
      main: '#dd2c00'
    }
  }
})   
// Initial todos
const initialTodos = [ 
];
function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <ThemeProvider theme={theme}>
    <div style={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      height: '100vh',
      backgroundColor: '#191f1b',     
      direction: 'rtl'
      }}> 
      <todosContext.Provider value={{todos , setTodos}}>
       <TodoList />   
      </todosContext.Provider>
    </div>
    </ThemeProvider> 
  );
};
export default App;                                                           