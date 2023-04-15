import { TbChevronRight } from 'react-icons/tb';
import Breadcrumb from '~/components/Breadcrumb';
import Title from '~/components/Title';
import ComicItem from '~/components/ComicItem';
import { Sidebar, Slide } from '~/layouts/components';
import routes from '~/config/routes';

function Hot() {
    const list = [];
    for (let i = 0; i < 36; i++) {
        list.push(i);
    }
    const breadcrumb = [
        { title: 'Trang chủ', to: routes.home },
        { title: 'Hot', to: routes.hot },
    ];

    return (
        <>
            <Breadcrumb list={breadcrumb} />
            {/* <Slide /> */}
            <div className="main-content">
                <div className="content">
                    <div className="items">
                        <Title rigthIcon={<TbChevronRight />}>Truyện hot nhất</Title>
                        <div className="row comic-list">
                            {list.map((i) => (
                                <ComicItem key={i} />
                            ))}
                        </div>
                    </div>
                </div>
                <Sidebar top />
            </div>
        </>
    );
}

export default Hot;
