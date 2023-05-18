import loading from '~/assets/images/loading.gif';
import './Loading.scss';

function Loading() {
    return (
        <div className="loading">
            <img src={loading} alt="loading" className="loading-img" />
        </div>
    );
}

export default Loading;
