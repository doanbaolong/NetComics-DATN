import { useEffect, useState } from 'react';
import { AiFillHome, AiOutlineLike } from 'react-icons/ai';
import { FaCaretDown } from 'react-icons/fa';
import { IoIosEye } from 'react-icons/io';
import { MdUpdate, MdOutlineCloudUpload, MdIncompleteCircle } from 'react-icons/md';
import { apiGetGenres } from '~/services/genre';
import { path } from '~/util/constants';
import NavItems from '../NavItems';
import './Navbar.scss';

function Navbar() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            const response = await apiGetGenres();
            if (response?.data.err === 0) {
                setGenres(response.data.response);
            }
        };
        fetchGenres();
    }, []);

    const menuItems = [
        { title: 'Trang chủ', name: 'home', to: '/', MainIcon: AiFillHome },
        { title: 'Hot', name: 'hot', to: path.HOT },
        { title: 'Theo dõi', name: 'follow', to: path.FOLLOW },
        { title: 'Lịch sử', name: 'history', to: path.HISTORY },
        { title: 'Thể loại', name: 'genres', to: path.GENRES, RightIcon: FaCaretDown, subMenu: genres },
        {
            title: 'Xếp loại',
            name: 'rating',
            to: path.RATING,
            RightIcon: FaCaretDown,
            subMenu: [
                { title: 'Top all', to: '', LeftIcon: IoIosEye },
                { title: 'Top tháng', to: '', LeftIcon: IoIosEye },
                { title: 'Top tuần', to: '', LeftIcon: IoIosEye },
                { title: 'Top ngày', to: '', LeftIcon: IoIosEye },
                { title: 'Truyện full', to: '', LeftIcon: MdIncompleteCircle },
                { title: 'Yêu thích', to: '', LeftIcon: AiOutlineLike },
                { title: 'Mới cập nhật', to: '', LeftIcon: MdUpdate },
                { title: 'Truyện mới', to: '', LeftIcon: MdOutlineCloudUpload },
            ],
        },
        { title: 'Tìm truyện', name: 'search-comic', to: path.SEARCH_COMIC },
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
