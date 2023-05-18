import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './CircleButton.scss';

function CircleButton({ icon, hover = false, tooltipTitle, onClick }) {
    return (
        <Tippy content={tooltipTitle}>
            <button className={`header-btn${hover ? ` hover` : ''}`} onClick={onClick}>
                {icon}
            </button>
        </Tippy>
    );
}

export default CircleButton;
