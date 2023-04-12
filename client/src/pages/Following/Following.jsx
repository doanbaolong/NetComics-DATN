import { TbChevronRight } from 'react-icons/tb';
import Breadcrumb from '~/components/Breadcrumb';
import Title from '~/components/Title';
import ComicItem from '~/components/ComicItem';
import { Sidebar } from '~/layouts/components';
import routes from '~/config/routes';
import CommentNav from '~/components/CommentNav';

function Following() {
    const list = [];
    for (let i = 0; i < 36; i++) {
        list.push(i);
    }
    const breadcrumb = [
        { title: 'Trang chủ', to: routes.home },
        { title: 'Theo dõi', to: routes.follow },
    ];

    return (
        <>
            <Breadcrumb list={breadcrumb} />
            <div className="main-content">
                <div className="content">
                    <div className="items">
                        <Title rigthIcon={<TbChevronRight />}>Truyện đang theo dõi</Title>
                        <CommentNav />
                        <div className="row comic-list">
                            {list.map((i) => (
                                <ComicItem key={i} />
                            ))}
                        </div>
                    </div>
                </div>
                <Sidebar history top />
            </div>
        </>
    );
}

export default Following;
