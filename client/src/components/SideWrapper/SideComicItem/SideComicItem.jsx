import { Link } from 'react-router-dom';
import './SideComicItem.scss';

function SideComicItem({ imageUrl, comicUrl, name, rank = null, children }) {
    return (
        <div className="d-flex align-items-start side-item">
            {rank && (
                <div
                    className={
                        'rank' + (rank === '01' ? ' one' : rank === '02' ? ' two' : rank === '03' ? ' three' : '')
                    }
                >
                    {rank}
                </div>
            )}
            <Link to={comicUrl}>
                <img src={imageUrl} alt={name} className="item-img" />
            </Link>
            <div className="item-info">
                <h3 className="title">
                    <Link to={comicUrl}>{name}</Link>
                </h3>
                {children}
            </div>
        </div>
    );
}

export default SideComicItem;
