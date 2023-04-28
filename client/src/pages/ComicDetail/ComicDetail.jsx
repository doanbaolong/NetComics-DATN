import { Link } from 'react-router-dom';
import { RiListUnordered } from 'react-icons/ri';

import Breadcrumb from '~/components/Breadcrumb';
import Title from '~/components/Title';
import { Sidebar } from '~/layouts/components';
import routes from '~/config/routes';
import './ComicDetail.scss';
import ComicItemDetail from '~/components/ComicItemDetail';

function ComicDetail() {
    const breadcrumb = [
        { title: 'Trang chủ', to: routes.home },
        { title: 'Thể loại', to: routes.genres },
        { title: 'Đại quản gia là ma hoàng', to: routes.comic },
    ];

    return (
        <>
            <Breadcrumb list={breadcrumb} />
            <div className="main-content">
                <div className="content">
                    <div className="items">
                        <div className="item-detail">
                            <ComicItemDetail />

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
