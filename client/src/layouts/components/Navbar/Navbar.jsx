import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillHome, AiOutlineLike, AiOutlineEye } from 'react-icons/ai';
import { FaCaretDown } from 'react-icons/fa';
import { MdUpdate, MdOutlineCloudUpload, MdIncompleteCircle } from 'react-icons/md';

import { genreSelector } from '~/store/selector';
import { getGenres } from '~/store/genreSlice';
import routes from '~/config/routes';
import NavItems from '../NavItems';
import './Navbar.scss';

function Navbar() {
    const dispatch = useDispatch();
    const { genres } = useSelector(genreSelector);

    useEffect(() => {
        dispatch(getGenres());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const menuItems = [
        { title: 'Trang chủ', name: 'home', to: routes.home, MainIcon: AiFillHome },
        { title: 'Hot', name: 'hot', to: routes.hot },
        { title: 'Theo dõi', name: 'follow', to: routes.follow },
        { title: 'Lịch sử', name: 'history', to: routes.history },
        { title: 'Thể loại', name: 'genres', to: routes.genres, RightIcon: FaCaretDown, subMenu: genres },
        {
            title: 'Xếp loại',
            name: 'rating',
            RightIcon: FaCaretDown,
            subMenu: [
                { title: 'Top all', to: '', LeftIcon: AiOutlineEye },
                { title: 'Top tháng', to: '', LeftIcon: AiOutlineEye },
                { title: 'Top tuần', to: '', LeftIcon: AiOutlineEye },
                { title: 'Top ngày', to: '', LeftIcon: AiOutlineEye },
                { title: 'Truyện full', to: '', LeftIcon: MdIncompleteCircle },
                { title: 'Yêu thích', to: '', LeftIcon: AiOutlineLike },
                { title: 'Mới cập nhật', to: '', LeftIcon: MdUpdate },
                { title: 'Truyện mới', to: '', LeftIcon: MdOutlineCloudUpload },
            ],
        },
        { title: 'Tìm truyện', name: 'search-comic', to: routes.searchComic },
    ];

    return (
        <nav className="nav-bar">
            <div className="container">
                <div className="d-flex align-item-center justify-content-center" id="navbarToggleExternalContent">
                    <ul className="nav-list list-unstyled d-flex">
                        {menuItems.map((menuItem, index) => (
                            <NavItems {...menuItem} key={index} />
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
