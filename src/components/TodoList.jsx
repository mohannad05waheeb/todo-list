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
import { useState , useEffect , useMemo } from "react";   
// Components 
import Todo from "./Todo"; 
import { useTodos , useTodosDispatch} from "../contexts/todosContext";
// Import Dialog 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'; 
import { useToast } from "../Contexts/ToastContext";  
const TodoList = () => {    
  const todos = useTodos();    
  const dispatch = useTodosDispatch();  
  const { showHideToast } = useToast(); 
  const [titleInput, setTitleInput] = useState('');  
  const [displayedTodosType , setDisplayedTodosType] = useState('all');    
  const [showDeleteDialog , setShowDeleteDialog] = useState(false); 
  const [showUpdateDialog , setShowUpdateDialog] = useState(false); 
  const [dialogTodo , setDialogTodo] = useState(null); 
    // Filteration Arrays
    const completedTodos = useMemo(() => {
      if (todos && Array.isArray(todos.todos)) {
        return todos.todos.filter((t) => {          
        return t.isCompleted
      });    
    } else {
      console.error('Expected todos to be an array, but got:', todos);
      return []; 
    } 
  },[todos]); 
  const notcompletedTodos = useMemo(() => {
    if (todos && Array.isArray(todos.todos)) {
      return todos.todos.filter((t) => {      
        return !t.isCompleted;
      });
    } else {
      console.error('Expected todos to be an array, but got:', todos);
      return [];
    }
  }, [todos]);
  let todosToBeRendered = todos.todos;
  if (displayedTodosType === "completed") {
     todosToBeRendered = completedTodos;
  } else if (displayedTodosType === 'none-completed') {
    todosToBeRendered = notcompletedTodos;
  } else {
    todosToBeRendered = todos.todos
  };  
  useEffect(() => {
    dispatch({ type: 'get' })  
  } ,[]);     
  {/* Start Event Handlers */}
  function handleAddClick() {   
    dispatch({ type: 'added' , payload: {
      newTitle: titleInput,
      isCompleted: false 
    } })
    setTitleInput(''); 
    showHideToast('تمت الاضافة بنجاح!');  
  };  
  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  };  
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  };    
  function opeDeleteDialog(todo) {
    setDialogTodo(todo);  
    setShowDeleteDialog(true)
  }
  function handleDeleteConfirm() {   
    dispatch({ type: 'deleted' , payload: dialogTodo })
    setShowDeleteDialog(false); 
    showHideToast('تم الحذف بنجاح!')    
  };     
  function handleUpdateDialogClose() {
    setShowUpdateDialog(false);
  }; 
  function handleUpdateConfirm() { 
    dispatch({ type: 'updated' , payload: dialogTodo })
    setShowUpdateDialog(false);  
    showHideToast('تم التحديث بنجاح!')
  };
  function openUpdateDialog(todo) {
    setDialogTodo(todo); 
    setShowUpdateDialog(true);
  }; 
  {/* End Event Handlers */}    
  const todosList = Array.isArray(todosToBeRendered) ? (
    todosToBeRendered.map((t) => {
      return (
        <Todo 
          key={t.id} 
          todo={t} 
          showDelete={opeDeleteDialog} 
          showUpdate={openUpdateDialog} 
        />
      );
    })
  ) : (
    <></>
  )
  return(
    <>
        {/* Start Delete Dialog */}
        <Dialog
        style={{ direction: 'rtl' }}
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}   
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متاكد من رغبتك في حذف هذه المهمة؟ 
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد اتمامه            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>اغلاق</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            نعم ,قم بالحذف 
          </Button>
        </DialogActions>
    </Dialog>      
    {/* End Delete Dialog */}
        {/* Start Update Dialog */}
        <Dialog
        style={{ direction: 'rtl' }}
        onClose={handleUpdateDialogClose}
        open={showUpdateDialog}   
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل مهمة</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="عنوان مهمة"            
            fullWidth
            variant="standard"
            value={dialogTodo ? dialogTodo.title : ''}
            onChange={(e) => {
              setDialogTodo({...dialogTodo , title: e.target.value})
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="التفاصيل"             
            fullWidth
            variant="standard"
            value={dialogTodo ? dialogTodo.details : ''}
            onChange={(e) => { 
              setDialogTodo({...dialogTodo , details: e.target.value})
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>اغلاق</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
             تأكيد 
          </Button>
        </DialogActions>
    </Dialog>    
    {/* End Update Dialog */}
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
    </>    
   )  
  };
export default TodoList;