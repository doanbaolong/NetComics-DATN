import './RecButton.scss';

function RecButton({ title, leftIcon, primary, secondary, green, outline, active = false }) {
    return (
        <button className={'d-flex align-items-center justify-content-center rec-btn' + (active ? ' active' : '')}>
            {leftIcon && <span className="icon me-3">{leftIcon}</span>}
            <span>{title}</span>
        </button>
    );
}

export default RecButton;
