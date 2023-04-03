import { Header, Sidebar, Footer, Navbar, Slide } from '~/layouts/components';
import './DefaultLayout.scss';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <Navbar />
            <div className="container">
                {/* <Slide /> */}
                <div className="main">
                    <div className="content">{children}</div>
                    <Sidebar />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
