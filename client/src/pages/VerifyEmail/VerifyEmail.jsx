import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import routes from '~/config/routes';
import { authSelector } from '~/store/selector';
import './VerifyEmail.scss';
import logo from '~/assets/images/logo-icon.png';
import sendEmail from '~/assets/images/send-email.gif';
import { verifyEmail } from '~/store/authSlice';
import { apiSendMail } from '~/services/auth';

function VerifyEmail() {
    const { currentUser, verifyEmailMessage } = useSelector(authSelector);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState();

    const emailToken = searchParams.get('emailToken');
    useEffect(() => {
        if (currentUser?.isVerified) {
            setTimeout(() => navigate(routes.home), 3000);
        } else {
            if (emailToken) {
                dispatch(verifyEmail(emailToken));
            }
        }
    }, [currentUser?.isVerified, dispatch, emailToken, navigate]);

    useEffect(() => {
        if (verifyEmailMessage) {
            setError('Xác thực thất bại');
        }
    }, [verifyEmailMessage]);
    console.log(currentUser);

    const handleSendMail = async () => {
        if (!currentUser) {
            return;
        }
        await apiSendMail(currentUser);
    };

    return (
        <div className="verify-wrapper">
            <div className="verify-email">
                <div className="content">
                    <img src={logo} alt="NetComics" className="logo" />
                    <h1>Verify your account</h1>
                    <p>Link xác thực đã được gửi tới email bạn cung cấp</p>
                    <img src={sendEmail} alt="NetComics-email" className="send-email" />
                    <div className="text-center">
                        <button className="send-again" onClick={handleSendMail}>
                            Bạn không nhận được mail? Gửi lại
                        </button>
                    </div>
                    {currentUser?.isVerified ? (
                        <span>Xác thực thành công, đang chuyển hướng...</span>
                    ) : (
                        <span className="verify-err">{error && error}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VerifyEmail;
