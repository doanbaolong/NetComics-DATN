import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { RiListUnordered } from 'react-icons/ri';

import { toastSuccess } from '~/util/toastify';
import { getSingleComic } from '~/store/comicSlice';
import { chapterSelector, comicSelector, followSelector } from '~/store/selector';
import routes from '~/config/routes';
import Modal from '~/components/Modal';
import ComicItemDetail from '~/components/ComicItemDetail';
import Breadcrumb from '~/components/Breadcrumb';
import Title from '~/components/Title';
import { formatChapterDate } from '~/util/formatDate';
import { deleteChapter } from '~/store/chapterSlice';
import { getCountFollow } from '~/store/followSlice';

function ComicManagerDetail() {
    const { id } = useParams();
    const breadcrumb = [
        { title: 'Trang chủ', to: routes.admin },
        { title: 'Truyện tranh', to: routes.comicManager },
        { title: 'Chi tiết truyện', to: routes.comicManagerDetail + id },
    ];

    const dispatch = useDispatch();
    const { comic } = useSelector(comicSelector);
    const { deleteChapterStatus } = useSelector(chapterSelector);
    const { followers } = useSelector(followSelector);

    const [totalView, setTotalView] = useState(0);
    const [ratingComic, setRatingComic] = useState({ count: 0, rating: 0 });

    useEffect(() => {
        document.title = 'Chi Tiết Truyện | NetComics';
    }, []);

    useEffect(() => {
        dispatch(getSingleComic(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (comic && comic?.id) {
            dispatch(getCountFollow(comic?.id));
        }
    }, [comic, comic?.id, dispatch]);

    useEffect(() => {
        const total = comic?.Chapters?.reduce((acc, chap) => acc + chap.view, 0);
        setTotalView(total);
    }, [comic?.Chapters]);

    useEffect(() => {
        if (comic?.Ratings) {
            const total = comic.Ratings?.length;
            const totalRating = comic.Ratings?.reduce((acc, cur) => acc + cur?.rating, 0);

            if (total && totalRating) {
                const rating = (totalRating / total).toFixed(1);
                setRatingComic({ count: total, rating: rating });
            }
        }
    }, [comic?.Ratings]);

    const handleDeleteChapter = (id) => {
        dispatch(deleteChapter(id));
    };

    useEffect(() => {
        if (deleteChapterStatus === 'success') {
            toastSuccess('Xóa chapter thành công');
            dispatch(getSingleComic(id));
        }
    }, [deleteChapterStatus, dispatch, id]);
    return (
        <div className="manager comic-manager">
            <Breadcrumb list={breadcrumb} />
            <Link to={routes.comicManager} className="btn btn-primary mt-2 mb-3">
                Tất cả truyện tranh
            </Link>
            <ComicItemDetail
                admin
                id={comic?.id}
                name={comic?.name}
                otherName={comic?.otherName && comic.otherName}
                updateAt={comic?.updatedAt}
                imageUrl={comic?.image}
                status={comic?.status}
                authors={comic?.Authors}
                genres={comic?.Genres}
                countFollow={followers}
                view={totalView}
                rating={ratingComic}
                content={comic?.content}
            />

            <div className="item-detail">
                <div className="list-chapter">
                    <Title leftIcon={<RiListUnordered />} borderBottom uppercase>
                        Danh sách chương
                    </Title>
                    <Link to={routes.chapterManagerAdd + comic?.id} className="btn btn-primary my-2 me-3">
                        Thêm chap
                    </Link>
                    {Array.isArray(comic?.Chapters) && comic?.Chapters?.length > 0 ? (
                        <>
                            <div className="row">
                                <div className="row col-10 row-heading">
                                    <div className="col-5">Số chương</div>
                                    <div className="col-4 text-center">Cập nhật</div>
                                    <div className="col-3 text-center">Xem</div>
                                </div>
                            </div>

                            <div className="chapters">
                                {Array.isArray(comic?.Chapters) &&
                                    comic.Chapters.map((chapter) => (
                                        <div key={chapter.id} className="row mb-1">
                                            <div className="col-10">
                                                <button
                                                    className="row m-0 chapter-item w-100"
                                                    type="button"
                                                    data-bs-toggle="modal"
                                                    data-bs-target={'#chapterBackdrop' + chapter.id}
                                                >
                                                    <div className="col-5 text-start">
                                                        Chapter {chapter.chapterNumber}
                                                        {chapter.title && ': ' + chapter.title}
                                                    </div>
                                                    <div className="col-4 text-center text-nowrap small-info">
                                                        {formatChapterDate(chapter.updatedAt)}
                                                    </div>
                                                    <div className="col-3 text-center small-info">{chapter.view}</div>
                                                </button>

                                                <div
                                                    className="modal fade"
                                                    id={'chapterBackdrop' + chapter.id}
                                                    data-bs-backdrop="static"
                                                    data-bs-keyboard="false"
                                                    tabIndex="-1"
                                                    aria-labelledby={'chapterBackdropLabel' + chapter.id}
                                                    aria-hidden="true"
                                                >
                                                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h1
                                                                    className="modal-title fs-5"
                                                                    id={'chapterBackdropLabel' + chapter.id}
                                                                >
                                                                    {comic.name} - Chapter {chapter.chapterNumber}
                                                                </h1>
                                                                <button
                                                                    type="button"
                                                                    className="btn-close"
                                                                    data-bs-dismiss="modal"
                                                                    aria-label="Close"
                                                                ></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                {chapter.pictureUrls ? (
                                                                    JSON.parse(chapter.pictureUrls).map(
                                                                        (url, index) => (
                                                                            <img
                                                                                key={index}
                                                                                src={url}
                                                                                className="img-fluid w-100"
                                                                                alt=""
                                                                            />
                                                                        ),
                                                                    )
                                                                ) : (
                                                                    <p className="text-center">Chưa có hình ảnh</p>
                                                                )}
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-info"
                                                                    data-bs-dismiss="modal"
                                                                >
                                                                    Đóng
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-2 d-flex align-items-center text-center p-0">
                                                <Link
                                                    to={routes.chapterManagerEdit + comic.id + '/' + chapter.id}
                                                    className="btn btn-warning me-3"
                                                >
                                                    Sửa
                                                </Link>
                                                <Modal
                                                    buttonText="Xóa"
                                                    id={'deleteChapter' + chapter.id}
                                                    title="NetComics"
                                                    body={`Bạn có chắc chắn muốn xóa Chapter ${chapter.chapterNumber}${
                                                        chapter.title && ': ' + chapter.title
                                                    }?`}
                                                    closeText="Hủy"
                                                    confirmText="Xóa"
                                                    onConfirmClick={() => handleDeleteChapter(chapter.id)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="chapters py-4 text-center">Chưa có chương truyện</div>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ComicManagerDetail;
