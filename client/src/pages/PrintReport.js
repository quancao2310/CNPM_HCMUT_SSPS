import axios from 'axios';
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import FilterBar from "../components/print_report/FilterBar";
import ReportTable from "../components/print_report/ReportTable"
import Loading from '../components/utils/Loading';


function PrintReport(){
    const [cookies, setCookie, removeCookie] = useCookies();
    const token = cookies.auth;
    const navigate = useNavigate();

    const [minMonth, setMinMonth] = useState(9999);
    const [minYear, setMinYear] = useState(9999);
    const [loading, setLoading] = useState(true);

    const [selectedType, setSelectedType ] = useState('monthly');
    const [selectedMonth, setSelectedMonth ] = useState(0);
    const [selectedYear, setSelectedYear ] = useState(0);

    const [currentMonth, setCurrentMonth] = useState(0);
    const [currentYear, setCurrentYear] = useState(0);

    const [ data, setData] = useState([]);

    useEffect(() => {
        const authentication = () => {
            axios
            .get(`${process.env.REACT_APP_SERVER_URL}/user`, {
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 200);
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                if (cookies.auth) {
                    removeCookie('auth', { path: '/' });
                }
                setTimeout(() => {
                    navigate('/login');
                }, 200);
                } 
                else {
                    console.error(err);
                }
            });
        }

        const fetchData = () =>
        {
            axios
            .get(`${process.env.REACT_APP_SERVER_URL}/report/getFirstOrder`, {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
            .then((response) => {
                setMinMonth(response.data['0'].month_of_first);
                setMinYear(response.data['0'].year_of_first);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
        }

        authentication();
        fetchData();        
    }, [cookies]);

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

   
    useEffect(() => {
        if (minMonth !== undefined && minYear !== undefined) {
            const today = new Date();
            setCurrentMonth(today.getMonth() + 1);
            setCurrentYear(today.getFullYear());
    
            const original_monthly_data = generateMonthYearArray(minMonth, minYear, currentMonth, currentYear);
            const original_annually_data = generateYearArray(minYear, currentYear);
    
            let updatedData;
    
            if (selectedType === 'monthly') {
                updatedData = selectedMonth && selectedYear
                    ? original_monthly_data.filter(item => item.month === selectedMonth && item.year === selectedYear)
                    : original_monthly_data;
            } else {
                updatedData = selectedYear
                    ? original_annually_data.filter(item => item.year === selectedYear)
                    : original_annually_data;
            }
    
            setData(updatedData);
        }
    }, [selectedType, selectedMonth, selectedYear, minMonth, minYear]);
    
    
    if (loading){
        return (
            <div className='col-12 my-3 text-center'>
                <h3>Dữ liệu đang tải, vui lòng chờ</h3>
                <Loading />
            </div>
        );
    }


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