import Select from 'react-select';
import { memo } from 'react';
import { Controller } from 'react-hook-form';
import ConnectForm from '../ConnectForm';

function SelectForm({
    label,
    selectName,
    options,
    defaultValue,
    isSearchable = false,
    isClearable = false,
    isMulti = false,
    isDisabled = false,
    placeholder,
    noOptionsMessage,
    validate,
}) {
    return (
        <ConnectForm>
            {({ control, formState: { errors } }) => (
                <div className="form-group">
                    <label className="form-label" htmlFor={selectName}>
                        {label}
                    </label>
                    <Controller
                        name={selectName}
                        control={control}
                        defaultValue={defaultValue?.value || null}
                        render={({ field }) => {
                            const { onChange, value, name } = field;

                            return (
                                <Select
                                    key={defaultValue}
                                    name={name}
                                    options={options}
                                    defaultValue={defaultValue}
                                    isSearchable={isSearchable}
                                    isClearable={isClearable}
                                    isMulti={isMulti}
                                    isDisabled={isDisabled}
                                    placeholder={placeholder}
                                    noOptionsMessage={() => noOptionsMessage}
                                    value={options.find((obj) => obj.value === value)}
                                    onChange={(val) => {
                                        isMulti ? onChange(val.map((c) => c.value)) : onChange(val.value);
                                    }}
                                />
                            );
                        }}
                        rules={validate}
                    />
                    {errors[selectName] && <span className="form-text text-danger">{errors[selectName].message}</span>}
                </div>
            )}
        </ConnectForm>
    );
}

export default memo(SelectForm);
