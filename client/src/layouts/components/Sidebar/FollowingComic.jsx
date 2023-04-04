import { Link } from 'react-router-dom';
import SideWrapper from '~/components/SideWrapper';
import SideComicItem from '~/components/SideWrapper/SideComicItem';

function FollowingComic() {
    return (
        <SideWrapper title="Truyện đang theo dõi" viewAll>
            <SideComicItem
                imageUrl="https://st.ntcdntempv3.com/data/comics/32/sieu-nang-lap-phuong.jpg"
                name="Siêu Năng Lập Phương"
            >
                <div className="d-flex justify-content-between lastest-chapter">
                    <Link className="number">Chapter 20</Link>
                    <span className="time">2 giờ trước</span>
                </div>
            </SideComicItem>
        </SideWrapper>
    );
}

export default FollowingComic;
