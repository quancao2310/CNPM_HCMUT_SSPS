import { useEffect, useState } from 'react'
import FilterBar from "../components/print_report/FilterBar";
import ReportTable from "../components/print_report/ReportTable"

function PrintReport(){
     /*
    * Use for testing. Get exact values by using API.
    */
    const minMonth = 5;
    const minYear = 2017;
    /* */
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    const [selectedType, setSelectedType ] = useState('monthly');
    const [selectedMonth, setSelectedMonth ] = useState(0);
    const [selectedYear, setSelectedYear ] = useState(0);

    const [ data, setData] = useState([]);

    const generateMonthYearArray = (minMonth, minYear, currentMonth, currentYear) => {
        const monthYearArray = [];
      
        for (let year = currentYear; year >= minYear; year--) {
            const startMonth = (year === minYear) ? minMonth : 1;
            const endMonth = (year === currentYear) ? currentMonth-1 : 12;
        
            for (let month = endMonth; month >= startMonth; month--) {
                monthYearArray.push({ month, year });
            }
        }
      
        return monthYearArray;
    }

    const generateYearArray = (minYear, currentYear) => {
        const yearArray = [];
      
        for (let year = currentYear-1; year >= minYear; year--) {
            yearArray.push({ year });
        }
      
        return yearArray;
    }

    const original_monthly_data = generateMonthYearArray(minMonth, minYear, currentMonth, currentYear);
    const original_annually_data = generateYearArray(minYear, currentYear);
      
    useEffect(() => {
        setData((selectedType === 'monthly')
        ? original_monthly_data
        : original_annually_data);
        if (selectedType) {
            if (selectedMonth && selectedYear) {
                setData(original_monthly_data.filter(item => item.month === selectedMonth && item.year === selectedYear));
            }
        } 
        else {
            if (selectedYear) {
                setData(original_annually_data.filter(item => item.year === selectedYear));
            }
        }
    }, [selectedType, selectedMonth, selectedYear]);
    
      


    return (
        <div className="container-fluid">
            <div className="row justify-content-center p-1s">
                <h1 className="col-12 text-center p-3">
                    Báo cáo hệ thống
                </h1>
                <div className="col-12 text-bold">
                    <FilterBar 
                        minMonth={minMonth} 
                        minYear={minYear}
                        typeState={[selectedType, setSelectedType ]}
                        monthState={[selectedMonth, setSelectedMonth ]}
                        yearState={[selectedYear, setSelectedYear]}
                    />
                </div>
                <div className="col-12">
                    <ReportTable input_data={data} isMonthlyType={selectedType === 'monthly'}/>
                </div>
            </div>
        </div>
    );
}

export default PrintReport;