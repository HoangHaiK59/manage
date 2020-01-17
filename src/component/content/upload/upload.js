import React from 'react';
import {Upload, Icon, Modal} from 'antd';

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const PictureWall = () => {
    const [previewVisible,setPreviewVisible] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState('');
    const [fileList, setFileList] = React.useState([]);

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async file => {
        if(!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    }

    const handleChange = ({fileList}) => setFileList(fileList);

    const uploadButton = (
        <div>
            <Icon type="plus"/>
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    return <div className="clearfix">
        <div style={{maxHeight: 300, overflow: 'auto'}}>
            <Upload
            accept=".jpg,.jpeg,.png"
            multiple
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            showUploadList={{showDownloadIcon: false}}
            >
                {
                    uploadButton
                }
                {/* {fileList.length >= 8 ? null: uploadButton} */}
            </Upload>
        </div>
        <Modal
        visible={previewVisible} 
        footer={null} 
        onCancel={handleCancel}
        >
            <img alt="" style={{width: '100%'}} src={previewImage}/>
        </Modal>
    </div>
}

export default PictureWall;