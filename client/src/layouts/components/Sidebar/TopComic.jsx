import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SideWrapper from '~/components/SideWrapper';
import SideComicItem from '~/components/SideWrapper/SideComicItem';

function TopComic() {
    const [isTabActive, setIsTabActive] = useState(1);
    const lineRef = useRef();
    const tabs = [
        { id: 1, title: 'Top tháng', data: [] },
        { id: 2, title: 'Top tuần', data: [] },
        { id: 3, title: 'Top ngày', data: [] },
    ];

    const handleTabClick = (e, id) => {
        setIsTabActive(id);
        console.log(lineRef.current);
        lineRef.current.style.left = e.target.offsetLeft + 'px';
    };
    return (
        <SideWrapper noTop>
            <div className="d-flex align-items-center justify-content-between top-tabs">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={'tab-item' + (isTabActive === tab.id ? ' active' : '')}
                        onClick={(e) => handleTabClick(e, tab.id)}
                    >
                        {tab.title}
                    </div>
                ))}
                <div ref={lineRef} className="line"></div>
            </div>

            {/* <div className='content'>
                {tabs.map((tab, i) =>
                    <div key={i}>
                        {isTabActive === `${tab.id}` && <div><p className='title'>{tab.title}</p><p>{tab.content}</p></div>}
                    </div>
                )}
            </div> */}
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

export default TopComic;
