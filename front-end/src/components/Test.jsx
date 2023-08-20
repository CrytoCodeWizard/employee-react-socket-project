import { useState } from 'react';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

const options = [
    'option 1',
    'option 2'
];

const Test = () => {
    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');

    const films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 }
    ];

    return (
        <>
            <Button variant='contained'>
                Hello world
            </Button>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={films}
                sx={{width: 300}}
                renderInput={(params) => <TextField {...params} label="Movie"/>}/>
            
            <div>
                { `value: ${ value !== null ? `'${value}'` : 'null' }` }
            </div>
            <div>
                { `input value: '${inputValue}'` }
            </div>
            
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                // inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={options}
                sx={{ width: 300 }}
                renderInput={
                    (params) => <TextField {...params} label="Controllable" />
                }/>
        </>
    )
}

export default Test;