function Alert({ message, onClick }) {
    return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {message}
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={onClick}
            ></button>
        </div>
    );
}

export default Alert;
