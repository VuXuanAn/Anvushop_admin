import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../actions';
import Layout from '../../component/Layout';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import Modal from './../../component/UI/Modal'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: '20px'
        },
    },
    input: {
        display: 'none',

    },
    button: {
        marginTop: '20px!important'
    }
}));


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

const Category = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const category = useSelector(state => state.category)



    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.name} onClick={handleClickOpen}>
                    {category.name}
                    {category.children.length > 0 ? (
                        <ul>
                            {renderCategories(category.children)}
                        </ul>
                    ) : null}
                </li>
            );
        }
        return myCategories;
    }
    const createCategoryList = (categories, options = []) => {

        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
                type: category.type
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }

        return options;
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        const form = new FormData();
        form.append('name', categoryName)
        form.append('parentId', categoryParentid)
        form.append('categoryImage', categoryImage)
        dispatch(addCategory(form))
        setOpen(false);
    };

    // state to set up to create a new category 
    const [categoryName, setcategoryName] = useState('');
    const [categoryParentid, setcategoryParentid] = useState('');
    const [categoryImage, setcategoryImage] = useState('');

    const handleCategoryImage = (e) => {
        setcategoryImage(e.target.files[0])
    }
    return (
        <Layout sidebar>
            <Container>
                <h1>Category List</h1>
                <Button onClick={handleClickOpen} color="primary" variant="contained">
                    Add a new category
                </Button>
                <div style={{ marginTop: '50px' }}>

                    {renderCategories(category.categories)}
                </div>



                <Modal
                    open={open}
                    onClose={handleClose}
                    ButtonHandleClose={handleClose}
                >
                    <div>
                        <Grid item>
                            <TextField
                                id="standard-basic"
                                label="Category"
                                value={categoryName}
                                onChange={e => setcategoryName(e.target.value)}
                            />
                        </Grid>
                        <Grid>
                            <NativeSelect
                                id="demo-customized-select-native"
                                input={<BootstrapInput />}
                                fullWidth
                                value={categoryParentid}
                                onChange={e => { setcategoryParentid(e.target.value) }}
                                label="parent category"
                            >
                                <option aria-label="select" value="" />
                                {
                                    createCategoryList(category.categories).map(option2 => {
                                        return <option key={option2.value} value={option2.value} >{option2.name}</option>
                                    })
                                }
                            </NativeSelect>
                        </Grid>
                        <input
                            accept="image/*"
                            className={classes.upload}
                            type="file"

                            onChange={handleCategoryImage}
                        />
                    </div>
                </Modal>
            </Container>
        </Layout >
    );
}

export default Category;
