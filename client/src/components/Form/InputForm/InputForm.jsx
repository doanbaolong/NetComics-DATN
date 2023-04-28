import { memo } from 'react';
import ConnectForm from '../ConnectForm';
import './InputForm.scss';

function InputForm({
    textarea = false,
    readOnly = false,
    label,
    id,
    type = 'text',
    placeholder,
    value,
    RightIcon,
    name,
    validate,
    onClick,
}) {
    let Comp = textarea ? 'textarea' : 'input';
    return (
        <ConnectForm>
            {({ register, formState: { errors } }) => (
                <div className="form-group">
                    <label className="form-label" htmlFor={id}>
                        {label}
                    </label>
                    <div className="input">
                        <Comp
                            readOnly={readOnly}
                            className="form-control"
                            id={id}
                            type={type}
                            placeholder={placeholder}
                            value={value}
                            {...register(name, validate)}
                        />
                        {RightIcon && (
                            <span className="input-icon" onClick={onClick}>
                                <RightIcon />
                            </span>
                        )}
                    </div>
                    {errors[name] && <span className="form-text text-danger">{errors[name].message}</span>}
                </div>
            )}
        </ConnectForm>
    );
}

export default memo(InputForm);
