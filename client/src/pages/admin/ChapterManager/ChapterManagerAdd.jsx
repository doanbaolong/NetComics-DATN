import routes from '~/config/routes';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { toastSuccess } from '~/util/toastify';
import { getComics, getSingleComic } from '~/store/comicSlice';
import { addChapter, chapterSlice } from '~/store/chapterSlice';
import { comicSelector, chapterSelector } from '~/store/selector';
import Breadcrumb from '~/components/Breadcrumb';
import InputForm from '~/components/Form/InputForm';
import Alert from '~/components/Alert/Alert';
import { trimString } from '~/util/trimString';
import ImageUpload from '~/components/Form/ImageUpload';
import SelectForm from '~/components/Form/SelectForm';
import { ALL } from '~/util/constants';
import { DataContext } from '~/context/GlobalState';

function ChapterManagerAdd() {
    const { comicId } = useParams();

    const breadcrumb = [
        { title: 'Trang chủ', to: routes.admin },
        { title: 'Truyện tranh', to: routes.comicManager },
        { title: 'Thêm chapter', to: routes.chapterManagerAdd + comicId },
    ];

    const state = useContext(DataContext);
    const socket = state.socket;

    const methods = useForm();
    const { handleSubmit, resetField, setValue } = methods;

    const dispatch = useDispatch();
    const { comic, comics } = useSelector(comicSelector);
    const { addChapterMessage, addChapterStatus, chapter } = useSelector(chapterSelector);

    const [error, setError] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [comicOptions, setComicOptions] = useState([]);
    const [link, setLink] = useState({ title: 'Tất cả truyện tranh', to: routes.comicManager });

    useEffect(() => {
        if (comicId === ALL) {
            dispatch(getComics());
        } else {
            dispatch(getSingleComic(comicId));
        }
    }, [comicId, dispatch]);

    useEffect(() => {
        if (comicId !== ALL) {
            if (comic?.name) {
                setLink({ title: `Truyện tranh ${comic.name}`, to: routes.comicManagerDetail + comicId });
            } else {
                setLink({ title: 'Tất cả truyện tranh', to: routes.comicManager });
            }
        }
    }, [comic?.name, comicId]);

    useEffect(() => {
        const fields = ['comic'];
        fields.forEach((field) => setValue(field, comic?.name));
    }, [comic, comicId, setValue]);

    useEffect(() => {
        const comicOpts = comics.reduce((acc, comic) => {
            let option = { value: comic?.id, label: comic?.name };
            return [...acc, option];
        }, []);
        setComicOptions(comicOpts);
    }, [comics]);

    useEffect(() => {
        addChapterMessage ? setError(addChapterMessage) : setError('');
    }, [addChapterMessage]);

    useEffect(() => {
        if (addChapterStatus === 'success') {
            toastSuccess('Thêm chapter thành công');
            resetField('chapterNumber');
            resetField('title');
            setImagesPreview([]);

            if (socket) {
                socket.emit('newChapter', {
                    comicId,
                    chapterId: chapter?.id,
                    read: false,
                    type: 2,
                });
            }

            dispatch(chapterSlice.actions.reset());
        }
    }, [addChapterStatus, chapter?.id, comicId, dispatch, resetField, socket]);

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
        const dataTrim = comicId === ALL ? trimString(data) : trimString({ ...data, comic: comic.id });
        const formData = new FormData();

        for (let key in dataTrim) {
            formData.append(key, dataTrim[key] || '');
        }
        images.forEach((image) => {
            formData.append('images', image);
        });

        // for (const [key, value] of formData) {
        //     console.log(`${key}: ${value}\n`);
        // }
        dispatch(addChapter(formData));
    };

    return (
        <div className="manager comic-manager">
            <Breadcrumb list={breadcrumb} />
            <h2>Thêm Chapter</h2>
            <Link to={link.to} className="btn btn-primary mt-3 mb-3">
                {link.title}
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
                        {comicId === ALL ? (
                            <SelectForm
                                label="Truyện tranh"
                                selectName="comic"
                                options={comicOptions}
                                isSearchable
                                placeholder="Chọn truyện cần thêm chapter mới"
                                noOptionsMessage="Không có truyện phù hợp"
                                validate={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng chọn truyện tranh',
                                    },
                                }}
                            />
                        ) : (
                            <InputForm
                                readOnly
                                label="Truyện tranh"
                                placeholder="Tên truyện tranh"
                                id="comic"
                                name="comic"
                                validate={{
                                    validate: {
                                        trimStr: (value) => (!!value.trim() ? true : 'Vui lòng nhập tên truyện'),
                                    },
                                }}
                            />
                        )}
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
                            />
                        </div>

                        <button type="submit" className="btn btn-success w-100">
                            {addChapterStatus === 'pending' ? (
                                <div className="spinner-border text-white" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : (
                                'Thêm mới'
                            )}
                        </button>
                    </form>
                </FormProvider>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ChapterManagerAdd;
