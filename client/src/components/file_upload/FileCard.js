import { IoDocumentTextOutline, IoPrintOutline } from "react-icons/io5";
import { FaRegFile, FaRegFilePdf } from "react-icons/fa6";
import { BsFiletypePptx } from "react-icons/bs";
import { Link } from 'react-router-dom';

function FileCards({ files }) {
    const handleFileIcon = (name) => {
        let index = name.length - 1;
        while (index >= 0 && name[index] !== '.') index--;
        const type = name.slice(index + 1);
        switch (type) {
            case 'doc':
            case 'docx':
                return <IoDocumentTextOutline />;
            case 'pdf':
                return <FaRegFilePdf />;
            case 'ppt':
            case 'pptx':
                return <BsFiletypePptx />;
            default:
                return <FaRegFile />
        }
    };
    

    return (
        <ul className="list-group rounded-0">
            {files.map((file, key) => (
                <li className="list-group-item mb-3 mx-1" key={key}>
                    <div className="d-flex row">
                        <div className="col-1">
                            {handleFileIcon(file)}
                        </div>
                        <div
                            className="col-6 col-sm-8 col-md-9 col-lg-10 text-3 py-1"
                            style={{
                                overflowWrap: 'break-word',
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                            {file} - (100%)
                        </div>
                        <Link className="col-1" to='/print/config' state={{ name: file }}>
                            <IoPrintOutline />
                        </Link>
                    </div>
                    {/* <div className="progress bg-dark" style={{ height: '2px' }}>
                        <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            aria-valuenow="100"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{
                                width: '100%'
                            }}
                        >
                        </div>
                    </div> */}
                </li>
            ))}
        </ul>
    );
}

export default FileCards;
