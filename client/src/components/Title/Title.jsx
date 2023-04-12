import './Title.scss';
function Title({ leftIcon, rigthIcon, borderBottom = false, uppercase = false, children }) {
    let classNames = 'page-title d-flex align-items-center';
    if (borderBottom) {
        classNames += ' bd-bottom';
    }
    if (uppercase) {
        classNames += ' upper';
    }
    return (
        <h2 className={classNames}>
            {leftIcon} <span>{children}</span> {rigthIcon}
        </h2>
    );
}

export default Title;
