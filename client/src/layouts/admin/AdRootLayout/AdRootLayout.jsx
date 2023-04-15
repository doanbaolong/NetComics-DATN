import Navbar from '../components/Navbar';
import './AdRootLayout.scss';
import Sidebar from '../components/Sidebar';

function AdRootLayout({ children }) {
    return (
        <div className="d-flex">
            <Sidebar />
            <main className="adm-main">
                <Navbar />
                <div className="main-container">{children}</div>
            </main>
        </div>
    );
}

export default AdRootLayout;
