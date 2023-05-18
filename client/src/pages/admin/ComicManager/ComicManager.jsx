import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { toastSuccess } from '~/util/toastify';
import { deleteComic, getComics } from '~/store/comicSlice';
import { comicSelector } from '~/store/selector';
import routes from '~/config/routes';
import Modal from '~/components/Modal';
import Breadcrumb from '~/components/Breadcrumb';
import Pagination from '~/components/Pagination';
import noImage from '~/assets/images/no-image.jpg';

function ComicManager() {
    const breadcrumb = [
        { title: 'Trang chủ', to: routes.admin },
        { title: 'Truyện tranh', to: routes.comicManager },
    ];

    const dispatch = useDispatch();
    const { comics, deleteComicStatus } = useSelector(comicSelector);

    const handleDeleteComic = (id) => {
        dispatch(deleteComic(id));
    };

    useEffect(() => {
        if (deleteComicStatus === 'success') {
            toastSuccess('Xóa truyện thành công');
            dispatch(getComics());
        }
    }, [deleteComicStatus, dispatch]);
    return (
        <div className="manager comic-manager">
            <Breadcrumb list={breadcrumb} />
            <h2>Truyện tranh</h2>
            <Link to={routes.comicManagerAdd} className="btn btn-primary mt-3 mb-2">
                Thêm truyện tranh
            </Link>
            <div className="table-responsive mt-3">
                <table className="table table-striped table-border table-hover">
                    <thead className="table-info">
                        <tr>
                            <th>#</th>
                            <th>Tên truyện</th>
                            <th>Hình ảnh</th>
                            <th>Thể loại</th>
                            <th>Tác giả</th>
                            <th>Trạng thái</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {comics.map((comic, index) => (
                            <tr key={comic.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{comic.name}</td>
                                <td>
                                    <img
                                        src={comic.image ? process.env.REACT_APP_SERVER_URL + comic.image : noImage}
                                        alt=""
                                    />
                                </td>
                                <td>
                                    {comic.Genres?.length > 0
                                        ? comic.Genres.map((genre) => genre.name).join(' - ')
                                        : 'Chưa cập nhật'}
                                </td>
                                <td>
                                    {comic.Authors?.length > 0
                                        ? comic.Authors.map((author) => author.name).join(' - ')
                                        : 'Chưa cập nhật'}
                                </td>
                                <td>{comic.status}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <Link
                                            to={routes.comicManagerDetail + comic.id}
                                            className="btn btn-primary me-3"
                                        >
                                            Chi tiết
                                        </Link>
                                        <Link to={routes.chapterManagerAdd + comic.id} className="btn btn-success me-3">
                                            Thêm chapter
                                        </Link>
                                        <Link to={routes.comicManagerEdit + comic.id} className="btn btn-warning me-3">
                                            Sửa
                                        </Link>
                                        <Modal
                                            buttonText="Xóa"
                                            id={'deleteComic' + comic.id}
                                            title="NetComics"
                                            body="Bạn có chắc chắn muốn xóa tên truyện này? (Chú ý: Khi xác nhận, tất cả dữ liệu về truyện sẽ bị xóa)"
                                            closeText="Hủy"
                                            confirmText="Xóa"
                                            onConfirmClick={() => handleDeleteComic(comic.id)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination />
            </div>
            <ToastContainer />
        </div>
    );
}

export default ComicManager;
