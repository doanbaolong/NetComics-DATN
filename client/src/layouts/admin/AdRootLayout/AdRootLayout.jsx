import Navbar from '../components/Navbar';
import './AdRootLayout.scss';
import Sidebar from '../components/Sidebar';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useWindowSize } from '~/hooks';

function AdRootLayout({ children }) {
    let location = useLocation();
    useEffect(() => {
        window.scrollTo({ top: '0px' });
    }, [location]);

    const [isClose, setIsClose] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const windowSize = useWindowSize();

    useEffect(() => {
        if (windowSize.innerWidth <= 1200) {
            setIsClose(true);
        } else {
            setIsClose(false);
        }

        if (windowSize.innerWidth > 992) {
            setIsOpen(false);
        }
    }, [windowSize.innerWidth]);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const handleCloseSidebar = () => {
        if (windowSize.innerWidth > 1200) {
            setIsClose(!isClose);
        }
        if (windowSize.innerWidth <= 992) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <>
            <Sidebar isClose={isClose} isOpen={isOpen} />
            <main className="adm-main">
                <Navbar onCloseSidebar={handleCloseSidebar} isOpen={isOpen} />
                <div className="main-container">{children}</div>
            </main>
        </>
    );
}

export default AdRootLayout;
