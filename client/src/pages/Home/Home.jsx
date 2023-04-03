import './Home.scss';
import Title from '~/components/Title';
import ComicItem from '~/components/ComicItem';
function Home() {
    return (
        <main className="wrapper">
            <Title>Truyện mới cập nhật</Title>
            <div className="row comic-list">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                    <ComicItem key={i} />
                ))}
            </div>
        </main>
    );
}

export default Home;
