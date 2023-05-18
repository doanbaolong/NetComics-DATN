import { useState, useEffect } from 'react';
// import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FormProvider, useForm } from 'react-hook-form';
import { authSelector } from '~/store/selector';
import InputForm from '~/components/Form/InputForm';
import './Login.scss';
import logoIcon from '~/assets/images/logo-icon.png';
import config from '~/config';
import Alert from '~/components/Alert';
import { adminLogIn } from '~/store/authSlice';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn, role, message, logInStatus } = useSelector(authSelector);
    const methods = useForm();
    const { handleSubmit, setFocus } = methods;

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        message && setError(message);
    }, [message]);

    useEffect(() => {
        if (isLoggedIn && role === 'admin') {
            navigate(config.routes.admin);
        }
    }, [isLoggedIn, navigate, role]);

    useEffect(() => {
        setFocus('userName');
    }, [setFocus]);

    const handleShowHidePassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const handleRemoveError = () => {
        error && setError('');
    };

    const onSubmit = async (data) => {
        dispatch(adminLogIn(data));
    };

    return (
        <>
            <div className="auth-container adm-login">
                <div className="row auth-row">
                    <div className="col-xl-4 col-lg-12 auth-box m-auto">
                        <div className="auth-form">
                            <div className="d-flex align-items-center justify-content-between">
                                <h2 className="mb-3">
                                    <img src={logoIcon} alt="NetComics" className="logo" />
                                    Admin Đăng nhập
                                </h2>
                            </div>
                            {error && <Alert message={error} onClick={handleRemoveError} />}

                            <FormProvider {...methods}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-5">
                                        <InputForm
                                            placeholder={'Tên tài khoản'}
                                            id={'username'}
                                            name={'userName'}
                                            validate={{
                                                required: { value: true, message: 'Vui lòng nhập tài khoản của bạn' },
                                            }}
                                        />
                                        <InputForm
                                            placeholder={'Mật khẩu'}
                                            type={isShowPassword ? 'text' : 'password'}
                                            id={'password'}
                                            RightIcon={isShowPassword ? AiFillEyeInvisible : AiFillEye}
                                            name={'password'}
                                            validate={{
                                                required: { value: true, message: 'Vui lòng nhập mật khẩu của bạn' },
                                                minLength: { value: 6, message: 'Mật khẩu phải lớn hơn 6 kí tự' },
                                            }}
                                            onClick={handleShowHidePassword}
                                        />
                                    </div>

                                    <button className="btn btn-primary w-100 text-uppercase mb-4">
                                        <span>
                                            {logInStatus === 'pending' ? (
                                                <div className="spinner-border text-white" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            ) : (
                                                'Đăng nhập'
                                            )}
                                        </span>
                                    </button>
                                </form>
                            </FormProvider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
