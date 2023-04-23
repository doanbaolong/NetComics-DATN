import routes from '~/config/routes';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getSingleGenre, updateGenre } from '~/store/genreSlice';
import { genreSelector } from '~/store/selector';
import Breadcrumb from '~/components/Breadcrumb';
import InputForm from '~/components/Form/InputForm';
import slugify from '~/util/slugify';
import Alert from '~/components/Alert';
import { trimString } from '~/util/trimString';

function GenreManagerEdit() {
    const breadcrumb = [
        { title: 'Trang chủ', to: routes.admin },
        { title: 'Thể loại', to: routes.genresManager },
        { title: 'Sửa', to: routes.genresManagerAdd },
    ];

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getSingleGenre(id));
    }, [dispatch, id]);

    const { genre, getSingleGenreMessage, updateGenreMessage, updateGenreStatus } = useSelector(genreSelector);

    const [error, setError] = useState('');
    useEffect(() => {
        getSingleGenreMessage ? setError(getSingleGenreMessage) : setError('');
    }, [getSingleGenreMessage]);

    useEffect(() => {
        updateGenreMessage ? setError(updateGenreMessage) : setError('');
    }, [updateGenreMessage]);

    const methods = useForm();
    const { handleSubmit, setValue } = methods;

    useEffect(() => {
        const fields = ['name', 'description'];
        fields.forEach((field) => setValue(field, genre[field]));
    }, [genre, setValue]);

    const onSubmit = (data) => {
        const dataTrim = trimString(data);
        const payload = { genre: { ...dataTrim, slug: slugify(data.name) }, id };
        dispatch(updateGenre(payload));
        navigate(routes.genresManager);
    };

    useEffect(() => {
        if (updateGenreStatus === 'success') {
            navigate(routes.genresManager);
        }
    }, [navigate, updateGenreStatus]);

    const handleRemoveError = () => {
        error && setError('');
    };

    return (
        <div className="manager genre-manager">
            <Breadcrumb list={breadcrumb} />
            <h2>Sửa Thể loại</h2>
            <Link to={routes.genresManager} className="btn btn-primary mt-3 mb-3">
                Tất cả thể loại
            </Link>
            <div className="form-wrapper">
                {error && <Alert message={error} onClick={handleRemoveError} />}
                <FormProvider {...methods}>
                    <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
                        <InputForm
                            label="Tên thể loại"
                            placeholder="Tên thể loại"
                            id="name"
                            name="name"
                            validate={{
                                required: {
                                    value: true,
                                    message: 'Vui lòng nhập tên thể loại',
                                },
                                validate: {
                                    trimStr: (value) => (!!value.trim() ? true : 'Vui lòng nhập tên tác giả'),
                                },
                            }}
                        />
                        <InputForm textarea label="Mô tả" placeholder="Mô tả" id="description" name="description" />
                        <button className="btn btn-warning w-100">Cập nhật</button>
                    </form>
                </FormProvider>
            </div>
            <ToastContainer />
        </div>
    );
}

export default GenreManagerEdit;
