import { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { FormProvider, useForm } from 'react-hook-form';
import { authSelector } from '~/store/selector';
import { logIn, signUp } from '~/store/authSlice';
import InputForm from '~/components/Form/InputForm';
import './Login.scss';
import slogan from '~/assets/images/slogan.png';
import logo from '~/assets/images/logo.png';
import logoIcon from '~/assets/images/logo-icon.png';
import config from '~/config';
import Alert from '~/components/Alert';

function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const isSignUp = location.pathname === config.routes.signUp;
    const dispatch = useDispatch();
    const { isLoggedIn, message } = useSelector(authSelector);
    const methods = useForm();
    const { handleSubmit, getValues, reset } = methods;

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowCfPassword, setIsShowCfPassword] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        isLoggedIn && navigate(config.routes.home);
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        message && setError(message);
    }, [message]);

    useEffect(() => {
        reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSignUp]);

    const handleShowHidePassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const handleShowHideCfPassword = () => {
        setIsShowCfPassword(!isShowCfPassword);
    };

    const handleRemoveError = () => {
        error && setError('');
    };

    const onSubmit = async (data) => {
        isSignUp ? dispatch(signUp(data)) : dispatch(logIn(data));
    };

    return (
        <>
            <div className="auth-header">
                <Link to={config.routes.home}>
                    <img src={logoIcon} alt="NetComisLogo" className="img-fluid" />
                    <img src={logo} alt="NetComisLogo" className="img-fluid" />
                </Link>
                <span>{isSignUp ? 'Đăng ký' : 'Đăng nhập'}</span>
            </div>
            <div className="auth-container bg-primary">
                <div className="row auth-row">
                    <div className="col-xl-8 col-lg-12 text-center m-auto auth-row-logo">
                        <div>
                            <img src={slogan} alt="NetComics" className="logo-icon" />
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-12 auth-box m-auto">
                        <div className="auth-form">
                            <div className="d-flex align-items-center justify-content-between">
                                <h2 className="mb-3">{isSignUp ? 'Đăng ký' : 'Đăng nhập'}</h2>
                            </div>
                            {error && <Alert message={error} onClick={handleRemoveError} />}

                            <FormProvider {...methods}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-5">
                                        {isSignUp && (
                                            <>
                                                <InputForm
                                                    placeholder={'Họ tên'}
                                                    id={'fullname'}
                                                    name={'fullName'}
                                                    validate={{
                                                        required: {
                                                            value: true,
                                                            message: 'Vui lòng nhập họ tên của bạn',
                                                        },
                                                    }}
                                                />
                                                <InputForm
                                                    placeholder={'Email'}
                                                    type={'email'}
                                                    id={'email'}
                                                    name={'email'}
                                                    validate={{
                                                        required: {
                                                            value: true,
                                                            message: 'Vui lòng nhập email của bạn',
                                                        },
                                                    }}
                                                />
                                            </>
                                        )}
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
                                        {isSignUp && (
                                            <>
                                                <InputForm
                                                    placeholder={'Nhập lại mật khẩu'}
                                                    type={isShowCfPassword ? 'text' : 'password'}
                                                    id={'cpassword'}
                                                    name={'cpassword'}
                                                    validate={{
                                                        required: {
                                                            value: true,
                                                            message: 'Vui lòng nhập mật khẩu của bạn',
                                                        },
                                                        minLength: {
                                                            value: 6,
                                                            message: 'Mật khẩu phải lớn hơn 6 kí tự',
                                                        },
                                                        validate: (value) => {
                                                            const { password } = getValues();
                                                            return password === value || 'Mật khẩu không trùng khớp';
                                                        },
                                                    }}
                                                    RightIcon={isShowCfPassword ? AiFillEyeInvisible : AiFillEye}
                                                    onClick={handleShowHideCfPassword}
                                                />
                                                <span className="form-text note">
                                                    Chú ý: Mật khẩu chứa ít nhất 6 kí tự
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    <button className="btn btn-primary w-100 text-uppercase">
                                        {isSignUp ? 'Đăng ký' : 'Đăng nhập'}
                                    </button>
                                </form>
                            </FormProvider>

                            <div className="ruler">
                                <div className="line"></div>
                                <span className="text-uppercase">Hoặc</span>
                                <div className="line"></div>
                            </div>

                            <button
                                variant="light"
                                className="btn btn-primay light w-100 d-flex align-items-center justify-content-center social-btn"
                            >
                                <FcGoogle />
                                <span className="ms-3">
                                    {isSignUp ? 'Đăng ký bằng Google' : 'Đăng nhập bằng Google'}
                                </span>
                            </button>

                            <p className="text-center">
                                {isSignUp ? (
                                    <>
                                        <span>Bạn đã có tài khoản?</span>{' '}
                                        <Link to={config.routes.logIn} onClick={handleRemoveError}>
                                            Đăng nhập
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <span>Bạn mới biết đến NetComics?</span>{' '}
                                        <Link to={config.routes.signUp} onClick={handleRemoveError}>
                                            Đăng ký
                                        </Link>
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
