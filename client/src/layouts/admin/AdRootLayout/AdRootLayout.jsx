import Navbar from '../components/Navbar';
import './AdRootLayout.scss';
import Sidebar from '../components/Sidebar';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function AdRootLayout({ children }) {
    let location = useLocation();
    useEffect(() => {
        window.scrollTo({ top: '0px' });
    }, [location]);
    return (
        <>
            <Sidebar />
            <main className="adm-main">
                <Navbar />
                <div className="main-container">{children}</div>
            </main>
        </>
    );
}

export default AdRootLayout;
