import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import { IoClose } from "react-icons/io5";

import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from 'react';
type SidebarProps = {
    placeholder: string;
    onSearch: (value: string) => void;
};
export default function SearchBox({ placeholder, onSearch }: SidebarProps) {
    const [value, setValue] = useState("");

    useEffect(() => {
        if(!value) return
        const searchHandler = setTimeout(() => {
            onSearch(value.trim())
        }, 500);
        return () => {
            clearTimeout(searchHandler)
        }
    }, [value, onSearch])

    const clearSearch = () => {
        setValue("")
    }
    return (
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '65ch' } }}
            noValidate
            autoComplete="off"

        >
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" >
                <OutlinedInput
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    endAdornment={<InputAdornment position="end">
                        <IconButton
                            edge="end"
                        >
                            {value ? < IoClose onClick={clearSearch} /> : <IoSearchSharp />}
                        </IconButton>
                    </InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                />
            </FormControl>
        </Box>
    );
}
