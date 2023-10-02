import { Link } from 'react-router-dom';
import './FilterButton.scss';

function FilterButton({ to, href, primary = false, secondary = false, active = false, leftIcon, onClick, children }) {
    let Comp = 'button';
    if (to) {
        Comp = Link;
    } else if (href) {
        Comp = 'a';
    }

    let color = '';
    if (primary) {
        color = 'primary';
    } else if (secondary) {
        color = 'secondary';
    }

    return (
        <div className="w-25 filter-wrapper">
            <Comp
                onClick={onClick}
                className={
                    'd-flex w-100 align-items-center justify-content-center filter-btn' +
                    (color !== '' ? ` ${color}` : color) +
                    (active ? ' active' : '')
                }
            >
                {leftIcon && <span className="d-flex align-items-center me-3">{leftIcon}</span>}
                <span>{children}</span>
            </Comp>
        </div>
    );
}

export default FilterButton;
