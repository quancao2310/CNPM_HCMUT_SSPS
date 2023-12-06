function Paging({ startPage, currentPage, endPage, paginate, indexOfLastItem, length }){
    const pageRange = (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    };

    return (
        <div className="d-flex justify-content-end">
            <div className="pagination">
                <button
                    className="page-link"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &laquo;
                </button>

                {pageRange(startPage, endPage).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={`page-link ${pageNumber === currentPage ? 'active' : ''}`}
                        onClick={() => paginate(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}

                <button
                    className="page-link"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastItem >= length}
                >
                    &raquo;
                </button>
            </div>
        </div>
    );

}

export default Paging;