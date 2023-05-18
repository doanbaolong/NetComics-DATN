import { useState, useEffect } from 'react';
// import { FcGoogle } from 'react-icons/fc';
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
    const { isLoggedIn, currentUser, message, logInStatus, signUpStatus } = useSelector(authSelector);
    const methods = useForm();
    const { handleSubmit, setFocus, getValues, reset } = methods;

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowCfPassword, setIsShowCfPassword] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        message && setError(message);
    }, [message]);

    useEffect(() => {
        if (isSignUp) {
            setFocus('fullName');
        } else {
            setFocus('userName');
        }
    }, [isSignUp, setFocus]);

    useEffect(() => {
        reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSignUp]);

    useEffect(() => {
        if (isLoggedIn && currentUser?.isVerified) {
            if (currentUser.status === 'active') {
                navigate(config.routes.home);
            } else {
                setError(`Tài khoản của bạn đã bị khóa do ${currentUser.statusMessage}`);
            }
        }
    }, [currentUser, dispatch, isLoggedIn, navigate]);

    useEffect(() => {
        if (currentUser && !currentUser?.isVerified) {
            navigate(config.routes.verifyEmail);
        }
    }, [currentUser, currentUser?.isVerified, navigate]);

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
                                        {isSignUp ? (
                                            <>
                                                <InputForm
                                                    placeholder={'Họ tên'}
                                                    id={'fullname'}
                                                    name={'fullName'}
                                                    validate={{
                                                        validate: {
                                                            trimStr: (value) =>
                                                                !!value.trim() ? true : 'Vui lòng nhập tên của bạn',
                                                            matchPattern: (v) =>
                                                                /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g.test(
                                                                    v,
                                                                ) || 'Họ tên không hợp lệ',
                                                        },
                                                    }}
                                                />
                                                <InputForm
                                                    placeholder={'Email'}
                                                    type={'email'}
                                                    id={'email'}
                                                    name={'email'}
                                                    validate={{
                                                        validate: {
                                                            trimStr: (value) =>
                                                                !!value.trim() ? true : 'Vui lòng nhập email',
                                                            matchPattern: (v) =>
                                                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                                                                'Email không hợp lệ',
                                                        },
                                                    }}
                                                />
                                                <InputForm
                                                    placeholder={'Tên tài khoản'}
                                                    id={'username'}
                                                    name={'userName'}
                                                    validate={{
                                                        validate: {
                                                            trimStr: (value) =>
                                                                !!value.trim() ? true : 'Vui lòng nhập tên tài khoản',
                                                            minLength: (v) =>
                                                                v.length >= 4 ||
                                                                'Tên tài khoản có ít nhất 4 kí tự, chỉ chứa các chữ cái, số và dấu gạch dưới',
                                                            matchPattern: (v) =>
                                                                /^[a-zA-Z0-9_]+$/.test(v) ||
                                                                'Tên tài khoản có ít nhất 4 kí tự, chỉ chứa các chữ cái, số và dấu gạch dưới',
                                                        },
                                                    }}
                                                />
                                                <InputForm
                                                    placeholder={'Mật khẩu'}
                                                    type={isShowPassword ? 'text' : 'password'}
                                                    id={'password'}
                                                    RightIcon={isShowPassword ? AiFillEyeInvisible : AiFillEye}
                                                    name={'password'}
                                                    validate={{
                                                        required: {
                                                            value: true,
                                                            message: 'Vui lòng nhập mật khẩu của bạn',
                                                        },
                                                        validate: {
                                                            matchPattern: (v) =>
                                                                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
                                                                    v,
                                                                ) ||
                                                                'Mật khẩu chứa ít nhất 6 kí tự, chứa ít nhất 1 chữ cái, 1 số và 1 kí tự đặc biệt',
                                                        },
                                                    }}
                                                    onClick={handleShowHidePassword}
                                                />
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
                                                        validate: (value) => {
                                                            const { password } = getValues();
                                                            return password === value || 'Mật khẩu không trùng khớp';
                                                        },
                                                    }}
                                                    RightIcon={isShowCfPassword ? AiFillEyeInvisible : AiFillEye}
                                                    onClick={handleShowHideCfPassword}
                                                />
                                                <span className="form-text note">
                                                    Chú ý: Mật khẩu chứa ít nhất 6 kí tự, chứa ít nhất một chữ cái, một
                                                    số và một kí tự đặc biệt
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <InputForm
                                                    placeholder={'Tên tài khoản / Email'}
                                                    id={'username'}
                                                    name={'userName'}
                                                    validate={{
                                                        validate: {
                                                            trimStr: (value) =>
                                                                !!value.trim() ? true : 'Vui lòng nhập tên tài khoản',
                                                        },
                                                    }}
                                                />
                                                <InputForm
                                                    placeholder={'Mật khẩu'}
                                                    type={isShowPassword ? 'text' : 'password'}
                                                    id={'password'}
                                                    RightIcon={isShowPassword ? AiFillEyeInvisible : AiFillEye}
                                                    name={'password'}
                                                    validate={{
                                                        required: {
                                                            value: true,
                                                            message: 'Vui lòng nhập mật khẩu của bạn',
                                                        },
                                                    }}
                                                    onClick={handleShowHidePassword}
                                                />
                                            </>
                                        )}
                                    </div>

                                    <button className="btn btn-primary w-100 text-uppercase">
                                        {isSignUp ? (
                                            signUpStatus === 'pending' ? (
                                                <div className="spinner-border text-white" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            ) : (
                                                'Đăng ký'
                                            )
                                        ) : logInStatus === 'pending' ? (
                                            <div className="spinner-border text-white" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : (
                                            'Đăng nhập'
                                        )}
                                    </button>
                                </form>
                            </FormProvider>

                            {/* <div className="ruler">
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
                            </button> */}

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
