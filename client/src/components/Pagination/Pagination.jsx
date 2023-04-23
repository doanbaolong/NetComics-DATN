import { Link } from 'react-router-dom';
import './Pagination.scss';

function Pagination() {
    return (
        <div className="pagination-container d-flex justify-content-center mt-4 mb-5">
            <nav aria-label="Pagination">
                <ul className="pagination">
                    <li className="page-item disabled">
                        <Link className="page-link" tabIndex="-1" aria-disabled="true">
                            &laquo;
                        </Link>
                    </li>
                    <li className="page-item">
                        <Link className="page-link">1</Link>
                    </li>
                    <li className="page-item active" aria-current="page">
                        <Link className="page-link">2</Link>
                    </li>
                    <li className="page-item">
                        <Link className="page-link">3</Link>
                    </li>
                    <li className="page-item">
                        <Link className="page-link">&raquo;</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;
