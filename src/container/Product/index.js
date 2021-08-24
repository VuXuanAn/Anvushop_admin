import { Button, Container, Grid, NativeSelect, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import Layout from '../../component/Layout';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../../actions/product';
import Modal from './../../component/UI/Modal'
import { generatePictureUrl } from '../../configUrl';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    table: {
        minWidth: 650,
    },
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
function createData(name, price, quantity, category, discription, productPictures) {
    return { name, price, quantity, category, discription, productPictures };
}




const Product = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [productPictures, setProductPictures] = useState([]);
    const [detaiProductModal, setdetaiProductModal] = useState(false);
    const [ProductDetail, setProductDetail] = useState(null);
    const classes = useStyles();
    const products = useSelector(state => state.product)

    const category = useSelector(state => state.category)

    const rows = products.products.map(product => {
        return createData(product.name, product.price, product.quantity, product.category.name, product.description, product.productPictures)
    }
    )


    const addProductHandler = () => {
        const form = new FormData();
        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', description);
        form.append('category', categoryId);
        for (let pic of productPictures) {
            form.append('productPicture', pic)
        }
        dispatch(addProduct(form))
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

    const handleCategoryImage = (e) => {
        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ])
    }

    const renderProduct = () => {
        return (
            <TableContainer component={Paper} style={{ marginTop: '30px' }}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên sản phẩm</TableCell>
                            <TableCell align="left">Giá</TableCell>
                            <TableCell align="left">Số lượng</TableCell>
                            <TableCell align="left">Danh mục</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name} onClick={() => showProductDetailModal(row)}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">{row.price}</TableCell>
                                <TableCell align="left">{row.quantity}</TableCell>
                                <TableCell align="left">{row.category}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    const renderAddProduct = () => {
        return (
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography >
                        <Button color="primary" variant="contained"> Add product</Button>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <Grid spacing={5} container>
                            <Grid item xs={4} >
                                <TextField
                                    fullWidth
                                    id="standard-basic"
                                    label="Product Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />

                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    id="standard-basic"
                                    label="Quantity price"
                                    value={quantity}
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    id="standard-basic"
                                    label="Price"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="standard-basic"
                                    label="Descreption"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <NativeSelect
                                    id="demo-customized-select-native"
                                    input={<BootstrapInput />}
                                    fullWidth
                                    value={categoryId}
                                    onChange={e => setCategoryId(e.target.value)}
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
                        </Grid>
                        <input
                            accept="image/*"
                            className={classes.upload}
                            type="file"
                            onChange={handleCategoryImage}
                            style={{ display: 'block', marginTop: '20px' }}
                        />
                        {
                            productPictures.length > 0 ? productPictures.map((pic, index) => {
                                return <div key={index}>{pic.name}</div>
                            }) : null
                        }
                        <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                            style={{ marginTop: '20px' }}
                            onClick={addProductHandler}
                        > ADD</Button>
                    </Typography>
                </AccordionDetails>
            </Accordion>


        );
    }

    const handleClose = () => {
        setdetaiProductModal(false)
    }
    const showProductDetailModal = (product) => {
        setdetaiProductModal(true)
        setProductDetail(product);
    }
    const renderDetailProductModal = () => {
        if (!ProductDetail) {
            return null
        }
        return (
            <Modal
                open={detaiProductModal}
                onClose={handleClose}
                ButtonHandleClose={handleClose}
            >
                <Grid spacing={3} container>
                    <Grid item xs={6}>
                        <label>Tên sản phẩm</label>
                        <h4>{ProductDetail.name}</h4>
                    </Grid>
                    <Grid item xs={6}>
                        <label>Giá</label>
                        <h4>{ProductDetail.price}</h4>
                    </Grid>
                    <Grid item xs={6}>
                        <label>Số Lượng</label>
                        <h4>{ProductDetail.quantity}</h4>
                    </Grid>
                    <Grid item xs={6}>
                        <label>Danh mục</label>
                        <h4>{ProductDetail.category}</h4>
                    </Grid>
                    <Grid item xs={12}>
                        <label>Mô Tả</label>
                        <h4>{ProductDetail.discription}</h4>
                    </Grid>
                    <Grid item xs={12}>
                        <label>Hình ảnh sản phẩm</label>
                    </Grid>
                    {ProductDetail.productPictures.map(pic => {
                        return (
                            <Grid item xs={3}>
                                <img
                                    style={{ width: '100%' }}
                                    src={generatePictureUrl(pic.img)}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Modal>
        );
    }


    return (
        <Layout sidebar >
            <Container >
                <div>
                    <h1>Product</h1>
                </div>

                {renderAddProduct()}
                {renderProduct()}
                {renderDetailProductModal()}


            </Container>
        </Layout >
    );
}

export default Product;
