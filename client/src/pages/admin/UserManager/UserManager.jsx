function UserManager() {
    return (
        <div className="user-manager">
            <table className="table table-striped table-hover table-responsive">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Họ tên</th>
                        <th>Avatar</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Địa chỉ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Larry the Bird</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default UserManager;
