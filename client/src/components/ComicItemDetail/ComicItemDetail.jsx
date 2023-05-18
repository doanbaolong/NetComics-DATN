import { useEffect, useRef, useState, memo } from 'react';
import { FaUserEdit, FaHeart, FaPlusSquare } from 'react-icons/fa';
import { IoLogoRss } from 'react-icons/io';
import { MdCategory, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { AiFillEye, AiFillStar } from 'react-icons/ai';

import { BsFileEarmarkText } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { useSelector } from 'react-redux';

import { authSelector, comicSelector } from '~/store/selector';
import './ComicItemDetail.scss';
import Title from '~/components/Title';

import { formatComicDate } from '~/util/formatDate';
import noImage from '~/assets/images/no-image.jpg';
import { Link } from 'react-router-dom';

import RatingModal from '../RatingModal/RatingModal';
import routes from '~/config/routes';

function ComicItemDetail({
    admin = false,
    id,
    name,
    otherName,
    updateAt,
    imageUrl,
    authors = [],
    status,
    genres = [],
    view,
    rating,
    countFollow,
    content,
    isFollowing,
    followingComicList,
    onAddFollowing,
    onRemoveFollowing,
}) {
    const [detailContentHeight, setDetailContentHeight] = useState(0);

    const [isContentMore, setIsContentMore] = useState(true);

    const { currentUser } = useSelector(authSelector);
    const { comic } = useSelector(comicSelector);

    const detailContentRef = useRef();

    useEffect(() => {
        setDetailContentHeight(detailContentRef.current.clientHeight);
    }, []);

    const handleClickContentMore = () => {
        setIsContentMore(!isContentMore);
    };

    return (
        <div className={'comic-item-detail' + (admin ? ' adm' : '')}>
            <h1 className="title-detail text-center text-uppercase">{name}</h1>
            <p className="update-time text-center">[Cập nhật lúc: {formatComicDate(updateAt)}]</p>
            <div className="info-detail mb-4">
                <div className="row m-0">
                    <div className="col-4 col-image">
                        <img src={imageUrl ? process.env.REACT_APP_SERVER_URL + imageUrl : noImage} alt="" />
                    </div>
                    <div className="col-8 col-info">
                        <div className="info-list">
                            {otherName && (
                                <div className="row mb-3 info-row">
                                    <div className="col-4 info-title">
                                        <FaPlusSquare /> <span>Tên khác</span>
                                    </div>
                                    <div className="col-8">{otherName}</div>
                                </div>
                            )}
                            <div className="row mb-3 info-row">
                                <div className="col-4 info-title">
                                    <FaUserEdit /> <span>Tác giả</span>
                                </div>
                                <div className="col-8">
                                    {authors.length > 0
                                        ? authors.map((author) => author.name).join(', ')
                                        : 'Đang cập nhật'}
                                </div>
                            </div>
                            <div className="row mb-3 info-row">
                                <div className="col-4 info-title">
                                    <IoLogoRss />
                                    <span>Tình trạng</span>
                                </div>
                                <div className="col-8">{status}</div>
                            </div>
                            <div className="row mb-3 info-row">
                                <div className="col-4 info-title">
                                    <MdCategory /> <span>Thể loại</span>
                                </div>
                                <div className="col-8">
                                    {genres.length > 0
                                        ? genres.map((genre) => (
                                              <div key={genre.id} className="d-inline-block">
                                                  <Link className="genre-link" to={routes.genres + genre.slug}>
                                                      {genre.name}
                                                  </Link>
                                                  {genre !== genres[genres.length - 1] && <span> - </span>}
                                              </div>
                                          ))
                                        : 'Đang cập nhật'}
                                </div>
                            </div>
                            <div className="row mb-3 info-row">
                                <div className="col-4 info-title">
                                    <AiFillEye /> <span>Lượt xem</span>
                                </div>
                                <div className="col-8">{view}</div>
                            </div>
                        </div>
                        <div className="review">
                            <span>
                                Xếp hạng: {rating?.rating}
                                <AiFillStar /> - {rating?.count} Lượt đánh giá
                            </span>
                            {!admin && (
                                <div className="rating mt-3">
                                    <RatingModal comic={comic} ratingAvg={rating?.rating} ratingCount={rating?.count} />
                                </div>
                            )}
                        </div>
                        <div className="follow d-flex align-items-center">
                            {!admin &&
                                (currentUser ? (
                                    isFollowing ? (
                                        <button
                                            className="btn btn-danger d-flex align-items-center me-3 follow-btn"
                                            onClick={onRemoveFollowing}
                                        >
                                            <ImCross />
                                            Bỏ theo dõi
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-success d-flex justify-content-center align-items-center me-3 follow-btn"
                                            onClick={onAddFollowing}
                                        >
                                            <FaHeart />
                                            Theo dõi
                                        </button>
                                    )
                                ) : followingComicList.find((item) => item === id) ? (
                                    <button
                                        className="btn btn-danger d-flex justify-content-center align-items-center me-3 follow-btn"
                                        onClick={onRemoveFollowing}
                                    >
                                        <ImCross />
                                        Bỏ theo dõi
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-success d-flex justify-content-center align-items-center me-3 follow-btn"
                                        onClick={onAddFollowing}
                                    >
                                        <FaHeart />
                                        Theo dõi
                                    </button>
                                ))}
                            <span>
                                <b>{countFollow || 0}</b> Lượt theo dõi
                            </span>
                        </div>
                        {!admin && (
                            <div className="read-action">
                                <Link className="btn btn-secondary me-3">Đọc từ đầu</Link>
                                <Link className="btn btn-secondary">Đọc mới nhất</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="detail-content mb-4">
                <Title leftIcon={<BsFileEarmarkText />} borderBottom uppercase>
                    Nội dung
                </Title>
                <p ref={detailContentRef} className={detailContentHeight > 60 && isContentMore ? 'short-content' : ''}>
                    {content}
                </p>
                {detailContentHeight > 60 && (
                    <button
                        className="d-flex align-items-center pe-4 text-primary content-more"
                        onClick={handleClickContentMore}
                    >
                        {isContentMore ? (
                            <>
                                Xem thêm <MdKeyboardArrowDown />
                            </>
                        ) : (
                            <>
                                Thu gọn <MdKeyboardArrowUp />
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}

export default memo(ComicItemDetail);
