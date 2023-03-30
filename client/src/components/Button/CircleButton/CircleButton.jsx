import './CircleButton.scss';
function CircleButton({ icon, hover = false }) {
    return <button className={`header-btn${hover ? ` hover` : ''}`}>{icon}</button>;
}

export default CircleButton;
