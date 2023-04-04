import { Header, Sidebar, Footer, Navbar, Slide } from '~/layouts/components';
import './DefaultLayout.scss';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <Navbar />
            <main className="main">
                {/* <Slide /> */}
                <div className="container main-content">
                    <div className="content">{children}</div>
                    <Sidebar />
                </div>
            </main>
            <Footer />
        </>
    );
}

export default DefaultLayout;
