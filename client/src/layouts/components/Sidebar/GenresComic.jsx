import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideWrapper from '~/components/SideWrapper';
import { genreSelector } from '~/store/selector';

function GenresComic() {
    const { genres } = useSelector(genreSelector);

    return (
        <SideWrapper title="Thể loại">
            <div className="genre-nav">
                <div className="genres d-flex flex-wrap">
                    <div className="genre-item w-100">
                        <Link>Tất cả thể loại</Link>
                    </div>
                    {genres.map((genre) => (
                        <div key={genre.slug} className="genre-item w-50">
                            <Link>{genre.name}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </SideWrapper>
    );
}

export default GenresComic;
