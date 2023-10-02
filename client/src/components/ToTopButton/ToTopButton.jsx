import { FaAngleUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import './ToTopButton.scss';

function ToTopButton() {
    const [showGoToTop, setShowGoToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 150) {
                setShowGoToTop(true);
            } else {
                setShowGoToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button className={'to-top' + (showGoToTop ? ' show' : '')} onClick={scrollToTop}>
            <FaAngleUp />
        </button>
    );
}

export default ToTopButton;
