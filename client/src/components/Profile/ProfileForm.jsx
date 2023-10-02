import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';

import { FormProvider, useForm } from 'react-hook-form';
import InputForm from '~/components/Form/InputForm';
import Alert from '~/components/Alert';
import './Profile.scss';
import routes from '~/config/routes';
import { userSelector } from '~/store/selector';
import { userSlice, updateUser } from '~/store/userSlice';
import { getCurrentUser } from '~/store/authSlice';
import { trimString } from '~/util/trimString';
import SelectForm from '../Form/SelectForm/SelectForm';

function ProfileForm({ info }) {
    const genderOptions = [
        { value: 1, label: 'Nam' },
        { value: 0, label: 'Nữ' },
    ];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { updateUserStatus, updateUserMessage } = useSelector(userSelector);

    const methods = useForm();
    const { handleSubmit, setValue } = methods;

    const [error, setError] = useState('');

    useEffect(() => {
        updateUserMessage && setError(updateUserMessage);
    }, [updateUserMessage]);

    useEffect(() => {
        const fields = ['fullName', 'userName', 'email', 'address', 'gender'];
        fields.forEach((field) => {
            if (info && info[field]) {
                setValue(field, info[field]);
            }
        });
    }, [info, setValue]);

    useEffect(() => {
        if (updateUserStatus === 'success') {
            dispatch(getCurrentUser());
            navigate(routes.profile);
            dispatch(userSlice.actions.reset());
        }
    }, [dispatch, navigate, updateUserStatus]);

    const handleRemoveError = () => {
        error && setError('');
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('avatar', info.avatar || '');
        if (data.gender === null) {
            data.gender = -1;
        }
        const dataTrim = trimString(data);
        for (let key in dataTrim) {
            formData.append(key, dataTrim[key]);
        }
        const payload = { formData, id: info?.id };
        dispatch(updateUser(payload));
    };
    return (
        <div className="profile-action">
            <h2 className="profile-title">Cập nhật thông tin cá nhân</h2>

            <div className="banner d-flex align-item-centers justify-content-between">
                <div className="info-title d-flex align-items-center">
                    <AiFillEdit />
                    <span>Cập nhật thông tin</span>
                </div>
            </div>

            {error && <Alert message={error} onClick={handleRemoveError} />}
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5">
                        <InputForm
                            label={'Tên tài khoản'}
                            placeholder={'Tên tài khoản'}
                            id={'username'}
                            name={'userName'}
                            validate={{
                                validate: {
                                    trimStr: (value) => (!!value.trim() ? true : 'Vui lòng nhập tên tài khoản'),
                                    minLength: (v) =>
                                        v.length >= 4 ||
                                        'Tên tài khoản có ít nhất 4 kí tự, chỉ chứa các chữ cái, số và dấu gạch dưới',
                                    matchPattern: (v) =>
                                        /^[a-zA-Z0-9_]+$/.test(v) ||
                                        'Tên tài khoản có ít nhất 4 kí tự, chỉ chứa các chữ cái, số và dấu gạch dưới',
                                },
                            }}
                            readOnly
                        />
                        <InputForm
                            label={'Email'}
                            placeholder={'Email'}
                            type={'email'}
                            id={'email'}
                            name={'email'}
                            validate={{
                                validate: {
                                    trimStr: (value) => (!!value.trim() ? true : 'Vui lòng nhập email'),
                                    matchPattern: (v) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email không hợp lệ',
                                },
                            }}
                            readOnly
                        />
                        <InputForm
                            label={'Họ tên'}
                            placeholder={'Họ tên'}
                            id={'fullname'}
                            name={'fullName'}
                            validate={{
                                validate: {
                                    trimStr: (value) => (!!value.trim() ? true : 'Vui lòng nhập tên của bạn'),
                                    matchPattern: (v) =>
                                        /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g.test(
                                            v,
                                        ) || 'Họ tên không hợp lệ',
                                },
                            }}
                        />

                        <InputForm
                            label={'Địa chỉ'}
                            placeholder={'Địa chỉ'}
                            type={'address'}
                            id={'address'}
                            name={'address'}
                        />

                        <SelectForm
                            label="Giới tính"
                            selectName="gender"
                            placeholder="Chọn giới tính"
                            options={genderOptions}
                            defaultValue={genderOptions.find((genderOption) => genderOption.value === info?.gender)}
                        />
                    </div>

                    <button className="btn btn-success w-100 text-uppercase mb-4">
                        {updateUserStatus === 'pending' ? (
                            <div className="spinner-border text-white" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            <span>Cập nhật</span>
                        )}
                    </button>
                </form>
            </FormProvider>
        </div>
    );
}

export default ProfileForm;
