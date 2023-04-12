import { Header, Footer, Navbar } from '~/layouts/components';
import './RootLayout.scss';

function RootLayout({ children }) {
    return (
        <>
            <Header />
            <Navbar />
            <main className="main">
                <div className="container main-container">{children}</div>
            </main>
            <Footer />
        </>
    );
}

export default RootLayout;
