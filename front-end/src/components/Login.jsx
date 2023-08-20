import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Button,
    Container,
    Avatar,
    Typography,
    Box
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useEmployeeHook } from '../hooks/employee';

const Login = ({ setUserId }) => {
    const [id, setId] = useState(1);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const { employees, setEmployees, error } = useEmployeeHook();
    
    const Copyright = props => {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
              {'Copyright © '}
              {' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
        )
    }

    const handleChange = event => {
        const id = event.target.value;
        
        setUserId(id);
        setId(id);
        employees.map(emp => {
            if(emp.id == id)
                setName(`${emp.firstName} ${emp.lastName}`);
        });
    }

    const onLogin = () => {
        // setUserId(id);
        navigate('/customers');
    }

    return (
        <>
            <Container 
                className="bg-gray-100 p-4 absolute"
                sx={{ top: '10%', maxWidth: '100% !important' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '40vw',
                    margin: 'auto',
                    backgroundColor: 'rgb(255, 255, 255)',
                    color: 'rgb(30, 32, 34)',
                    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    boxShadow: 'rgba(140, 152, 164, 0.125) 0px 6px 24px 0px',
                    padding: '10px'
                  }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
                    <h2 className='p-4 mb-2 text-lg' style={{ fontSize: '2rem',fontWeight: 'bold'}}>
                        { `Employee : ${name}` }
                    </h2>
                    <Box>
                        <FormControl>
                            <InputLabel id="employee_label">
                                Employee
                            </InputLabel>
                            <Select
                                fullWidth
                                labelId='employee_label'
                                id='employee_select'
                                value={id}
                                label="Employee Name"
                                sx={{width: 300}}
                                onChange={handleChange}>
                                {
                                    employees && employees.map(employee => (
                                        <MenuItem
                                            key={employee.id}
                                            value={employee.id}>
                                            { `${employee.firstName} ${employee.lastName}` }
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                            <Button
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 2 }}
                              onClick={() => onLogin()}
                            >
                              Sign In
                            </Button>
                        </FormControl>
                        
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Box>
            </Container>
        </>
    )
}

export default Login;