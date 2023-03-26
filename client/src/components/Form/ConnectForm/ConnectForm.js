import { useFormContext } from 'react-hook-form';

function ConnectForm({ children }) {
    const methods = useFormContext();

    return children({ ...methods });
}

export default ConnectForm;
