import { Link } from 'react-router-dom';
import './SearchComicItem.scss';
import noImage from '~/assets/images/no-image.jpg';
import routes from '~/config/routes';

function SearchComicItem({ data }) {
    return (
        <div className="search-comic">
            <Link to={`${routes.comic}${data?.slug}`} className="search-comic-link">
                <img
                    src={data?.image ? process.env.REACT_APP_SERVER_URL + data?.image : noImage}
                    alt={data?.name}
                    className="comic-img"
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
