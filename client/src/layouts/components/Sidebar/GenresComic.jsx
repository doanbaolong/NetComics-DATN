import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideWrapper from '~/components/SideWrapper';
import { genreSelector } from '~/store/selector';
import routes from '~/config/routes';
import { ALL } from '~/util/constants';

function GenresComic() {
    const { genres } = useSelector(genreSelector);

    return (
        <SideWrapper title="Thể loại" hide>
            <div className="genre-nav">
                <div className="genres d-flex flex-wrap">
                    <div className="genre-item w-100">
                        <NavLink
                            to={routes.genres + ALL}
                            className={({ isActive, isPending }) => 'nav-link ' + (isActive ? 'active' : '')}
                        >
                            Tất cả thể loại
                        </NavLink>
                    </div>
                    {genres.map((genre) => (
                        <div key={genre.slug} className="genre-item w-50">
                            <NavLink
                                to={routes.genres + genre.slug}
                                className={({ isActive, isPending }) => 'nav-link ' + (isActive ? 'active' : '')}
                            >
                                {genre.name}
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </SideWrapper>
    );
}

export default memo(GenresComic);
