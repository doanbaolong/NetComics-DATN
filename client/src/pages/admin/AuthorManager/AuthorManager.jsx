import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { toastSuccess } from '~/util/toastify';
import { authorSlice, deleteAuthor, getAuthors } from '~/store/authorSlice';
import { authorSelector } from '~/store/selector';
import routes from '~/config/routes';
import Modal from '~/components/Modal';
import Breadcrumb from '~/components/Breadcrumb';

function AuthorManager() {
    const breadcrumb = [
        { title: 'Trang chủ', to: routes.admin },
        { title: 'Thể loại', to: routes.authorManager },
    ];

    const dispatch = useDispatch();
    const { authors, deleteAuthorStatus } = useSelector(authorSelector);

    useEffect(() => {
        document.title = 'Danh Sách Tác Giả | NetComics';
    }, []);

    useEffect(() => {
        dispatch(getAuthors());
    }, [dispatch]);

    const handleDeleteAuthor = (id) => {
        dispatch(deleteAuthor(id));
    };

    useEffect(() => {
        if (deleteAuthorStatus === 'success') {
            toastSuccess('Xóa tác giả thành công');
            dispatch(getAuthors());
            dispatch(authorSlice.actions.reset());
        }
    }, [deleteAuthorStatus, dispatch]);
    return (
        <div className="manager author-manager">
            <Breadcrumb list={breadcrumb} />
            <h2>Tác giả</h2>
            <Link to={routes.authorManagerAdd} className="btn btn-primary mt-3 mb-2">
                Thêm tác giả
            </Link>
            <div className="table-responsive mt-3">
                <table className="table table-striped table-hover table-responsive">
                    <thead className="table-info">
                        <tr>
                            <th>#</th>
                            <th>Tác giả</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {authors.map((author, index) => (
                            <tr key={author.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{author.name}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <Link
                                            to={`${routes.authorManager}/sua/${author.id}`}
                                            className="btn btn-warning me-3"
                                        >
                                            Sửa
                                        </Link>
                                        <Modal
                                            buttonText="Xóa"
                                            id={'deleteAuthor' + author.id}
                                            title="NetComics"
                                            body="Bạn có chắc chắn muốn xóa tên tác giả này?"
                                            closeText="Hủy"
                                            confirmText="Xóa"
                                            onConfirmClick={() => handleDeleteAuthor(author.id)}
                                            loading={deleteAuthorStatus === 'pending'}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AuthorManager;
