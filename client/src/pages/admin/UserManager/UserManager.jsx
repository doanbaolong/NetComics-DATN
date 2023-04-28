import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '~/store/selector';
import { getUsers } from '~/store/userSlice';

function UserManager() {
    const dispatch = useDispatch();

    const { users } = useSelector(userSelector);

    useEffect(() => {
        dispatch(getUsers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="manager user-manager">
            <div className="table-responsive mt-3">
                <table className="table table-striped table-hover table-responsive">
                    <thead className="table-info">
                        <tr>
                            <th>#</th>
                            <th>Họ tên</th>
                            <th>Avatar</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Địa chỉ</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.fullName}</td>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>{user.userName}</td>
                                <td>{user.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserManager;
