import { Grid, InputBase, NativeSelect, Slide, TextField } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react'
import Modal from '../../../component/UI/Modal'
import Input from './../../../component/UI/Input'

const CategoryEditModal = (props) => {
    const {
        expandArray,
        checkArray,
        CategoryStatus,
        CloseHanlder,
        titleModal,
        titleButton,
        categoryList,
        handleCategoryInput

    } = props
    return (
        <Modal
            open={CategoryStatus}
            titleModal={titleModal}
            titleButton={titleButton}
            onClose={props.close}
            ButtonHandleClose={CloseHanlder}
        >
            <div>
                <h2>Expanded</h2>
                {expandArray.length > 0 && expandArray.map((item, index) => {
                    return (
                        <Grid container spacing={3} key={index}>
                            <Grid item>
                                <Input
                                    type="text"
                                    valueTextInput={item.name}
                                    onChangeText={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                />
                            </Grid>
                            <Grid item>
                                <Input
                                    type="select"
                                    valueSelectInput={item.parentId}
                                    onChangeSelect={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}
                                    categoryList={categoryList}
                                />
                            </Grid>
                            <Grid item>
                                {/* <Input
                                    type="select"
                                    valueSelectInput={item.type}
                                    onChangeSelect={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}
                                    categoryList={[
                                        'Store', 'Product', 'Page'
                                    ]}
                                /> */}
                            </Grid>
                        </Grid>
                    )
                })}



                <h2>Checked</h2>
                {checkArray.length > 0 && checkArray.map((item, index) => {
                    return (
                        <Grid container spacing={3} key={index}>
                            <Grid item>
                                <Input
                                    type="text"
                                    valueTextInput={item.name}
                                    onChangeText={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                />
                            </Grid>
                            <Grid item>
                                <Input
                                    type="select"
                                    valueSelectInput={item.parentId}
                                    onChangeSelect={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}
                                    categoryList={categoryList}
                                />
                            </Grid>
                            <Grid item>
                                <Input
                                    type="select"
                                    valueSelectInput={item.type}
                                    onChangeSelect={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
                                    categoryList={[
                                        'Store', 'Product', 'Page'
                                    ]}
                                />
                                <NativeSelect
                                    id="demo-customized-select-native"
                                    value={item.type}
                                    onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
                                    label="parent category"
                                >
                                    <option aria-label="select" value="" ></option>
                                    <option aria-label="select" value="store"  >Store</option>
                                    <option aria-label="select" value="product"  >Product</option>
                                    <option aria-label="select" value="page"  >Page</option>
                                </NativeSelect>
                            </Grid>
                        </Grid>
                    )
                })}
            </div>
        </ Modal>
    )
}

export default CategoryEditModal
