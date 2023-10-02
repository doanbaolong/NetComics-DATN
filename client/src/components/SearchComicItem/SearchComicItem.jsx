import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './SearchComicItem.scss';
import noImage from '~/assets/images/no-image.jpg';
import routes from '~/config/routes';

function SearchComicItem({ data }) {
    return (
        <div className="search-comic">
            <Link to={`${routes.comic}${data?.slug}-${data?.id}`} className="search-comic-link">
                <LazyLoadImage
                    src={data?.image ? process.env.REACT_APP_SERVER_URL + data?.image : noImage}
                    alt={data?.name}
                    className="comic-img"
                    effect="opacity"
                />
                <div className="info">
                    <h3 className="name">{data?.name} </h3>
                    <p>
                        {data?.Chapters &&
                            data.Chapters[0]?.chapterNumber &&
                            `Chapter ${data.Chapters[0].chapterNumber}`}
                    </p>
                    <p>{data?.otherName && data.otherName}</p>
                    <p>{data?.Genres && data.Genres.map((genre) => genre.name).join(', ')}</p>
                </div>
            </Link>
        </div>
    );
}

export default SearchComicItem;
