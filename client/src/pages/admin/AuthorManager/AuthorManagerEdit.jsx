import routes from '~/config/routes';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getSingleAuthor, updateAuthor } from '~/store/authorSlice';
import { authorSelector } from '~/store/selector';
import Breadcrumb from '~/components/Breadcrumb';
import InputForm from '~/components/Form/InputForm';
import Alert from '~/components/Alert';
import { trimString } from '~/util/trimString';

function AuthorManagerEdit() {
    const breadcrumb = [
        { title: 'Trang chủ', to: routes.admin },
        { title: 'Tác giả', to: routes.authorManager },
        { title: 'Sửa', to: routes.authorManagerAdd },
    ];

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { id } = useParams();
    const { author, getSingleAuthorMessage, updateAuthorMessage, updateAuthorStatus } = useSelector(authorSelector);

    const [error, setError] = useState('');

    useEffect(() => {
        document.title = 'Sửa Tác Giả | NetComics';
    }, []);

    useEffect(() => {
        dispatch(getSingleAuthor(id));
    }, [dispatch, id]);

    useEffect(() => {
        getSingleAuthorMessage ? setError(getSingleAuthorMessage) : setError('');
    }, [getSingleAuthorMessage]);

    useEffect(() => {
        updateAuthorMessage ? setError(updateAuthorMessage) : setError('');
    }, [updateAuthorMessage]);

    const methods = useForm();
    const { handleSubmit, setValue } = methods;

    useEffect(() => {
        const fields = ['name'];
        fields.forEach((field) => setValue(field, author[field]));
    }, [author, setValue]);

    const onSubmit = (data) => {
        const dataTrim = trimString(data);
        const payload = { author: dataTrim, id };
        dispatch(updateAuthor(payload));
    };

    useEffect(() => {
        if (updateAuthorStatus === 'success') {
            navigate(routes.authorManager);
        }
    }, [navigate, updateAuthorStatus]);

    const handleRemoveError = () => {
        error && setError('');
    };

    return (
        <div className="manager author-manager">
            <Breadcrumb list={breadcrumb} />
            <h2>Sửa Tác giả</h2>
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
                        <button className="btn btn-warning w-100">
                            {updateAuthorStatus === 'pending' ? (
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

export default AuthorManagerEdit;
