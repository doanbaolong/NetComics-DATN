import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';
import { memo } from 'react';
import './ImageUpload.scss';

function ImageUpload({ multiple, hasImages, previewURL, imageUrl, onChange, onDeleteImage }) {
    return (
        <div className="form-group image-upload">
            <label className="form-label d-block">Hình ảnh</label>
            <label htmlFor="image" className="form-label image-label">
                <div className="image-label-title">
                    <MdOutlinePhotoSizeSelectActual />
                    <span className="mt-3">{hasImages ? 'Tải lại ảnh' : 'Thêm ảnh'}</span>
                </div>
            </label>
            <input
                type="file"
                multiple={multiple}
                accept="image/*"
                name="image"
                id="image"
                className="form-control image-input"
                onChange={onChange}
            />
            <div className="preview">
                {imageUrl &&
                    (Array.isArray(imageUrl) ? (
                        <>
                            <button
                                type="button"
                                className="btn btn-secondary me-4"
                                data-bs-toggle="modal"
                                data-bs-target="#chapterImages"
                            >
                                Xem hình ảnh chương truyện
                            </button>

                            <div
                                className="modal fade"
                                id="chapterImages"
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                                tabIndex="-1"
                                aria-labelledby="chapterImagesLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog modal-lg modal-dialog-scrollable">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="chapterImagesLabel">
                                                NetComics
                                            </h1>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            ></button>
                                        </div>
                                        <div className="modal-body">
                                            {imageUrl.map((image, index) => (
                                                <img key={index} src={image} className="img-fluid w-100" alt="" />
                                            ))}
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-info" data-bs-dismiss="modal">
                                                Đóng
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="img-preview">
                            <span className="title">Ảnh truyện</span>
                            <img
                                src={process.env.REACT_APP_SERVER_URL + imageUrl}
                                alt="Ảnh đã tải"
                                className="img-fluid"
                            />
                        </div>
                    ))}
                {previewURL &&
                    (Array.isArray(previewURL) ? (
                        <>
                            <button
                                type="button"
                                className="btn btn-secondary me-4"
                                data-bs-toggle="modal"
                                data-bs-target="#previewChapterImage"
                            >
                                Xem trước hình ảnh tải lên
                            </button>

                            <div
                                className="modal fade"
                                id="previewChapterImage"
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                                tabIndex="-1"
                                aria-labelledby="previewChapterImageLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog modal-lg modal-dialog-scrollable">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="previewChapterImageLabel">
                                                NetComics
                                            </h1>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            ></button>
                                        </div>
                                        <div className="modal-body">
                                            {previewURL.map((image, index) => (
                                                <img key={index} src={image} className="img-fluid w-100" alt="" />
                                            ))}
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-info" data-bs-dismiss="modal">
                                                Đóng
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="img-preview">
                            <span className="title">Ảnh tải lên</span>
                            <img src={previewURL} alt="Ảnh preview" className="img-fluid" />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default memo(ImageUpload);
