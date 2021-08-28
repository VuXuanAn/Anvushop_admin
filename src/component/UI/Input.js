import { InputBase, NativeSelect, TextField, withStyles } from '@material-ui/core';
import React from 'react';


const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    upload: {
        marginTop: '20px!important',
    },
    input: {
        marginTop: '20px',
        display: 'block',
        width: '100%',
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);


const Input = (props) => {

    let input = null;
    switch (props.type) {
        case "text":
            input = (
                <TextField
                    variant="outlined"
                    size="small"
                    style={{ marginTop: '20px' }}
                    id="standard-basic"
                    label="Category"
                    value={props.valueTextInput}
                    onChange={e => props.onChangeText(e.target.value)}
                />
            )
            break;
        case "select":
            input = (
                <NativeSelect
                    id="demo-customized-select-native"
                    input={<BootstrapInput />}
                    fullWidth
                    value={props.valueSelectInput}
                    onChange={e => { props.onChangeSelect(e.target.value) }}
                    label="parent category"
                >
                    <option aria-label="select" value="" />
                    {
                        props.categoryList.map(option2 => {
                            return <option key={option2.value} value={option2.value} >{option2.name}</option>
                        })
                    }
                </NativeSelect>
            )
            break;
        case 'selectAvailble':

            break;
        default:

    }

    return input;
}

export default Input;
