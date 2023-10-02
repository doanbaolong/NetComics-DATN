import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './CircleButton.scss';

function CircleButton({ icon, hover = false, mobile = false, tooltipTitle, onClick }) {
    return (
        <Tippy content={tooltipTitle}>
            <button
                className={`header-btn ms-4${hover ? ` hover` : ''}${mobile ? ' mobile-btn' : ''}`}
                onClick={onClick}
            >
                {icon}
            </button>
        </Tippy>
    );
}

export default CircleButton;
