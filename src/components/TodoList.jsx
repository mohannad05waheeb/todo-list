import { Container } from "@mui/material"; 
import Card from '@mui/material/Card'; 
import CardContent from '@mui/material/CardContent'; 
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'; 
import Grid from '@mui/material/Grid';   
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { useState , useContext , useEffect } from "react";  
import todosContext from "../contexts/todosContext"; 
import { v4 as uuidv4 } from 'uuid';  
// Components 
import Todo from "./Todo"; 
const TodoList = () => {  
  const { todos , setTodos } = useContext(todosContext); 
  const [titleInput, setTitleInput] = useState('');  
  const [displayedTodosType , setDisplayedTodosType] = useState('all'); 
    // Filteration Arrays
  const completedTodos = todos.filter((t) => {
    return t.isCompleted
  }); 
  const notcompletedTodos = todos.filter((t) => {
    return !t.isCompleted
  }); 
  let todosToBeRendered = todos;
  if (displayedTodosType === "completed") {
     todosToBeRendered = completedTodos;
  } else if (displayedTodosType === 'none-completed') {
    todosToBeRendered = notcompletedTodos;
  } else {
    todosToBeRendered = todos
  };  
  const todosList = todosToBeRendered.map((t) => {
    return (<Todo key={t.id} todo={t} />) 
  })  
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem('todos')) ?? [];  
    setTodos(storageTodos); 
  } ,[]);     
  function handleAddClick() { 
    const newTodo = {
      id: uuidv4(),  
      title: titleInput, 
      details: '',
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo]; 
    setTodos(updatedTodos);  
    localStorage.setItem('todos' , JSON.stringify(updatedTodos));
    setTitleInput('');  
  };  
  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }; 
  return (       
    <Container maxWidth='sm'>
      <Card sx={{ minWidth: 275 }} style={{
        maxHeight: '80vh',
        overflowY: 'scroll',
      }}>
        <CardContent style={{ textAlign: 'center' }}>
          <Typography variant="h2" style={{ fontWeight: 'bold' }}> مهامي </Typography> 
          <Divider /> 
          {/* Start Filter Buttons */}
          <ToggleButtonGroup
            style={{ direction: 'ltr', marginTop: '30px' }}   
            exclusive     
            aria-label="text alignment"
            value={displayedTodosType}
            onChange={changeDisplayedType}
            color="primary"
          > 
            <ToggleButton value="none-completed">غير المنجز</ToggleButton> 
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
          {/* End Filter Buttons */}          
          {/* Start All Todos */}
          {todosList} 
          {/* End All Todos */}          
          {/* Start Input + Add Button */}
          <Grid container style={{ marginTop: '20px' }} spacing={2}>
            <Grid item xs={8} display='flex' justifyContent='space-around' alignItems='center'>
              <TextField
                id="outlined-basic" 
                label="عنوان المهمة" 
                variant="outlined"
                style={{ width: '100%' }}
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value)
                }}
              />          
            </Grid>
            <Grid item xs={4} display='flex' justifyContent='space-around' alignItems='center'>
              <Button
               variant="contained" 
               style={{ width: '100%', height: '100%' }}
               onClick={() => {
                handleAddClick()
               }}   
               disabled={titleInput.length === 0}            
               > 
                اضافة
              </Button>           
            </Grid>
          </Grid>
          {/* End Input + Add Button */}          
        </CardContent>        
      </Card>    
    </Container>      
  );
};
export default TodoList;