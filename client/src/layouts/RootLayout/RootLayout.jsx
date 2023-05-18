import { Header, Footer } from '~/layouts/components';
import './RootLayout.scss';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ToTopButton from '~/components/ToTopButton/ToTopButton';

function RootLayout({ children }) {
    let location = useLocation();
    useEffect(() => {
        window.scrollTo({ top: '0px' });
    }, [location]);

    return (
        <div className="main-wrapper">
            <Header />
            <main className="main">
                <div className="container main-container">{children}</div>
            </main>
            <Footer />
            <ToTopButton />
        </div>
    );
}

export default RootLayout;
