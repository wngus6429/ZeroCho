import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";

const PostImages = ({ images }) => {
  const [showImagesZoom, setshowImagesZoom] = useState(false);
  const onZoom = useCallback(() => {
    setshowImagesZoom(true);
  }, []);
  //0개가 없는 이유는 PostCard에서 무조건 한개 이상일때 라고 설정 해줘서 이다
  if (images.length === 1) {
    return (
      <>
        <img
          role="presentation"
          style={{ maxHeight: "200px" }}
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <img
          role="presentation"
          style={{ width: "50%", display: "inline-block" }}
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          role="presentation"
          style={{ width: "50%", display: "inline-block" }}
          src={images[1].src}
          alt={images[1].src}
          onClick={onZoom}
        />
      </>
    );
  }
  return (
    <>
      <div>
        <img
          role="presentation"
          style={{ width: "50%" }}
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <div
          role="presentation"
          style={{ display: "inline-block", width: "50%", textAlign: "center", verticalAlign: "middle" }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더 보기
        </div>
      </div>
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
//이미지에 대한 설명을 alt에 보통 적음. 시각장애인 한테 도움, role="presentation"도 시각장애인한테 정보
