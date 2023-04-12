import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserEdit, FaHeart } from 'react-icons/fa';
import { IoLogoRss } from 'react-icons/io';
import { MdCategory, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';
import { CgChevronDoubleDown } from 'react-icons/cg';
import { BsFileEarmarkText } from 'react-icons/bs';
import { RiListUnordered } from 'react-icons/ri';

import Breadcrumb from '~/components/Breadcrumb';
import Title from '~/components/Title';
import { Sidebar } from '~/layouts/components';
import routes from '~/config/routes';
import './ComicDetail.scss';
import StarRating from '~/components/StarRating';

function ComicDetail() {
    const breadcrumb = [
        { title: 'Trang chủ', to: routes.home },
        { title: 'Thể loại', to: routes.genres },
        { title: 'Đại quản gia là ma hoàng', to: routes.comic },
    ];

    const [isContentMore, setIsContentMore] = useState(true);
    const [detailContentHeight, setDetailContentHeight] = useState(0);
    const detailContentRef = useRef();

    useEffect(() => {
        setDetailContentHeight(detailContentRef.current.clientHeight);
    }, []);

    const handleClickContentMore = () => {
        setIsContentMore(!isContentMore);
    };

    return (
        <>
            <Breadcrumb list={breadcrumb} />
            <div className="main-content">
                <div className="content">
                    <div className="items">
                        <div className="item-detail">
                            <h1 className="title-detail text-center text-uppercase">Đại quản gia là ma hoàng</h1>
                            <p className="update-time text-center">[Cập nhật lúc: 10:08 08/04/2023]</p>
                            <div className="info-detail mb-4">
                                <div className="row m-0">
                                    <div className="col-4 col-image">
                                        <img
                                            src="https://st.nettruyenvt.com/data/comics/188/dai-quan-gia-la-ma-hoang.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="col-8 col-info">
                                        <div className="info-list">
                                            <div className="row mb-3 info-row">
                                                <div className="col-4 info-title">
                                                    <FaUserEdit /> <span>Tác giả</span>
                                                </div>
                                                <div className="col-8">Đang cập nhật</div>
                                            </div>
                                            <div className="row mb-3 info-row">
                                                <div className="col-4 info-title">
                                                    <IoLogoRss /> <span>Tình trạng</span>
                                                </div>
                                                <div className="col-8">Đang tiến hành</div>
                                            </div>
                                            <div className="row mb-3 info-row">
                                                <div className="col-4 info-title">
                                                    <MdCategory /> <span>Thể loại</span>
                                                </div>
                                                <div className="col-8">Đang cập nhật</div>
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
                                                        <span className="mb-2">
                                                            Bạn đánh giá thế nào về bộ truyện này?{' '}
                                                        </span>
                                                        <StarRating />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="follow d-flex align-items-center">
                                            <button className="btn btn-success d-flex align-items-center me-3 follow-btn">
                                                <FaHeart />
                                                Theo dõi
                                            </button>
                                            <span>
                                                <b>417.103</b> Lượt theo dõi
                                            </span>
                                        </div>
                                        <div className="read-action">
                                            <button className="btn btn-secondary me-3">Đọc từ đầu</button>
                                            <button className="btn btn-secondary">Đọc mới nhất</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-content mb-4">
                                <Title leftIcon={<BsFileEarmarkText />} borderBottom uppercase>
                                    Nội dung
                                </Title>
                                <p
                                    ref={detailContentRef}
                                    className={detailContentHeight > 60 && isContentMore ? 'short-content' : ''}
                                >
                                    Truyện tranh Đại Quản Gia Là Ma Hoàng được cập nhật nhanh và đầy đủ nhất tại
                                    NetTruyen. Bạn đọc đừng quên để lại bình luận và chia sẻ, ủng hộ NetTruyen ra các
                                    chương mới nhất của truyện Đại Quản Gia Là Ma Hoàng.
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

                            <div className="list-chapter">
                                <Title leftIcon={<RiListUnordered />} borderBottom uppercase>
                                    Danh sách chương
                                </Title>

                                <div className="row row-heading">
                                    <div className="col-5">Số chương</div>
                                    <div className="col-4 text-center">Cập nhật</div>
                                    <div className="col-3 text-center">Xem</div>
                                </div>

                                <div className="chapters">
                                    {new Array(10).fill(1).map((item, index) => (
                                        <Link key={index} className="row m-0 chapter-item">
                                            <div className="col-5">Chapter 382</div>
                                            <div className="col-4 text-center text-nowrap small-info">2 ngày trước</div>
                                            <div className="col-3 text-center small-info">1000</div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Sidebar top />
            </div>
        </>
    );
}

export default ComicDetail;
