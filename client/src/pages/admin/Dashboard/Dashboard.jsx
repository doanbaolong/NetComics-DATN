import { useSelector } from 'react-redux';
import './Dashboard.scss';
import adminImg from '~/assets/images/admin-dashboard.jpg';
import { authSelector } from '~/store/selector';
import { useEffect } from 'react';
function Dashboard() {
    const { currentAdmin } = useSelector(authSelector);

    useEffect(() => {
        document.title = 'Quản trị | NetComics';
    }, []);

    return (
        <div className="manager dashboard">
            <div className="row">
                <div className="col-md-3 col-12">
                    <img src={adminImg} alt="admin" className="dashboard-img" />
                </div>
                <div className="col-md-9 col-12 content">
                    <h3>Chào mừng trở lại!</h3>
                    <h1 className="text-primary fw-bold">{currentAdmin?.fullName}</h1>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
