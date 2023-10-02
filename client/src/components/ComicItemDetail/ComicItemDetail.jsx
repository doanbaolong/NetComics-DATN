import { useRef, useState, memo, useLayoutEffect } from 'react';
import { FaUserEdit, FaHeart, FaPlusSquare } from 'react-icons/fa';
import { IoLogoRss } from 'react-icons/io';
import { MdCategory, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { AiFillEye, AiFillStar } from 'react-icons/ai';
import { BsFileEarmarkText } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { authSelector, followSelector } from '~/store/selector';
import './ComicItemDetail.scss';
import Title from '~/components/Title';

import { formatComicDate } from '~/util/formatDate';
import noImage from '~/assets/images/no-image.jpg';
import { Link } from 'react-router-dom';

import RatingModal from '../RatingModal/RatingModal';
import routes from '~/config/routes';

function ComicItemDetail({
    admin = false,
    skeleton = false,
    id,
    slug,
    name,
    otherName,
    updateAt,
    imageUrl,
    authors = [],
    status,
    genres = [],
    view,
    ratingList = [],
    currentUserRating,
    rating,
    countFollow,
    content,
    chapters = [],
    isFollowing,
    followingComicList,
    onAddFollowing,
    onRemoveFollowing,
    onDeleteRating,
}) {
    const detailContentRef = useRef();

    const [detailContentHeight, setDetailContentHeight] = useState(0);

    const [isContentMore, setIsContentMore] = useState(true);

    const { currentUser } = useSelector(authSelector);

    const { addFollowingComicStatus, deleteFollowingComicStatus, getCountFollowStatus } = useSelector(followSelector);

    useLayoutEffect(() => {
        if (!detailContentRef?.current?.clientHeight) return;
        setDetailContentHeight(detailContentRef?.current?.clientHeight);
    }, [detailContentRef?.current?.clientHeight]);

    const handleClickContentMore = () => {
        setIsContentMore(!isContentMore);
    };

    return (
        <div className={'comic-item-detail' + (admin ? ' adm' : '')}>
            {skeleton ? (
                <>
                    <div className="d-flex justify-content-center">
                        <p className="skeleton skeleton-title-detail"></p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <p className="skeleton skeleton-update-time"></p>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="title-detail text-center text-uppercase">{name}</h1>
                    <p className="update-time text-center">[Cập nhật lúc: {formatComicDate(updateAt)}]</p>
                </>
            )}
            <div className="info-detail">
                <div className="row m-0">
                    <div className={'col-md-4 col-12 col-image' + (skeleton ? ' skeleton' : '')}>
                        {skeleton ? null : (
                            <LazyLoadImage
                                src={imageUrl ? process.env.REACT_APP_SERVER_URL + imageUrl : noImage}
                                alt=""
                                effect="opacity"
                            />
                        )}
                    </div>

                    <div className="col-md-8 col-12 col-info">
                        {skeleton ? (
                            <>
                                <div className="info-list">
                                    {new Array(4).fill(2).map((num, index) => (
                                        <div key={index} className="row mb-3 info-row m-0">
                                            <p className="col-3 me-4 skeleton skeleton-info"></p>
                                            <p className="col-7 skeleton skeleton-info"></p>
                                        </div>
                                    ))}
                                </div>
                                <p className="skeleton skeleton-text"></p>
                                <p className="skeleton skeleton-text"></p>
                            </>
                        ) : (
                            <>
                                <div className="info-list">
                                    {otherName && (
                                        <div className="row mb-3 info-row">
                                            <div className="col-4 info-title">
                                                <span>
                                                    <FaPlusSquare /> Tên khác
                                                </span>
                                            </div>
                                            <div className="col-8">{otherName}</div>
                                        </div>
                                    )}
                                    <div className="row mb-3 info-row">
                                        <div className="col-4 info-title">
                                            <span>
                                                <FaUserEdit />
                                                Tác giả
                                            </span>
                                        </div>
                                        <div className="col-8">
                                            {authors.length > 0
                                                ? authors.map((author) => author.name).join(', ')
                                                : 'Đang cập nhật'}
                                        </div>
                                    </div>
                                    <div className="row mb-3 info-row">
                                        <div className="col-4 info-title">
                                            <span>
                                                <IoLogoRss />
                                                Tình trạng
                                            </span>
                                        </div>
                                        <div className="col-8">
                                            <span className={status === 'Hoàn thành' ? 'full' : 'ongoing'}>
                                                {status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row mb-3 info-row">
                                        <div className="col-4 info-title">
                                            <span>
                                                <MdCategory />
                                                Thể loại
                                            </span>
                                        </div>
                                        <div className="col-8">
                                            {genres.length > 0
                                                ? genres.map((genre) => (
                                                      <div key={genre.id} className="d-inline-block">
                                                          {admin ? (
                                                              <span className="genre-link">{genre.name}</span>
                                                          ) : (
                                                              <Link
                                                                  className="genre-link"
                                                                  to={routes.genres + genre.slug}
                                                              >
                                                                  {genre.name}
                                                              </Link>
                                                          )}
                                                          {/* {genre !== genres[genres.length - 1] && (
                                                              <span>&nbsp;-&nbsp;</span>
                                                          )} */}
                                                      </div>
                                                  ))
                                                : 'Đang cập nhật'}
                                        </div>
                                    </div>
                                    <div className="row mb-3 info-row">
                                        <div className="col-4 info-title">
                                            <span>
                                                <AiFillEye />
                                                Lượt xem
                                            </span>
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
                                            <RatingModal
                                                ratingList={ratingList}
                                                currentUserRating={currentUserRating}
                                                ratingAvg={rating?.rating}
                                                ratingCount={rating?.count}
                                                onDeleteRating={onDeleteRating}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="follow d-flex align-items-center">
                                    {!admin &&
                                        (currentUser ? (
                                            isFollowing ? (
                                                <button
                                                    className="btn btn-danger d-flex justify-content-center align-items-center me-3 follow-btn"
                                                    onClick={onRemoveFollowing}
                                                >
                                                    {addFollowingComicStatus === 'pending' ||
                                                    deleteFollowingComicStatus === 'pending' ||
                                                    getCountFollowStatus === 'pending' ? (
                                                        <div className="spinner-border text-white" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <ImCross />
                                                            Bỏ theo dõi
                                                        </>
                                                    )}
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-success d-flex justify-content-center align-items-center me-3 follow-btn"
                                                    onClick={onAddFollowing}
                                                >
                                                    {addFollowingComicStatus === 'pending' ||
                                                    deleteFollowingComicStatus === 'pending' ||
                                                    getCountFollowStatus === 'pending' ? (
                                                        <div className="spinner-border text-white" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <FaHeart />
                                                            Theo dõi
                                                        </>
                                                    )}
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
                                        <b>{countFollow}</b> Lượt theo dõi
                                    </span>
                                </div>
                                {!admin && chapters.length > 0 && (
                                    <div className="read-action">
                                        <Link
                                            to={`${routes.comic}${slug}/chap-${
                                                chapters[chapters.length - 1].chapterNumber
                                            }-${chapters[chapters.length - 1].id}`}
                                            className="btn btn-secondary me-3"
                                        >
                                            Đọc từ đầu
                                        </Link>
                                        <Link
                                            to={`${routes.comic}${slug}/chap-${chapters[0].chapterNumber}-${chapters[0].id}`}
                                            className="btn btn-secondary"
                                        >
                                            Đọc mới nhất
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
            {skeleton ? (
                <>
                    <div className="col-info">
                        <p className="skeleton skeleton-text"></p>
                        <p className="skeleton skeleton-text"></p>
                    </div>
                    <div className="col-info">
                        <p className="skeleton skeleton-text"></p>
                        <p className="skeleton skeleton-text"></p>
                    </div>
                </>
            ) : (
                <div className="detail-content mb-4">
                    <Title leftIcon={<BsFileEarmarkText />} borderBottom uppercase>
                        Nội dung
                    </Title>
                    <p
                        ref={detailContentRef}
                        className={detailContentHeight >= 60 && isContentMore ? 'short-content' : ''}
                    >
                        {content ? (
                            content
                        ) : (
                            <>
                                <Link to={admin ? `${routes.comicManagerDetail}${id}` : `${routes.comic}${slug}`}>
                                    Truyện tranh {name}
                                </Link>{' '}
                                được cập nhật nhanh và đầy đủ nhất.
                            </>
                        )}
                    </p>
                    {!skeleton && detailContentHeight >= 60 && (
                        <button
                            className="d-flex align-items-center pe-4 content-more"
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
            )}
        </div>
    );
}

export default memo(ComicItemDetail);
