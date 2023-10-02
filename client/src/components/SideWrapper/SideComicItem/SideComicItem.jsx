import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './SideComicItem.scss';
import routes from '~/config/routes';
import { formatChapterDate } from '~/util/formatDate';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '~/store/selector';

function SideComicItem({
    imageUrl,
    comicUrl,
    id,
    name,
    slug,
    rank = null,
    following = false,
    histories,
    chapter,
    children,
}) {
    const { currentUser } = useSelector(authSelector);

    const [historyChapterList, setHistoryChapterList] = useState([]);

    useEffect(() => {
        let localList = [],
            accountList = [];

        const localArray = JSON.parse(localStorage.getItem('histories'));
        if (localArray?.length > 0) {
            const localFind = localArray.find((i) => i.id === id);
            if (localFind) {
                localList = localFind?.chapterIds;
            }
        }

        if (currentUser) {
            const find = histories?.find((h) => h.id === currentUser?.id);
            if (find) {
                accountList = find?.History?.chapterIds?.split(',').map((i) => +i);
            }
        }

        if (Array.isArray(localList) && Array.isArray(accountList)) {
            if (localList?.length > 0 || accountList?.length > 0) {
                const finalArray = Array.from(new Set([...localList, ...accountList]));
                setHistoryChapterList(finalArray);
            }
        }
    }, [currentUser, histories, id]);

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
            <Link to={comicUrl} className="img-link">
                <LazyLoadImage src={imageUrl} alt={name} className="item-img" effect="opacity" />
            </Link>
            <div className="item-info">
                <h3 className="title">
                    <Link to={comicUrl}>{name}</Link>
                </h3>
                {following && (
                    <div className="d-flex justify-content-between lastest-chapter">
                        <Link
                            to={`${routes.comic}${slug}/chap-${chapter?.chapterNumber}-${chapter?.id}`}
                            className={'number' + (historyChapterList?.indexOf(chapter?.id) !== -1 ? ' read' : '')}
                        >
                            {chapter && 'Chapter ' + chapter?.chapterNumber}
                        </Link>
                        <span className="time">{chapter && formatChapterDate(chapter?.chapterUpdatedAt)}</span>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}

export default SideComicItem;
