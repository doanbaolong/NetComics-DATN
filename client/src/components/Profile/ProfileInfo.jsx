import { RiUserSmileFill } from 'react-icons/ri';
import { HiChevronRight } from 'react-icons/hi';
import './Profile.scss';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import { memo } from 'react';

function ProfileInfo({ info }) {
    return (
        <div className="profile-action">
            <h2 className="profile-title">Thông tin cá nhân</h2>

            <div className="banner d-flex align-item-centers justify-content-between">
                <div className="info-title d-flex align-items-center">
                    <RiUserSmileFill />
                    <span>Thông tin</span>
                </div>
                <Link to={routes.profileEdit} className="edit-link d-flex align-items-center">
                    <span>Chỉnh sửa</span>
                    <HiChevronRight />
                </Link>
            </div>

            <div className="info-detail">
                <div className="row">
                    <div className="col-12 col-lg-2 title">Họ tên:</div>
                    <div className="col-12 col-lg-10">{info?.fullName}</div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-2 title">Email:</div>
                    <div className="col-12 col-lg-10">{info?.email}</div>
                </div>
                {info?.address && (
                    <div className="row">
                        <div className="col-12 col-lg-2 title">Địa chỉ:</div>
                        <div className="col-12 col-lg-10">{info?.address}</div>
                    </div>
                )}
                {(info?.gender === 1 || info?.gender === 0) && (
                    <div className="row">
                        <div className="col-12 col-lg-2 title">Giới tính:</div>
                        <div className="col-12 col-lg-10">{info?.gender === 1 ? 'Nam' : 'Nữ'}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(ProfileInfo);
