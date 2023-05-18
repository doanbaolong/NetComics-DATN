import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillHome } from 'react-icons/ai';
import { FaCaretDown } from 'react-icons/fa';

import { genreSelector } from '~/store/selector';
import { getGenres } from '~/store/genreSlice';
import routes from '~/config/routes';
import NavItems from '../NavItems';
import './Navbar.scss';
import { ALL } from '~/util/constants';

function Navbar({ showMobileNavbar }) {
    const dispatch = useDispatch();
    const { genres } = useSelector(genreSelector);

    useEffect(() => {
        dispatch(getGenres());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const menuItems = [
        { title: 'Trang chủ', name: 'home', to: routes.home, MainIcon: AiFillHome },
        { title: 'Theo dõi', name: 'follow', to: routes.follow },
        { title: 'Lịch sử', name: 'history', to: routes.history },
        { title: 'Thể loại', name: 'genres', to: routes.genres + ALL, RightIcon: FaCaretDown, subMenu: genres },
        { title: 'Tìm truyện', name: 'search-comic', to: routes.searchComic },
    ];

    return (
        <>
            <nav className="nav-bar">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-center">
                        <ul className="nav-list list-unstyled d-flex">
                            {menuItems.map((menuItem, index) => (
                                <NavItems {...menuItem} key={index} />
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
            <nav className={'nav-bar-collapse' + (showMobileNavbar ? ' show' : '')}>
                <div className="nav-toggle">
                    <ul className="nav-list list-unstyled">
                        {menuItems.map((menuItem, index) => (
                            <NavItems {...menuItem} showMobileNavbar={showMobileNavbar} key={index} />
                        ))}
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
