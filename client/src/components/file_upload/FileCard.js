import { IoDocumentTextOutline, IoPrintOutline } from "react-icons/io5";
import { FaRegFile, FaRegFilePdf } from "react-icons/fa6";
import { BsFiletypePptx } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Paging from "./Paging";

function FileCards({ files, items_per_page = 3 }) {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * items_per_page;
    const indexOfFirstItem = indexOfLastItem - items_per_page;
    const currentFiles = files.slice(indexOfFirstItem, indexOfLastItem);

    const totalItems = files.length;
    const totalPages = Math.ceil(totalItems / items_per_page);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    let startPage, endPage;

    if (totalPages <= 3) {
        startPage = 1;
        endPage = totalPages;
    } 
    else {
        startPage = Math.max(1, currentPage - 1);
        endPage = Math.min(totalPages, currentPage + 1);
    }

    const style = {
        height: '1.4em', 
        width: '1.4em'
    }

    const handleFileIcon = (name) => {
        let index = name.length - 1;
        while (index >= 0 && name[index] !== '.') index--;
        const type = name.slice(index + 1);
        switch (type) {
            case 'doc':
            case 'docx':
                return <IoDocumentTextOutline style={style} />;
            case 'pdf':
                return <FaRegFilePdf style={style} />;
            case 'ppt':
            case 'pptx':
                return <BsFiletypePptx style={style} />;
            default:
                return <FaRegFile style={style} />
        }
    };
    

    return (
        <>
        <ul className="list-group rounded-0">
            {currentFiles.map((file, key) => (
                <li className="list-group-item mb-3 px-4" key={key}>
                    <div className="d-flex row">
                        <div className="col-1">
                            {handleFileIcon(file)}
                        </div>
                        <div
                            className="col-6 col-sm-8 col-md-9 col-lg-10 text-3 py-1"
                            style={{
                                overflowWrap: 'break-word',
                                whiteSpace: 'pre-wrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                lineHeight: '1.3em',
                                maxHeight: '3.0em'
                            }}
                        >
                            {file} - 100%
                        </div>
                        <Link className="col-1" to='/print/config' state={{ name: file }}>
                            <IoPrintOutline style={style}/>
                        </Link>
                        
                    </div>
                    <div className="progress bg-dark mt-2" style={{ height: '2px' }}>
                        <div
                            className="progress-bar bg-success"
                            aria-valuenow="100"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{
                                width: '100%'
                            }}
                        >
                        </div>
                    </div>
                </li>
            ))}
        </ul>
        <Paging 
            startPage={startPage}
            currentPage={currentPage}
            endPage={endPage}
            paginate={paginate}
            indexOfLastItem={indexOfLastItem} 
            length={totalItems}
        />
        </>
    );
}

export default FileCards;
