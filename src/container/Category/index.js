import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategories, getAllCategory, updateCategory } from '../../actions';
import Layout from '../../component/Layout';
import Button from '@material-ui/core/Button';
import { Container, Grid } from '@material-ui/core';
import Modal from './../../component/UI/Modal'
import UpdateCategoriesModal from './components/UpdateCategoriesModal'
import CheckboxTree from 'react-checkbox-tree';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import CategoryAddModal from './components/AddCategoryModal';



const Category = () => {
    const dispatch = useDispatch();
    const category = useSelector(state => state.category)
    const [checked, setchecked] = useState([]);
    const [expanded, setexpanded] = useState([]);
    const [updateCategoryStatus, setupdateCategoryStatus] = useState(false)
    const [checkArray, setCheckArray] = useState([]);
    const [expandArray, setexpandArray] = useState([])
    const [DeleteStatusModal, setDeleteStatusModal] = useState(false);


    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
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

    const updateCategoryStatusHandler = () => {
        updateCheckedAndExpandedCategory()
        setupdateCategoryStatus(true)
    }
    const updateCheckedAndExpandedCategory = () => {
        const checkedArray = [];
        const expandedArray = [];
        const categories = createCategoryList(category.categories);
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value)
            category && checkedArray.push(category)
        })

        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && expandedArray.push(category)
        })
        setCheckArray(checkedArray)
        setexpandArray(expandedArray)
    }


    const handleCategoryInput = (key, value, index, type) => {
        if (type === 'checked') {
            const updateCheckArray = checkArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setCheckArray(updateCheckArray)
        } else if (type === "expanded") {
            const updateExpandArray = expandArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setexpandArray(updateExpandArray)
        }
    }
    const updateCategoryHandler = (e) => {
        e.preventDefault();
        const form = new FormData();
        expandArray.forEach((item, index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('type', item.type)
            form.append('parentId', item.parentId ? item.parentId : "")
        })
        checkArray.forEach((item, index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('type', item.type)
            form.append('parentId', item.parentId ? item.parentId : "")
        })
        dispatch(updateCategory(form)).then(result => {
            if (result) {
                dispatch(getAllCategory())
            }
        })
        setupdateCategoryStatus(false)
    }
    // delete category 

    const onDeleteCategory = () => {
        const CheckedIdsArray = checkArray.map((item, index) => ({ _id: item.value }));
        const ExpandedIdsArray = expandArray.map((item, index) => ({ _id: item.value }));
        const idsArray = ExpandedIdsArray.concat(CheckedIdsArray);
        if (CheckedIdsArray.length > 0) {
            dispatch(deleteCategories(idsArray))
                .then(result => {
                    if (result) {
                        dispatch(getAllCategory())
                        setDeleteStatusModal(false)
                    }
                })
        }
    }
    const renderDeleteCategory = () => {
        return (
            <Modal
                open={DeleteStatusModal}
                titleModal="Xóa danh mục"
                buttons={[
                    {
                        type: "secondary",
                        titleButton: "Cancel",
                        ButtonHandleClose: () => {
                            alert('No')
                        }
                    },
                    {
                        type: "primary",
                        titleButton: "Delete",
                        ButtonHandleClose: onDeleteCategory
                    },
                ]}
                onClose={() => setDeleteStatusModal(false)}
            >
                <h2> Are you sure ?</h2>
            </Modal>
        )
    }

    const deleteCategoryHandler = () => {
        updateCheckedAndExpandedCategory()
        setDeleteStatusModal(true);
    }


    useEffect(() => {
        if (category.loading) {
            setOpen(false);
        }
    }, [category.loading]);

    return (
        <Layout sidebar>
            <Container>
                <h1>Category List</h1>
                <Button
                    onClick={handleClickOpen}
                    color="primary"
                    variant="contained"
                    startIcon={<AddIcon />}
                >
                    Add a new category
                </Button>
                <div style={{ marginTop: '50px' }}>

                    <CheckboxTree
                        nodes={renderCategories(category.categories)}
                        checked={checked}
                        expanded={expanded}
                        onCheck={checked => setchecked(checked)}
                        onExpand={expanded => setexpanded(expanded)}
                    />
                </div>
                <Grid style={{ marginTop: '20px' }}>
                    <Button
                        color="primary"
                        variant="outlined"
                        style={{ marginRight: '20px' }}
                        onClick={updateCategoryStatusHandler}
                        startIcon={<EditIcon />}
                    >

                        Sửa danh mục
                    </Button>
                    <Button
                        color="secondary"
                        variant="outlined"
                        onClick={deleteCategoryHandler}
                        startIcon={<DeleteIcon />}
                    >
                        Xóa danh mục
                    </Button>
                </Grid>



                <CategoryAddModal
                    CategoryStatus={open}
                    titleModal="Thêm sản phẩm"
                    titleButton="Thêm"
                    close={() => setOpen(false)}
                    CloseHanlder={handleClose}
                    categoryList={createCategoryList(category.categories)}
                    CategoryName={categoryName}
                    setCategoryName={setcategoryName}
                    ParentIdCategory={categoryParentid}
                    setParentIdCategory={setcategoryParentid}
                    handleCategoryImage={handleCategoryImage}
                />
                <UpdateCategoriesModal
                    titleModal="Sửa danh mục"
                    titleButton="Sửa"
                    close={() => setupdateCategoryStatus(false)}
                    CategoryStatus={updateCategoryStatus}
                    CloseHanlder={updateCategoryHandler}
                    categoryList={createCategoryList(category.categories)}
                    expandArray={expandArray}
                    checkArray={checkArray}
                    handleCategoryInput={handleCategoryInput}
                />


                {renderDeleteCategory()}


            </Container>
        </Layout >
    );
}

export default Category;
