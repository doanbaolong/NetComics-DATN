import { Link } from 'react-router-dom';
import { RiCloseFill } from 'react-icons/ri';
import { TbCaretRight } from 'react-icons/tb';
import SideWrapper from '~/components/SideWrapper';
import SideComicItem from '~/components/SideWrapper/SideComicItem';

function HistoryComic() {
    return (
        <SideWrapper title="Lịch sử đọc truyện" viewAll>
            <SideComicItem
                imageUrl="https://st.ntcdntempv3.com/data/comics/32/sieu-nang-lap-phuong.jpg"
                name="Siêu Năng Lập Phương"
            >
                <div className="d-flex justify-content-between lastest-chapter">
                    <Link className="d-flex align-items-center continue-read">
                        Đọc tiếp chapter 20 <TbCaretRight />
                    </Link>
                    <button className="d-flex align-items-center btn-delete">
                        <RiCloseFill />
                        Xóa
                    </button>
                </div>
            </SideComicItem>
        </SideWrapper>
    );
}

export default HistoryComic;
