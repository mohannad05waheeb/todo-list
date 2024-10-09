import TodoList from "./components/TodoList";
import './App.css'; 
import { createTheme , ThemeProvider } from "@mui/material/styles"; 
import  todosContext from "./contexts/todosContext";  
import { useState } from "react";   
import { ToastProvider } from './Contexts/ToastContext'; 
import TodosProvider from "./contexts/todosContext";
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
      <TodosProvider>
     <ToastProvider> 
      <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height: '100vh',
        backgroundColor: '#191f1b',     
        direction: 'rtl'
      }}>    
       <TodoList />    
      </div>  
      </ToastProvider> 
      </TodosProvider>
    </ThemeProvider>  
  );
};
export default App;       