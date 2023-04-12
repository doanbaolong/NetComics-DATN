import { MdDateRange, MdOutlineFiberNew } from 'react-icons/md';
import { AiOutlineEye } from 'react-icons/ai';
import { BiListUl } from 'react-icons/bi';
import { FaCommentAlt, FaHeart } from 'react-icons/fa';
import Breadcrumb from '~/components/Breadcrumb';
import ComicItem from '~/components/ComicItem';
import { Sidebar } from '~/layouts/components';
import FilterButton from '~/components/Button/FilterButton';
import routes from '~/config/routes';
import './Genres.scss';

function Genres() {
    const list = [];
    for (let i = 0; i < 36; i++) {
        list.push(i);
    }

    const breadcrumb = [
        { title: 'Trang chủ', to: routes.home },
        { title: 'Thể loại', to: routes.genres },
    ];

    const filterButtons = [{ text: 'Tất cả' }, { text: 'Hoàn thành' }, { text: 'Đang tiến hành' }];

    const sortButtons = [
        { text: 'Ngày cập nhật', leftIcon: <MdDateRange /> },
        { text: 'Truyện mới', leftIcon: <MdOutlineFiberNew /> },
        { text: 'Top all', leftIcon: <AiOutlineEye /> },
        { text: 'Top tháng', leftIcon: <AiOutlineEye /> },
        { text: 'Top tuần', leftIcon: <AiOutlineEye /> },
        { text: 'Top ngày', leftIcon: <AiOutlineEye /> },
        { text: 'Theo dõi', leftIcon: <FaHeart /> },
        { text: 'Bình luận', leftIcon: <FaCommentAlt /> },
        { text: 'Số chapter', leftIcon: <BiListUl /> },
    ];

    return (
        <>
            <Breadcrumb list={breadcrumb} />
            <div className="main-content">
                <div className="content">
                    <div className="items">
                        <h1 className="text-center">Tất cả truyện tranh</h1>
                        <div className="genre-description">
                            <div className="info">Tất cả thể loại truyện tranh</div>
                        </div>
                        <div className="filter-wrapper">
                            <div className="filter row">
                                <div className="col-3"></div>
                                <div className="col-9 d-flex align-items-center">
                                    {filterButtons.map((filterButton, index) => (
                                        <FilterButton key={index} primary>
                                            {filterButton.text}
                                        </FilterButton>
                                    ))}
                                </div>
                            </div>
                            <div className="sort row">
                                <div className="col-3">
                                    <p className="filter-title">Sắp xếp theo:</p>
                                </div>
                                <div className="col-9 d-flex flex-wrap align-items-center">
                                    {sortButtons.map((sortButton, index) => (
                                        <FilterButton key={index} secondary leftIcon={sortButton.leftIcon}>
                                            {sortButton.text}
                                        </FilterButton>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="row comic-list">
                            {list.map((i) => (
                                <ComicItem key={i} />
                            ))}
                        </div>
                    </div>
                </div>
                <Sidebar genres />
            </div>
        </>
    );
}

export default Genres;
