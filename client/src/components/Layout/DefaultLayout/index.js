import { Header, Navbar, Sidebar, Footer } from '~/components/Layout/components';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <Navbar />
            <div className="container">
                <div className="content">{children}</div>
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
