import { TbChevronRight } from 'react-icons/tb';
import Title from '~/components/Title';
import ListComicItem from '~/components/ListComicItem';
import { Sidebar } from '~/layouts/components';
import { useSelector } from 'react-redux';
import { comicSelector } from '~/store/selector';

function Home() {
    const { comics } = useSelector(comicSelector);

    return (
        <>
            {/* <Slide /> */}
            <div className="main-content">
                <div className="content">
                    <div className="items">
                        <Title rigthIcon={<TbChevronRight />}>Truyện mới cập nhật</Title>
                        <ListComicItem list={comics} />
                    </div>
                </div>
                <Sidebar following history />
            </div>
        </>
    );
}

export default Home;
