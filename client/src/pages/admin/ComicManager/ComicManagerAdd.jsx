import routes from '~/config/routes';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { toastSuccess } from '~/util/toastify';
import { addComic } from '~/store/comicSlice';
import { getAuthors } from '~/store/authorSlice';
import { getGenres } from '~/store/genreSlice';
import { comicSelector, authorSelector, genreSelector } from '~/store/selector';
import Breadcrumb from '~/components/Breadcrumb';
import InputForm from '~/components/Form/InputForm';
import Alert from '~/components/Alert/Alert';
import { trimString } from '~/util/trimString';
import ImageUpload from '~/components/Form/ImageUpload';
import SelectForm from '~/components/Form/SelectForm';
import slugify from '~/util/slugify';

function ComicManagerAdd() {
    const breadcrumb = [
        { title: 'Trang chủ', to: routes.admin },
        { title: 'Truyện tranh', to: routes.comicManager },
        { title: 'Thêm mới', to: routes.comicManagerAdd },
    ];

    const statusOptions = [
        { value: 'Đang tiến hành', label: 'Đang tiến hành' },
        { value: 'Hoàn thành', label: 'Hoàn thành' },
    ];

    const methods = useForm();
    const { handleSubmit, reset } = methods;

    const dispatch = useDispatch();
    const { addComicMessage, addComicStatus } = useSelector(comicSelector);
    const { authors } = useSelector(authorSelector);
    const { genres } = useSelector(genreSelector);

    const [error, setError] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState();
    const [authorOptions, setAuthorOptions] = useState([]);
    const [genreOptions, setGenreOptions] = useState([]);

    useEffect(() => {
        document.title = 'Thêm Truyện | NetComics';
    }, []);

    useEffect(() => {
        dispatch(getAuthors());
        dispatch(getGenres());
    }, [dispatch]);

    useEffect(() => {
        const authorOpts = authors.reduce((acc, author) => {
            let option = { value: author.id, label: author.name };
            return [...acc, option];
        }, []);
        const genreOpts = genres.reduce((acc, genre) => {
            let option = { value: genre.id, label: genre.name };
            return [...acc, option];
        }, []);
        setAuthorOptions(authorOpts);
        setGenreOptions(genreOpts);
    }, [authors, genres]);

    useEffect(() => {
        addComicMessage ? setError(addComicMessage) : setError('');
    }, [addComicMessage]);

    useEffect(() => {
        if (addComicStatus === 'success') {
            toastSuccess('Thêm truyện tranh thành công');
            reset();
            setImagePreview();
        }
    }, [addComicStatus, reset]);

    useEffect(() => {
        return () => {
            imagePreview && URL.revokeObjectURL(imagePreview);
        };
    });

    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
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
        formData.append('slug', slugify(dataTrim.name));
        formData.append('image', image);
        // for (const [key, value] of formData) {
        //     console.log(`${key}: ${value}\n`);
        // }
        dispatch(addComic(formData));
    };

    return (
        <div className="manager comic-manager">
            <Breadcrumb list={breadcrumb} />
            <h2>Thêm Truyện tranh</h2>
            <Link to={routes.comicManager} className="btn btn-primary mt-3 mb-3">
                Tất cả truyện tranh
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
                        <InputForm
                            label="Tên truyện"
                            placeholder="Tên truyện"
                            id="name"
                            name="name"
                            validate={{
                                validate: {
                                    trimStr: (value) => (!!value.trim() ? true : 'Vui lòng nhập tên truyện'),
                                },
                            }}
                        />
                        <InputForm textarea label="Tên khác" placeholder="Tên khác" id="otherName" name="otherName" />
                        <SelectForm
                            label="Tác giả"
                            selectName="authors"
                            options={authorOptions}
                            isSearchable
                            isClearable
                            isMulti
                            placeholder="Chọn tác giả..."
                            noOptionsMessage="Không có tác giả phù hợp"
                        />

                        <SelectForm
                            label="Thể loại"
                            selectName="genres"
                            options={genreOptions}
                            isSearchable
                            isClearable
                            isMulti
                            placeholder="Chọn thể loại..."
                            noOptionsMessage="Không có thể loại phù hợp"
                        />

                        <InputForm textarea label="Nội dung" placeholder="Nội dung" id="content" name="content" />

                        <SelectForm
                            label="Trạng thái"
                            selectName="status"
                            options={statusOptions}
                            defaultValue={statusOptions[0]}
                        />

                        <ImageUpload onChange={handleChangeImage} previewURL={imagePreview && imagePreview} />
                        <button type="submit" className="btn btn-success w-100">
                            {addComicStatus === 'pending' ? (
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

export default ComicManagerAdd;
