import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiLock2Fill } from 'react-icons/ri';

import { FormProvider, useForm } from 'react-hook-form';
import InputForm from '~/components/Form/InputForm';
import Alert from '~/components/Alert';
import './Profile.scss';
import routes from '~/config/routes';
import { userSelector } from '~/store/selector';
import { userSlice, changePassword } from '~/store/userSlice';
import { authSlide } from '~/store/authSlice';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function ProfileChangePassword({ info }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { changePasswordStatus, changePasswordMessage } = useSelector(userSelector);

    const methods = useForm();
    const { handleSubmit, getValues, reset } = methods;

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowNewPassword, setIsShowNewPassword] = useState(false);
    const [isShowCfPassword, setIsShowCfPassword] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        changePasswordMessage && setError(changePasswordMessage);
        dispatch(userSlice.actions.reset());
    }, [changePasswordMessage, dispatch]);

    useEffect(() => {
        if (changePasswordStatus === 'success') {
            setTimeout(() => {
                dispatch(authSlide.actions.logOut());
                dispatch(userSlice.actions.reset());
                reset();
                return navigate(routes.logIn);
            }, 3000);
        }
    }, [dispatch, navigate, changePasswordStatus, reset]);

    const handleShowHidePassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const handleShowHideNewPassword = () => {
        setIsShowNewPassword(!isShowNewPassword);
    };

    const handleShowHideCfPassword = () => {
        setIsShowCfPassword(!isShowCfPassword);
    };

    const handleRemoveError = () => {
        error && setError('');
    };

    const onSubmit = (data) => {
        const payload = { passwords: { oldPassword: data?.oldPassword, newPassword: data?.newPassword }, id: info?.id };
        dispatch(changePassword(payload));
    };
    return (
        <div className="profile-action">
            <h2 className="profile-title">Đổi mật khẩu</h2>

            <div className="banner d-flex align-item-centers justify-content-between">
                <div className="info-title d-flex align-items-center">
                    <RiLock2Fill />
                    <span>Đổi mật khẩu</span>
                </div>
            </div>
            {changePasswordStatus === 'success' && (
                <p className="text-success mt-3 mb-0">
                    Đổi mật khẩu thành công, vui lòng đăng nhập lại. Đang chuyển hướng...
                </p>
            )}
            {error && <Alert message={error} onClick={handleRemoveError} />}
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5">
                        <InputForm
                            label={'Mật khẩu cũ'}
                            placeholder={'Mật khẩu cũ'}
                            type={isShowPassword ? 'text' : 'password'}
                            id={'oldPassword'}
                            RightIcon={isShowPassword ? AiFillEyeInvisible : AiFillEye}
                            name={'oldPassword'}
                            validate={{
                                required: { value: true, message: 'Vui lòng nhập mật khẩu hiện tại của bạn' },
                            }}
                            onClick={handleShowHidePassword}
                        />
                        <InputForm
                            label={'Mật khẩu mới'}
                            placeholder={'Mật khẩu mới'}
                            type={isShowNewPassword ? 'text' : 'password'}
                            id={'newPassword'}
                            RightIcon={isShowNewPassword ? AiFillEyeInvisible : AiFillEye}
                            name={'newPassword'}
                            validate={{
                                required: { value: true, message: 'Vui lòng nhập mật khẩu mới của bạn' },
                                validate: {
                                    matchPattern: (v) =>
                                        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(v) ||
                                        'Mật khẩu chứa ít nhất 6 kí tự, chứa ít nhất 1 chữ cái, 1 số và 1 kí tự đặc biệt',
                                },
                            }}
                            onClick={handleShowHideNewPassword}
                        />
                        <InputForm
                            label={'Nhập lại mật khẩu'}
                            placeholder={'Nhập lại mật khẩu'}
                            type={isShowCfPassword ? 'text' : 'password'}
                            id={'cnewPassword'}
                            name={'cnewPassword'}
                            validate={{
                                required: {
                                    value: true,
                                    message: 'Vui lòng nhập lại mật khẩu mới của bạn',
                                },
                                validate: (value) => {
                                    const { newPassword } = getValues();
                                    return newPassword === value || 'Mật khẩu không trùng khớp';
                                },
                            }}
                            RightIcon={isShowCfPassword ? AiFillEyeInvisible : AiFillEye}
                            onClick={handleShowHideCfPassword}
                        />
                    </div>

                    <button className="btn btn-success w-100 text-uppercase mb-4">
                        <span>Xác nhận</span>
                    </button>
                </form>
            </FormProvider>
        </div>
    );
}

export default ProfileChangePassword;
