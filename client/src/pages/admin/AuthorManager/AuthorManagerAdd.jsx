import routes from '~/config/routes';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { toastSuccess } from '~/util/toastify';
import { addAuthor } from '~/store/authorSlice';
import { authorSelector } from '~/store/selector';
import Breadcrumb from '~/components/Breadcrumb';
import InputForm from '~/components/Form/InputForm';
import Alert from '~/components/Alert/Alert';
import { trimString } from '~/util/trimString';

function AuthorManagerAdd() {
    const breadcrumb = [
        { title: 'Trang chủ', to: routes.admin },
        { title: 'Tác giả', to: routes.authorManager },
        { title: 'Thêm mới', to: routes.authorManagerAdd },
    ];

    const dispatch = useDispatch();
    const { addAuthorMessage, addAuthorStatus } = useSelector(authorSelector);

    const [error, setError] = useState('');

    useEffect(() => {
        document.title = 'Thêm Tác Giả | NetComics';
    }, []);

    useEffect(() => {
        addAuthorMessage ? setError(addAuthorMessage) : setError('');
    }, [addAuthorMessage]);

    const methods = useForm();
    const { handleSubmit, reset } = methods;

    const onSubmit = (data) => {
        const payload = trimString(data);
        dispatch(addAuthor(payload));
    };

    useEffect(() => {
        if (addAuthorStatus === 'success') {
            toastSuccess('Thêm tác giả thành công');
            reset();
        }
    }, [addAuthorStatus, reset]);

    const handleRemoveError = () => {
        error && setError('');
    };

    return (
        <div className="manager genre-manager">
            <Breadcrumb list={breadcrumb} />
            <h2>Thêm Tác giả</h2>
            <Link to={routes.authorManager} className="btn btn-primary mt-3 mb-3">
                Tất cả tác giả
            </Link>
            <div className="form-wrapper">
                {error && <Alert message={error} onClick={handleRemoveError} />}
                <FormProvider {...methods}>
                    <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
                        <InputForm
                            label="Tên tác giả"
                            placeholder="Tên tác giả"
                            id="name"
                            name="name"
                            validate={{
                                validate: {
                                    trimStr: (value) => (!!value.trim() ? true : 'Vui lòng nhập tên tác giả'),
                                },
                            }}
                        />
                        <button className="btn btn-success w-100">
                            {addAuthorStatus === 'pending' ? (
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

export default AuthorManagerAdd;
