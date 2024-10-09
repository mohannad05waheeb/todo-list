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
import { useToast } from '../Contexts/ToastContext';
import { useTodosDispatch } from '../contexts/todosContext';
const Todo = ({ todo , showDelete , showUpdate}) => {  
  const dispatch = useTodosDispatch();  
  const { showHideToast } = useToast(); 
  {/* Start Event Handlers */}
  function handleCheckClick() {
    dispatch({ type: 'toggleCompleted' , payload: todo }) 
    showHideToast('تم التعديل بنجاح!')
   };   
  function handleUpdateClick() {
    showUpdate(todo); 
  }; 
  {/* End Event Handlers */}
  return (
    <>    
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
                onClick={() => {
                  showDelete(todo)
                }}  
                className='iconButton'
                aria-label='delete' style={{
                color: '#b23c17', 
                backgroundColor: 'white',
                border: 'solid #b23c17 3px'                
              }}              
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