import { memo } from 'react';

function Modal({ buttonText, id, title, body, closeText, confirmText, onConfirmClick }) {
    return (
        <div>
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#${id}`}>
                {buttonText}
            </button>

            <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={`${id}Label`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-dark text-white">
                            <h1 className="modal-title fs-5" id={`${id}Label`}>
                                {title || 'NetComics'}
                            </h1>
                            <button
                                type="button"
                                className="btn-close bg-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">{body || 'Are you sure you want to save?'}</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-info" data-bs-dismiss="modal">
                                {closeText || 'Close'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={onConfirmClick}
                            >
                                {confirmText || 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Modal);
