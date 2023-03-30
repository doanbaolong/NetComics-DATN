import { memo } from 'react';
import ConnectForm from '../ConnectForm';
import './InputForm.scss';

function InputForm({ label, id, type = 'text', placeholder, RightIcon, name, validate, onClick }) {
    return (
        <ConnectForm>
            {({ register, formState: { errors } }) => (
                <div className="form-group">
                    <label className="form-label" htmlFor={id}>
                        {label}
                    </label>
                    <div className="input">
                        <input
                            className="form-control"
                            id={id}
                            type={type}
                            placeholder={placeholder}
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
