import { useState } from 'react';
import StatusTable from './StatusTable';

function PagingTable({ data, items_per_page }) {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * items_per_page;
    const indexOfFirstItem = indexOfLastItem - items_per_page;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / items_per_page);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageRange = (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    };

    let startPage, endPage;

    if (totalPages <= 3) {
        startPage = 1;
        endPage = totalPages;
    } 
    else {
        startPage = Math.max(1, currentPage - 1);
        endPage = Math.min(totalPages, currentPage + 1);
    }

    return (
        <div className="container-fluid">
            <StatusTable data={currentData} />
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
                        disabled={indexOfLastItem >= data.length}
                    >
                        &raquo;
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PagingTable;
