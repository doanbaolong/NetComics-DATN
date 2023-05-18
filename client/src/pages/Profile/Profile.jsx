import { useDispatch, useSelector } from 'react-redux';
import './Profile.scss';
import { BsCameraFill } from 'react-icons/bs';
import { BiPlus } from 'react-icons/bi';
import { authSelector, userSelector } from '~/store/selector';
import noAvatar from '~/assets/images/no-avatar-1.png';
import routes from '~/config/routes';
import { ProfileChangePassword, ProfileForm, ProfileInfo } from '~/components/Profile';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authSlide, getCurrentUser } from '~/store/authSlice';
import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { updateUser, userSlice } from '~/store/userSlice';

function Profile() {
    const { currentUser } = useSelector(authSelector);
    const { updateUserStatus } = useSelector(userSelector);

    const actions = [
        {
            to: routes.profile,
            text: 'Thông tin cá nhân',
            component: <ProfileInfo info={currentUser} />,
        },
        {
            to: routes.profileEdit,
            text: 'Cập nhật thông tin',
            component: <ProfileForm info={currentUser} />,
        },
        {
            to: routes.profileChangePassword,
            text: 'Đổi mật khẩu',
            component: <ProfileChangePassword info={currentUser} />,
        },
    ];

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState();

    useEffect(() => {
        return () => {
            imagePreview && URL.revokeObjectURL(imagePreview);
        };
    });

    useEffect(() => {
        if (updateUserStatus === 'success') {
            setImage();
            setImagePreview();
            dispatch(getCurrentUser());
            dispatch(userSlice.actions.reset());
        }
    }, [dispatch, updateUserStatus]);

    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };
    const handleLogout = () => {
        dispatch(authSlide.actions.logOut());
        navigate(routes.home);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('avatar', image);
        formData.append('fullName', currentUser?.fullName);
        formData.append('userName', currentUser?.userName);
        formData.append('email', currentUser?.email);
        const payload = { formData, id: currentUser?.id };
        dispatch(updateUser(payload));
    };

    const handleDeleteAvatar = () => {
        const formData = new FormData();
        formData.append('avatar', '');
        formData.append('fullName', currentUser?.fullName);
        formData.append('userName', currentUser?.userName);
        formData.append('email', currentUser?.email);
        const payload = { formData, id: currentUser?.id };
        dispatch(updateUser(payload));
    };

    return (
        <div className="profile-wrapper">
            <div className="row profile-container m-0">
                <div className="col-md-4 col-12 left">
                    <div className="avatar-wrapper">
                        <div className="avatar">
                            <img
                                src={
                                    currentUser?.avatar
                                        ? process.env.REACT_APP_SERVER_URL + currentUser?.avatar
                                        : noAvatar
                                }
                                alt="avatar"
                                className="avatar-img"
                            />

                            <button
                                type="button"
                                className="upload-avatar"
                                data-bs-toggle="modal"
                                data-bs-target="#uploadAvatar"
                                title="Ảnh đại diện"
                            >
                                <BsCameraFill />
                            </button>

                            <div
                                className="modal"
                                id="uploadAvatar"
                                tabIndex="-1"
                                aria-labelledby="uploadAvatarLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h2 className="modal-title" id="uploadAvatarLabel">
                                                Cập nhật ảnh đại diện
                                            </h2>
                                            <button
                                                type="button"
                                                className="close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            >
                                                <MdClose />
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <label htmlFor="avatar" className="upload-label">
                                                <BiPlus />
                                                <span className="ms-2">Tải ảnh lên</span>
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                name="avatar"
                                                id="avatar"
                                                className="form-control avatar-input"
                                                onChange={handleChangeImage}
                                            />
                                            {imagePreview && (
                                                <div className="img-preview">
                                                    <span className="title">Ảnh tải lên</span>
                                                    <img src={imagePreview} alt="Ảnh preview" className="img-fluid" />
                                                </div>
                                            )}
                                            <label className="upload-label" onClick={handleDeleteAvatar}>
                                                <span className="ms-2">- Xóa ảnh đại diện</span>
                                            </label>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-info" data-bs-dismiss="modal">
                                                Đóng
                                            </button>
                                            {imagePreview && (
                                                <button
                                                    type="button"
                                                    className="btn btn-success"
                                                    onClick={handleSubmit}
                                                >
                                                    Cập nhật
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="full-name fw-bold text-center mt-3 mb-2">{currentUser?.fullName}</h2>
                    <p className="user-name text-center">@{currentUser?.userName}</p>
                    <ul className="actions">
                        {actions.map((action, index) => (
                            <li key={index}>
                                <Link
                                    to={action.to}
                                    className={'action-link ' + (action.to === location.pathname ? 'active' : '')}
                                >
                                    {action.text}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link className="action-link log-out" onClick={handleLogout}>
                                Đăng xuất
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="col-md-8 col-12 right">
                    {actions.find((action) => action.to === location.pathname)?.component}
                </div>
            </div>
        </div>
    );
}

export default Profile;
