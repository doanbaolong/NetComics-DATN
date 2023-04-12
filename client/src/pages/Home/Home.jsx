import { TbChevronRight } from 'react-icons/tb';
import Title from '~/components/Title';
import ComicItem from '~/components/ComicItem';
import { Sidebar, Slide } from '~/layouts/components';
import Pagination from '~/components/Pagination';

function Home() {
    const list = [];
    for (let i = 0; i < 36; i++) {
        list.push(i);
    }
    return (
        <>
            <Slide />
            <div className="main-content">
                <div className="content">
                    <div className="items">
                        <Title rigthIcon={<TbChevronRight />}>Truyện mới cập nhật</Title>
                        <div className="row comic-list">
                            {list.map((i) => (
                                <ComicItem key={i} />
                            ))}
                        </div>
                        <Pagination />
                    </div>
                </div>
                <Sidebar following history top />
            </div>
        </>
    );
}

export default Home;
