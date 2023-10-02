import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Breadcrumb from '~/components/Breadcrumb';
import Modal from '~/components/Modal';
import routes from '~/config/routes';
import { userSelector } from '~/store/selector';
import { getUsers, lockUser } from '~/store/userSlice';
import { toastSuccess } from '~/util/toastify';
import noAvatar from '~/assets/images/no-avatar-1.png';
import './UserManager.scss';

function UserManager() {
    const breadcrumb = [
        { title: 'Trang chủ', to: routes.admin },
        { title: 'Người dùng', to: routes.userManager },
    ];

    const statusMessageOptions = ['Vi phạm chính sách của NetComics', 'Spam bình luận'];

    const dispatch = useDispatch();

    const { users, lockUserStatus } = useSelector(userSelector);

    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        document.title = 'Danh Sách Người Dùng | NetComics';
    }, []);

    useEffect(() => {
        dispatch(getUsers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (lockUserStatus === 'success') {
            toastSuccess('Cập nhật người dùng thành công');
            dispatch(getUsers());
        }
    }, [lockUserStatus, dispatch]);

    const handleLockUser = (data, id) => {
        const payload = { data, id };
        dispatch(lockUser(payload));
    };

    const handleChangeInput = (e) => {
        setStatusMessage(e.target.value);
    };

    return (
        <div className="manager user-manager">
            <Breadcrumb list={breadcrumb} />
            <h2>Người dùng</h2>
            <div className="table-responsive mt-3">
                <table className="table table-striped table-hover">
                    <thead className="table-info">
                        <tr>
                            <th>#</th>
                            <th>Họ tên</th>
                            <th>Avatar</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Địa chỉ</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <th scope="row">{index + 1}</th>
                                <td className="fullname">{user.fullName}</td>
                                <td>
                                    <img
                                        src={user.avatar ? process.env.REACT_APP_SERVER_URL + user.avatar : noAvatar}
                                        alt="avatar"
                                        className="avatar"
                                    />
                                </td>
                                <td className="email">{user.email}</td>
                                <td className="username">{user.userName}</td>
                                <td className="address">{user.address}</td>
                                <td className="actions">
                                    {user.status === 'active' ? (
                                        <>
                                            <button
                                                type="button"
                                                className="btn btn-danger dropdown-toggle"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                Khóa
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-end">
                                                <p className="p-2 m-0 text-info">Chọn lý do: </p>
                                                {statusMessageOptions.map((message) => (
                                                    <li key={message}>
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={() =>
                                                                handleLockUser(
                                                                    {
                                                                        status: 'locked',
                                                                        statusMessage: message,
                                                                    },
                                                                    user.id,
                                                                )
                                                            }
                                                        >
                                                            {message}
                                                        </button>
                                                    </li>
                                                ))}
                                                <li>
                                                    <hr className="dropdown-divider" />
                                                </li>
                                                <li>
                                                    <div className="p-2 d-flex align-items-center justify-content-between">
                                                        <input
                                                            type="text"
                                                            className="form-control me-3"
                                                            placeholder="Lý do khác"
                                                            value={statusMessage}
                                                            onChange={handleChangeInput}
                                                        />
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() =>
                                                                handleLockUser(
                                                                    {
                                                                        status: 'locked',
                                                                        statusMessage,
                                                                    },
                                                                    user.id,
                                                                )
                                                            }
                                                        >
                                                            Khóa
                                                        </button>
                                                    </div>
                                                </li>
                                            </ul>
                                        </>
                                    ) : (
                                        <div className="d-flex align-items-center">
                                            <Modal
                                                buttonText="Mở khóa"
                                                id={'unlockUser' + user.id}
                                                title="NetComics"
                                                body="Bạn có chắc chắn muốn mở khóa tài khoản này?"
                                                btnColor="success"
                                                closeText="Hủy"
                                                confirmText="Mở khóa"
                                                onConfirmClick={() =>
                                                    handleLockUser(
                                                        {
                                                            status: 'active',
                                                            statusMessage: '',
                                                        },
                                                        user.id,
                                                    )
                                                }
                                            />
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
}

export default UserManager;
