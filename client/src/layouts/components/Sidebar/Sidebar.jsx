import FollowingComic from './FollowingComic';
import HistoryComic from './HistoryComic';
import TopComic from './TopComic';
import './Sidebar.scss';

function Sidebar() {
    return (
        <aside className="wrapper">
            <FollowingComic />
            <HistoryComic />
            <TopComic />
        </aside>
    );
}

export default Sidebar;
