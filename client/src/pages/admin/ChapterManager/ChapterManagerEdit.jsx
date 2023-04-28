import routes from '~/config/routes';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getSingleComic } from '~/store/comicSlice';
import { getSingleChapter, updateChapter } from '~/store/chapterSlice';
import { comicSelector, chapterSelector } from '~/store/selector';
import Breadcrumb from '~/components/Breadcrumb';
import InputForm from '~/components/Form/InputForm';
import Alert from '~/components/Alert/Alert';
import { trimString } from '~/util/trimString';
import ImageUpload from '~/components/Form/ImageUpload';

function ChapterManagerEdit() {
    const { comicId, chapterId } = useParams();

    const breadcrumb = [
        { title: 'Trang chủ', to: routes.admin },
        { title: 'Truyện tranh', to: routes.comicManager },
        { title: 'Chi tiết truyện', to: routes.comicManagerDetail + comicId },
        { title: 'Sửa chapter', to: routes.chapterManagerEdit + comicId + '/' + chapterId },
    ];

    const navigate = useNavigate();

    const methods = useForm();
    const { handleSubmit, resetField, setValue } = methods;

    const dispatch = useDispatch();
    const { comic } = useSelector(comicSelector);
    const { chapter } = useSelector(chapterSelector);
    const { updateChapterMessage, updateChapterStatus } = useSelector(chapterSelector);

    const [error, setError] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    useEffect(() => {
        dispatch(getSingleComic(comicId));
        dispatch(getSingleChapter(chapterId));
    }, [chapterId, comicId, dispatch]);

    useEffect(() => {
        const fields = ['chapterNumber', 'title'];
        fields.forEach((field) => setValue(field, chapter[field]));
    }, [chapter, setValue]);

    useEffect(() => {
        updateChapterMessage ? setError(updateChapterMessage) : setError('');
    }, [updateChapterMessage]);

    useEffect(() => {
        if (updateChapterStatus === 'success') {
            resetField('chapterNumber');
            resetField('title');
            navigate(routes.comicManagerDetail + comicId);
        }
    }, [comicId, navigate, resetField, updateChapterStatus]);

    useEffect(() => {
        return () => {
            if (imagesPreview.length > 0) {
                for (let imagePreview of imagesPreview) {
                    URL.revokeObjectURL(imagePreview);
                }
            }
        };
    }, [imagesPreview]);

    const handleChangeImage = (e) => {
        const files = e.target.files;
        const images = [];
        for (let file of files) {
            images.push(URL.createObjectURL(file));
        }

        setImages(Array.from(files));
        setImagesPreview(images);
    };

    const handleRemoveError = () => {
        error && setError('');
    };

    const onSubmit = (data) => {
        const dataTrim = trimString(data);
        const formData = new FormData();

        for (let key in dataTrim) {
            formData.append(key, dataTrim[key] || '');
        }
        if (images.length > 0) {
            images.forEach((image) => {
                formData.append('images', image);
            });
        }

        // for (const [key, value] of formData) {
        //     console.log(`${key}: ${value}\n`);
        // }
        const payload = { formData, chapterId };
        dispatch(updateChapter(payload));
    };

    return (
        <div className="manager comic-manager">
            <Breadcrumb list={breadcrumb} />
            <h2>Sửa Chapter</h2>
            <Link to={routes.comicManagerDetail + comicId} className="btn btn-primary mt-3 mb-3">
                {`Truyện tranh ${comic.name}`}
            </Link>
            <div className="form-wrapper">
                {error && <Alert message={error} onClick={handleRemoveError} />}
                <FormProvider {...methods}>
                    <form
                        action=""
                        className="form"
                        onSubmit={handleSubmit(onSubmit)}
                        method="post"
                        encType="multipart/form-data"
                    >
                        <p>Truyện tranh</p>
                        <p className="text-center text-uppercase fw-bold">{comic.name}</p>
                        <div className="chapter-form">
                            <span className="chapter-form-label">Thông tin chương</span>
                            <InputForm
                                label="Chương số"
                                placeholder="Chương số"
                                id="chapterNumber"
                                name="chapterNumber"
                                validate={{
                                    validate: {
                                        trimStr: (value) => (!!value.trim() ? true : 'Vui lòng nhập số chương'),
                                    },
                                }}
                            />
                            <InputForm label="Tiêu đề chương" placeholder="Tiêu đề chương" id="title" name="title" />
                            <ImageUpload
                                multiple
                                onChange={handleChangeImage}
                                hasImages={images.length > 0 ? true : false}
                                previewURL={imagesPreview.length > 0 && imagesPreview}
                                imageUrl={chapter.pictureUrls && JSON.parse(chapter.pictureUrls)}
                            />
                        </div>

                        <button type="submit" className="btn btn-success w-100">
                            Cập nhật
                        </button>
                    </form>
                </FormProvider>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ChapterManagerEdit;
