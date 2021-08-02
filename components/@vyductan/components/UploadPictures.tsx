import { Modal, Upload } from "antd";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
} from "antd/lib/upload/interface";
import React, { useState } from "react";
import Icon from "../Icon";

const getBase64 = (file: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const UploadPictures = React.forwardRef((props, ref) => {
  const [previewVisible, setPrevewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>();
  const [previewTitle, setPreviewTitle] = useState<string>();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  const handleChange = ({ fileList }: UploadChangeParam) =>
    setFileList(fileList);

  const handleCancel = () => {
    setPrevewVisible(false);
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(
      file.name || file.url?.substring(file.url.lastIndexOf("/") + 1)
    );
    setPrevewVisible(true);
  };
  return (
    <>
      <Upload
        ref={ref}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length > 0 && (
          <Icon name="Add" className="h-20 text-green-500" />
        )}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
});

export default UploadPictures;
