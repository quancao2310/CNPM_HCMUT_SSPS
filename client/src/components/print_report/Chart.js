import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { useEffect, useRef } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export const option = (title) => { 
    return (
        {
            plugins: {
                title: {
                    display: true,
                    text: title,
                },
            },
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            }
        }
    );
};



function ReportChart({ data }){

    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }
    }, [data]);
    const printer = data.map(item => 'Máy in ' + item.printer_id);
    const order = data.map(item => item.total_orders);
    const no_A3 = data.map(item => item.total_A3_pages);
    const no_A4 = data.map(item => item.total_A4_pages);

    const getRandomColor = () => {
        const randomColor = () => Math.floor(Math.random() * 256);
        return `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
    };

    const chart_1 = {
        labels: printer,
        datasets: [{
            label: "Tổng số đơn đặt hàng",
            backgroundColor: Array.from({ length: order.length }, () => getRandomColor()),
            borderColor: "rgb(0, 0, 0, 1)",
            borderWidth: 1,
            data: order
        }]
    };

    const chart_2 = {
        labels: printer,
        datasets: [{
            label: "Tổng số lượng giấy A3",
            backgroundColor: getRandomColor(),
            borderColor: "rgb(0, 0, 0, 1)",
            borderWidth: 0.5,
            data: no_A3
        },
        {
            label: "Tổng số lượng giấy A4",
            backgroundColor: getRandomColor(),
            borderColor: "rgb(0, 0, 0, 1)",
            borderWidth: 1,
            data: no_A4
        }]
    };

    return (
        <div className="row text-center justify-content-around mt-5">
            <h3 className='col-12 m-2'>Biểu đồ thống kê số đơn đặt hàng</h3>
            <div className="col-6 m-3">
                <Bar data={chart_1} options={option('Biểu đồ cột')} />
            </div>
            <div className="col-3 m-3">
                <Pie data={chart_1} options={option('Biểu đồ tròn')} radius="50"/>
            </div>
            <h3 className='col-12 m-2'>Biểu đồ thống kê các loại giấy in</h3>
            <div className="col-6 m-3">
                <Bar data={chart_2} options={option('Biểu đồ cột')} />
            </div>
        </div>
    );
}

export default ReportChart;