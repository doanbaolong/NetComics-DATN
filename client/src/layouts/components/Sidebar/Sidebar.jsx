import FollowingComic from './FollowingComic';
import HistoryComic from './HistoryComic';
import TopComic from './TopComic';
import GenresComic from './GenresComic';
import './Sidebar.scss';

function Sidebar({ following, history, top, genres }) {
    return (
        <aside className="wrapper">
            {following && <FollowingComic />}
            {history && <HistoryComic />}
            {top && <TopComic />}
            {genres && <GenresComic />}
        </aside>
    );
}

export default Sidebar;
