import routes from '~/config/routes';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getSingleComic, updateComic } from '~/store/comicSlice';
import { getAuthors } from '~/store/authorSlice';
import { getGenres } from '~/store/genreSlice';
import { comicSelector, authorSelector, genreSelector } from '~/store/selector';
import Breadcrumb from '~/components/Breadcrumb';
import InputForm from '~/components/Form/InputForm';
import ImageUpload from '~/components/Form/ImageUpload';
import SelectForm from '~/components/Form/SelectForm';
import Alert from '~/components/Alert';
import { trimString } from '~/util/trimString';
import slugify from '~/util/slugify';

function ComicManagerEdit() {
    const { id } = useParams();

    const breadcrumb = [
        { title: 'Trang chủ', to: routes.admin },
        { title: 'Truyện tranh', to: routes.comicManager },
        { title: 'Sửa truyện', to: routes.comicManagerEdit + id },
    ];

    const statusOptions = [
        { value: 'Đang tiến hành', label: 'Đang tiến hành' },
        { value: 'Hoàn thành', label: 'Hoàn thành' },
    ];

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const methods = useForm();
    const { handleSubmit, setValue } = methods;
    const { comic, updateComicMessage, updateComicStatus } = useSelector(comicSelector);
    const { authors } = useSelector(authorSelector);
    const { genres } = useSelector(genreSelector);

    const [error, setError] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState();
    const [authorOptions, setAuthorOptions] = useState([]);
    const [genreOptions, setGenreOptions] = useState([]);
    const [currentAuthors, setCurrentAuthors] = useState([]);
    const [currentGenres, setCurrentGenres] = useState([]);

    useEffect(() => {
        dispatch(getSingleComic(id));
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(getAuthors());
        dispatch(getGenres());
    }, [dispatch]);

    useEffect(() => {
        let authorOpts = authors.reduce((acc, author) => {
            let option = { value: author.id, label: author?.name };
            return [...acc, option];
        }, []);
        let genreOpts = genres.reduce((acc, genre) => {
            let option = { value: genre.id, label: genre?.name };
            return [...acc, option];
        }, []);
        setAuthorOptions(authorOpts);
        setGenreOptions(genreOpts);
    }, [authors, genres]);

    useEffect(() => {
        if (comic?.Authors && comic?.Genres) {
            const currAuthors = comic.Authors.reduce((acc, author) => {
                let option = { value: author.id, label: author?.name };
                return [...acc, option];
            }, []);
            const currGenres = comic.Genres.reduce((acc, genre) => {
                let option = { value: genre.id, label: genre?.name };
                return [...acc, option];
            }, []);
            setCurrentAuthors(currAuthors);
            setCurrentGenres(currGenres);
        }
    }, [comic]);

    useEffect(() => {
        const fields = ['name', 'otherName', 'content', 'status'];
        fields.forEach((field) => {
            if (comic && comic[field]) {
                setValue(field, comic[field]);
            }
        });
        setValue(
            'genres',
            currentGenres.map((cur) => cur.value),
        );
        setValue(
            'authors',
            currentAuthors.map((cur) => cur.value),
        );
    }, [comic, currentAuthors, currentGenres, setValue]);

    useEffect(() => {
        updateComicMessage ? setError(updateComicMessage) : setError('');
    }, [updateComicMessage]);

    useEffect(() => {
        if (updateComicStatus === 'success') {
            navigate(routes.comicManager);
        }
    }, [navigate, updateComicStatus]);

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
        formData.append('slug', slugify(dataTrim?.name));
        image && formData.append('image', image);
        // for (const [key, value] of formData) {
        //     console.log(`${key}: ${value}\n`);
        // }
        const payload = { formData, id };
        dispatch(updateComic(payload));
    };

    return (
        <div className="manager comic-manager">
            <Breadcrumb list={breadcrumb} />
            <h2>Sửa Truyện tranh</h2>
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
                            defaultValue={currentAuthors}
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
                            defaultValue={currentGenres}
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
                            defaultValue={statusOptions.find((statusOption) => statusOption.value === comic?.status)}
                        />

                        <ImageUpload
                            onChange={handleChangeImage}
                            previewURL={imagePreview && imagePreview}
                            imageUrl={comic?.image}
                        />
                        <button type="submit" className="btn btn-success w-100">
                            {updateComicStatus === 'pending' ? (
                                <div className="spinner-border text-white" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : (
                                'Cập nhật'
                            )}
                        </button>
                    </form>
                </FormProvider>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ComicManagerEdit;
