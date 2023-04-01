import { Header, Sidebar, Footer, Navbar, Slide } from '~/components/Layout/components';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <Navbar />
            <div className="container">
                <Slide />
                <div className="content">{children}</div>
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
