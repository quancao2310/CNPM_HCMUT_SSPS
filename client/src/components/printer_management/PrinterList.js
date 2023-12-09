import Printer from "./Printer"
import { useState, useEffect } from "react";
import axios from "axios";

export default function PrinterList() {
    const [printers, setPrinters] = useState([]);
    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_SERVER_URL}/printer/`)
        .then((response) => {
            setPrinters(response.data.filter(printer => printer.status !== 'deleted'))
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);
    return (
        <div className="container">
            <div className="row">
                {
                    printers.map((printer, index) => (
                    <div className="col border border-black border-2 rounded m-1 p-1" key={index}>
                        <Printer id={printer.printer_id} name={printer.name}/>
                    </div>
                    ))
                }
            </div>
        </div>
    )
}