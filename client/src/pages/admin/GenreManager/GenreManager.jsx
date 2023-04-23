import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { toastSuccess } from '~/util/toastify';
import { deleteGenre, getGenres } from '~/store/genreSlice';
import { genreSelector } from '~/store/selector';
import routes from '~/config/routes';
import Modal from '~/components/Modal';
import Breadcrumb from '~/components/Breadcrumb';

function GenreManager() {
    const breadcrumb = [
        { title: 'Trang chủ', to: routes.admin },
        { title: 'Thể loại', to: routes.genresManager },
    ];

    const dispatch = useDispatch();
    const { genres, deleteGenreStatus } = useSelector(genreSelector);

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    const handleDeleteGenre = (id) => {
        dispatch(deleteGenre(id));
    };

    useEffect(() => {
        if (deleteGenreStatus === 'success') {
            toastSuccess('Xóa thể loại thành công');
            dispatch(getGenres());
        }
    }, [deleteGenreStatus, dispatch]);

    return (
        <div className="manager genre-manager">
            <Breadcrumb list={breadcrumb} />
            <h2>Thể loại</h2>
            <Link to={routes.genresManagerAdd} className="btn btn-primary mt-3 mb-2">
                Thêm thể loại
            </Link>
            <table className="table table-striped table-hover table-responsive">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Thể loại</th>
                        <th>Mô tả</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {genres.map((genre, index) => (
                        <tr key={genre.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{genre.name}</td>
                            <td>{genre.description}</td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <Link
                                        to={`${routes.genresManager}/sua/${genre.id}`}
                                        className="btn btn-warning me-3"
                                    >
                                        Sửa
                                    </Link>
                                    <Modal
                                        buttonText="Xóa"
                                        id={'deleteGenre' + genre.id}
                                        title="NetComics"
                                        body="Bạn có chắc chắn muốn xóa thể loại này?"
                                        closeText="Hủy"
                                        confirmText="Xóa"
                                        onConfirmClick={() => handleDeleteGenre(genre.id)}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
}

export default GenreManager;
