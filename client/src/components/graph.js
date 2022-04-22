import React from 'react';
import { useSelector } from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import Loader from "./util/loader";

function Graph() {
    const priceInterval = useSelector((state) => state.converter.priceInterval);
    let render;
    if (priceInterval && Object.keys(priceInterval).length > 0) {
        ChartJS.register(
            CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            Title,
            Tooltip,
            Legend
        );
        const labels = priceInterval.bitcoin.map(item => new Date(item[0]).toLocaleString());
        const data = {
            labels,
            datasets: [
                {
                    label: 'Bitcoin',
                    data: priceInterval.bitcoin.map(item => item[1]),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, .5)',
                    yAxisID: 'y'
                },
                {
                    label: 'Ethereum',
                    data: priceInterval.ethereum.map(item => item[1]),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    yAxisID: 'y1'
                },
                {
                    label: 'Litecoin',
                    data: priceInterval.litecoin.map(item => item[1]),
                    borderColor: 'rgb(138,235,53)',
                    backgroundColor: 'rgba(53,235,56,0.5)',
                    yAxisID: 'y2'
                },
                {
                    label: 'Solana',
                    data: priceInterval.solana.map(item => item[1]),
                    borderColor: 'rgb(235,226,53)',
                    backgroundColor: 'rgba(235,193,53,0.5)',
                    yAxisID: 'y2'
                },
            ],
        };
        const options = {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            stacked: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Crypto price by date (USD)',
                },
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: {
                        drawOnChartArea: false,
                    },
                },
                y2: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: {
                        drawOnChartArea: false,
                    },
                },
            },
        };
        render = (<div><Line height={129} options={options} data={data}  type="line" /></div>);
    } else {
        render = (<Loader/>);
    }
    return render;
}

export default Graph;