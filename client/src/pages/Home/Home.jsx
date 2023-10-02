import { useEffect } from 'react';
import Title from '~/components/Title';
import ListComicItem from '~/components/ListComicItem';
import { Sidebar } from '~/layouts/components';
import { useSelector } from 'react-redux';
import { comicSelector } from '~/store/selector';

function Home() {
    const { comics, getComicsLimitStatus } = useSelector(comicSelector);

    useEffect(() => {
        document.title = 'NetComics';
    }, []);
    return (
        <>
            {/* <Slide /> */}
            <div className="main-content">
                <div className="content">
                    <div className="items">
                        <Title>Truyện mới cập nhật</Title>
                        <ListComicItem list={comics} skeleton={getComicsLimitStatus === 'pending' ? true : false} />
                    </div>
                </div>
                <Sidebar following history />
            </div>
        </>
    );
}

export default Home;
