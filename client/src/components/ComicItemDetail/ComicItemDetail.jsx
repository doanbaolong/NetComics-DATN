import { useEffect, useRef, useState, memo } from 'react';
import { FaUserEdit, FaHeart, FaPlusSquare } from 'react-icons/fa';
import { IoLogoRss } from 'react-icons/io';
import { MdCategory, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';
import { CgChevronDoubleDown } from 'react-icons/cg';
import { BsFileEarmarkText } from 'react-icons/bs';

import './ComicItemDetail.scss';
import Title from '~/components/Title';
import StarRating from '~/components/StarRating';
import { formatComicDate } from '~/util/formatDate';
import noImage from '~/assets/images/no-image.jpg';

function ComicItemDetail({
    admin = false,
    name,
    otherName = [],
    updateAt,
    imageUrl,
    authors = [],
    status,
    genres = [],
    view,
    rating,
    follow,
    content,
}) {
    const [detailContentHeight, setDetailContentHeight] = useState(0);

    const [isContentMore, setIsContentMore] = useState(true);

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
                                    <IoLogoRss /> <span>Tình trạng</span>
                                </div>
                                <div className="col-8">{status}</div>
                            </div>
                            <div className="row mb-3 info-row">
                                <div className="col-4 info-title">
                                    <MdCategory /> <span>Thể loại</span>
                                </div>
                                <div className="col-8">
                                    {genres.length > 0 ? genres.map((genre) => genre.name).join(', ') : 'Đang cập nhật'}
                                </div>
                            </div>
                            <div className="row mb-3 info-row">
                                <div className="col-4 info-title">
                                    <AiFillEye /> <span>Lượt xem</span>
                                </div>
                                <div className="col-8">0</div>
                            </div>
                        </div>
                        <div className="review">
                            <span>Xếp hạng: 4.1/5 - 169947 Lượt đánh giá </span>
                            {!admin && (
                                <div className="rating mt-3">
                                    <button
                                        className="btn btn-info d-flex align-items-center review-btn"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#starRating"
                                        aria-expanded="false"
                                        aria-controls="starRating"
                                    >
                                        <span>Đánh giá</span> <CgChevronDoubleDown />
                                    </button>
                                    <div className="collapse" id="starRating">
                                        <div className="card card-body">
                                            <span className="mb-2">Bạn đánh giá thế nào về bộ truyện này? </span>
                                            <StarRating />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="follow d-flex align-items-center">
                            {!admin && (
                                <button className="btn btn-success d-flex align-items-center me-3 follow-btn">
                                    <FaHeart />
                                    Theo dõi
                                </button>
                            )}
                            <span>
                                <b>417.103</b> Lượt theo dõi
                            </span>
                        </div>
                        {!admin && (
                            <div className="read-action">
                                <button className="btn btn-secondary me-3">Đọc từ đầu</button>
                                <button className="btn btn-secondary">Đọc mới nhất</button>
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
