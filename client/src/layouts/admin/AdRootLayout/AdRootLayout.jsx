import Navbar from '../components/Navbar';
import './AdRootLayout.scss';
import Sidebar from '../components/Sidebar';

function AdRootLayout({ children }) {
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
