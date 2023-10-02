import './ComicTooltip.scss';
import noImage from '../../assets/images/no-image.jpg';
import { formatChapterDate } from '~/util/formatDate';

function ComicTooltip({ comic }) {
    return (
        <div className="comic-tooltip-box">
            <h2 className="title">{comic?.name}</h2>
            <div className="info-details d-flex">
                <div className="col-image">
                    <img
                        src={comic?.image ? process.env.REACT_APP_SERVER_URL + comic?.image : noImage}
                        alt={`Truyện tranh ${comic?.name}`}
                    />
                </div>
                <div className="col-info">
                    {comic?.otherName && (
                        <div className="row-info">
                            <label className="info-title">Tên khác: </label>
                            <p>{comic?.otherName}</p>
                        </div>
                    )}
                    <div className="row-info">
                        <label className="info-title">Tác giả: </label>
                        <p>
                            {comic?.Authors?.length > 0
                                ? comic?.Authors.map((author) => author.name).join(', ')
                                : 'Đang cập nhật'}
                        </p>
                    </div>
                    <div className="row-info">
                        <label className="info-title">Tình trạng: </label>
                        <p>{comic?.status}</p>
                    </div>
                    <div className="row-info">
                        <label className="info-title">Thể loại: </label>
                        <p>
                            {comic?.Genres?.length > 0
                                ? comic?.Genres.map((genre) => genre.name).join(', ')
                                : 'Đang cập nhật'}
                        </p>
                    </div>
                    <div className="row-info">
                        <label className="info-title">Theo dõi: </label>
                        <p>{comic?.follower}</p>
                    </div>
                    <div className="row-info">
                        <label className="info-title">Ngày cập nhật: </label>
                        <p>{formatChapterDate(comic?.chapterUpdatedAt)}</p>
                    </div>
                </div>
            </div>
            {comic?.content && <p className="content">{comic?.content}</p>}
        </div>
    );
}

export default ComicTooltip;
