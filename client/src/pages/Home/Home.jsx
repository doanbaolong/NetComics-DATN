import './Home.scss';
import Title from '~/components/Title';
import ComicItem from '~/components/ComicItem';
function Home() {
    const list = [];
    for (let i = 0; i < 36; i++) {
        list.push(i);
    }
    return (
        <main className="wrapper">
            <Title>Truyện mới cập nhật</Title>
            <div className="row comic-list">
                {list.map((i) => (
                    <ComicItem key={i} />
                ))}
            </div>
        </main>
    );
}

export default Home;
