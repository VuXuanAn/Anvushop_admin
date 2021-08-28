import { Button, Grid, InputBase, NativeSelect, TextField, withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPage } from '../../actions/page.action';
import Layout from '../../component/Layout';
import LinerCategories from '../../helpers/LinerCategory';
import Modal from './../../component/UI/Modal'
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import AddIcon from '@material-ui/icons/Add';
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
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

const NewPage = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [statusCreatePage, setstatusCreatePage] = useState(false);
    const category = useSelector(state => state.category)
    const [categories, setcategories] = useState([]);
    const [categoryId, setcategoryId] = useState('');
    const [title, settitle] = useState('');
    const [type, settype] = useState('');
    const [desc, setdesc] = useState('');
    const [banners, setbanners] = useState([]);
    const [products, setproducts] = useState([]);
    const pages = useSelector(state => state.page)

    useEffect(() => {
        console.log(pages);
        if (!pages.loading === true) {
            setstatusCreatePage(false)
        }
    }, [pages]);

    useEffect(() => {
        setcategories(LinerCategories(category.categories))
    }, [category]);

    const handlePageBanners = (e) => {
        setbanners([...banners, e.target.files[0]])
    }
    const handlerPageProducts = (e) => {
        setproducts([...products, e.target.files[0]]);
    }
    const onChangeCategory = (e) => {
        const category = categories.find(category => category.value === e.target.value)
        setcategoryId(e.target.value)
        settype(category.type)


    }
    const renderCreatePageModal = () => {

        return (
            <Modal
                open={statusCreatePage}
                titleModal={'Create new page'}
                ButtonHandleClose={submitPageForm}
                onClose={() => setstatusCreatePage(false)}
                titleButton={'Create'}
            >
                <Grid item>
                    <NativeSelect
                        id="demo-customized-select-native"
                        input={<BootstrapInput />}
                        fullWidth
                        label="parent category"
                        value={categoryId}
                        onChange={onChangeCategory}
                    >
                        <option aria-label="select" value="" >Category</option>
                        {
                            categories.map(option2 => {
                                return <option key={option2.value} value={option2.value} >{option2.name}</option>
                            })
                        }
                    </NativeSelect>
                </Grid>
                <TextField
                    style={{ marginTop: '30px' }}
                    fullWidth
                    size="small"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                    id="outlined-basic"
                    label="Title "
                    variant="outlined"
                />

                <TextField
                    style={{ marginTop: '30px' }}
                    fullWidth
                    size="small"
                    value={desc}
                    onChange={(e) => setdesc(e.target.value)}
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                />



                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handlePageBanners}

                />
                <label htmlFor="contained-button-file">
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{ marginTop: '30px' }}
                        fullWidth
                    >
                        Banners
                    </Button>
                </label>

                {banners.length > 0 ? banners.map((banner, index) => {
                    return (
                        <span style={{ marginRight: '30px', marginTop: '30px' }} key={index} >{banner.name}</span>
                    )
                }) : null}


                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file-products"
                    multiple
                    type="file"
                    onChange={handlerPageProducts}

                />
                <label htmlFor="contained-button-file-products">
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{ marginTop: '30px' }}
                        fullWidth
                    >
                        Products
                    </Button>
                </label>
                {products.length > 0 ? products.map((product, index) => {
                    return (
                        <span style={{ marginRight: '30px', marginTop: '30px' }} key={index}>{product.name}</span>
                    )
                }) : null}
            </Modal>
        )
    }

    const submitPageForm = (e) => {
        e.preventDefault()
        const form = new FormData();
        if (title === "") {
            alert("title is required");
            setstatusCreatePage(false)
            return

        }
        form.append('title', title)
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type)
        banners.forEach((banner, index) => {
            form.append('banners', banner)
        })
        products.forEach((product, index) => {
            form.append('products', product)
        })

        dispatch(createPage(form))
        setstatusCreatePage(false)
    }

    return (
        <Layout sidebar>
            <Button
                color="primary"
                variant="outlined"
                onClick={() => setstatusCreatePage(true)}
                style={{ margin: '50px' }}
                startIcon={<AddIcon />}
            >Create</Button>
            {renderCreatePageModal()}
        </Layout>
    );
}

export default NewPage;
