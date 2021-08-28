import { Grid } from '@material-ui/core'
import React from 'react'
import Modal from '../../../component/UI/Modal'
import AddIcon from '@material-ui/icons/Add';
import Input from './../../../component/UI/Input'
const CategoryAddModal = (props) => {
    const {
        CategoryStatus,
        CloseHanlder,
        titleModal,
        titleButton,
        categoryList,
        CategoryName,
        setCategoryName,
        ParentIdCategory,
        setParentIdCategory,
        handleCategoryImage,
        close
    } = props
    return (
        <Modal
            startIcon={<AddIcon />}
            open={CategoryStatus}
            titleModal={titleModal}
            titleButton={titleButton}
            onClose={close}
            ButtonHandleClose={CloseHanlder}
        >
            <div>
                <Grid container spacing={5}>
                    <Grid item>
                        <Input
                            type="text"
                            valueTextInput={CategoryName}
                            onChangeText={setCategoryName}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            type="select"
                            valueSelectInput={ParentIdCategory}
                            onChangeSelect={setParentIdCategory}
                            categoryList={categoryList}
                        />
                    </Grid>
                </Grid>
                <input
                    accept="image/*"
                    style={{ marginTop: '20px' }}
                    type="file"
                    onChange={handleCategoryImage}
                />
            </div>
        </Modal>
    )
}

export default CategoryAddModal;
