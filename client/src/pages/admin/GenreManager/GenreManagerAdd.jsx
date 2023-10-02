import routes from '~/config/routes';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { toastSuccess } from '~/util/toastify';
import { addGenre } from '~/store/genreSlice';
import { genreSelector } from '~/store/selector';
import Breadcrumb from '~/components/Breadcrumb';
import InputForm from '~/components/Form/InputForm';
import slugify from '~/util/slugify';
import Alert from '~/components/Alert/Alert';
import { trimString } from '~/util/trimString';

function GenreManagerAdd() {
    const breadcrumb = [
        { title: 'Trang chủ', to: routes.admin },
        { title: 'Thể loại', to: routes.genresManager },
        { title: 'Thêm mới', to: routes.genresManagerAdd },
    ];

    const dispatch = useDispatch();
    const { addGenreMessage, addGenreStatus } = useSelector(genreSelector);

    const methods = useForm();
    const { handleSubmit, reset } = methods;

    const [error, setError] = useState('');

    useEffect(() => {
        document.title = 'Thêm Thể Loại | NetComics';
    }, []);

    useEffect(() => {
        addGenreMessage ? setError(addGenreMessage) : setError('');
    }, [addGenreMessage]);

    const onSubmit = (data) => {
        const dataTrim = trimString(data);
        const payload = { ...dataTrim, slug: slugify(dataTrim.name) };
        dispatch(addGenre(payload));
    };

    useEffect(() => {
        if (addGenreStatus === 'success') {
            toastSuccess('Thêm thể loại thành công');
            reset();
        }
    }, [addGenreStatus, reset]);

    const handleRemoveError = () => {
        error && setError('');
    };

    return (
        <div className="manager genre-manager">
            <Breadcrumb list={breadcrumb} />
            <h2>Thêm Thể loại</h2>
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
                                validate: {
                                    trimStr: (value) => (!!value.trim() ? true : 'Vui lòng nhập tên thể loại'),
                                },
                            }}
                        />
                        <InputForm
                            textarea
                            label="Mô tả"
                            placeholder="Mô tả"
                            id="description"
                            name="description"
                            validate={{
                                validate: {
                                    trimStr: (value) => (!!value.trim() ? true : 'Vui lòng nhập tên thể loại'),
                                },
                            }}
                        />
                        <button className="btn btn-success w-100">
                            {addGenreStatus === 'pending' ? (
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

export default GenreManagerAdd;
