import { Link } from 'react-router-dom';
import { TbClockHour3 } from 'react-icons/tb';
import './SlideItem.scss';

function SlideItem({ to, imageUrl, name, chapterNumber, chapterUrl, time }) {
    return (
        <div className="slide-wrapper">
            <div className="slide-item">
                <Link to={to}>
                    <img src={imageUrl} alt={name} className="slide-item-img" />
                </Link>
                <div className="slide-item-caption">
                    <h3>
                        <Link to={to}>{name}</Link>
                    </h3>
                    <div className="slide-item-caption-bottom">
                        <Link to={chapterUrl}>Chapter {chapterNumber}</Link>
                        <span>
                            <TbClockHour3 />
                            {time}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SlideItem;
