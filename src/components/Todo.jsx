import CardContent from '@mui/material/CardContent'; 
import Typography from '@mui/material/Typography'; 
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';  
// Import Icons 
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'; 
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
// Import Others 
import { useContext , useState } from 'react';
import todosContext from '../contexts/todosContext'; 
// Import Dialog 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'; 
const Todo = ({ todo }) => {
  const [showDeleteDialog , setShowDeleteDialog] = useState(false); 
  const [showUpdateDialog , setShowUpdateDialog] = useState(false); 
  const [updatedTodo , setUpdatedTodo] = useState({title:todo.title , details:todo.details}); 
  const { todos , setTodos } = useContext(todosContext); 
  {/* Start Event Handlers */}
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, isCompleted: !t.isCompleted };  
      } 
      return t; 
    });
    setTodos(updatedTodos); 
    localStorage.setItem('todos' , JSON.stringify(updatedTodos));
   };
  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }; 
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }; 
  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      return t.id !== todo.id; 
    })
    setTodos(updatedTodos);
    localStorage.setItem('todos' , JSON.stringify(updatedTodos));
  }; 
  function handleUpdateDialogClose() {
    setShowUpdateDialog(false);
  };
  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {...t , title: updatedTodo.title , details: updatedTodo.details}
      } else {
        return t
      }
    }) 
    setTodos(updatedTodos);
    setShowUpdateDialog(false);
    localStorage.setItem('todos' , JSON.stringify(updatedTodos));
  };
  function handleUpdateClick() {
    setShowUpdateDialog(true);
  }; 
  {/* End Event Handlers */}
  return (
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
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({...updatedTodo , title: e.target.value})
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
            value={updatedTodo.details}
            onChange={(e) => { 
              setUpdatedTodo({...updatedTodo , details: e.target.value})
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
      <Card 
        className='todoCard'
        sx={{
          minWidth: 275, 
          background: '#283593',         
          color: 'white',
          marginTop: 5, 
        }}
      >
        <CardContent style={{ textAlign: 'center' }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h5" sx={{
                textAlign: 'right',                         
                }}>
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: 'right' }}> 
                {todo.details} 
              </Typography>  
            </Grid>
            {/* Start Action Buttons */}
            <Grid item xs={4} display='flex' justifyContent='space-around' alignItems='center'>
              {/* Start Check Icon Button */}
              <IconButton 
                onClick={handleCheckClick}
                className='iconButton'
                aria-label='check'
                style={{ 
                  color: todo.isCompleted ? 'white' : '#8bc34a', 
                  background: todo.isCompleted ? '#8bc34a' : 'white',
                  border: 'solid #8bc34a 3px',
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* End Check Icon Button */}       
              {/* Start Edit Icon Button */}       
              <IconButton
                className='iconButton'
                aria-label='edit'
                style={{
                color: '#1769aa',
                backgroundColor: 'white',
                border: 'solid #1769aa 3px'                
              }}
              onClick={handleUpdateClick}              
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              {/* End Edit Icon Button */}  
              {/* Start Delete Icon Button */}
              <IconButton 
                onClick={handleUpdateClick}  
                className='iconButton'
                aria-label='delete' style={{
                color: '#b23c17', 
                backgroundColor: 'white',
                border: 'solid #b23c17 3px'                
              }}
              onClick={handleDeleteClick}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              {/* End Delete Icon Button */}
            </Grid>
            {/* End Action Buttons */}
          </Grid>            
        </CardContent> 
      </Card>   
    </>
  ); 
}; 
export default Todo;