import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

function Chart4({userId}) {
    const [lineChart, setLineChart] = useState(null);

    useEffect(() => {
        buildChart();
    }, []);

    const buildChart = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getexpenseforms/${userId}`);
            const incomeForms = response.data;

            // Filter income transactions for the selected month
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1; // January is 0
            const filteredIncome = incomeForms.filter(form => {
                const formDate = new Date(form.date);
                return formDate.getMonth() + 1 === currentMonth;
            });

            const labels = [];
            const data = [];

            // Initialize data array with 0 for each day of the month
            for (let i = 1; i <= 31; i++) {
                labels.push(i.toString());
                data.push(0);
            }
            console.log(labels, data)
            // Populate data array with income amounts for each day
            filteredIncome.forEach(form => {
                const formDate = new Date(form.date);
                const dayOfMonth = formDate.getDate();
                data[dayOfMonth - 1] += form.amount; // Subtract 1 because array index starts from 0
            });

            // Build the chart
            const canvasId = "LineChart2";
            var ctx = document.getElementById(canvasId).getContext("2d");
            if (lineChart) lineChart.destroy();

            const newLineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Expense Amount',
                        data: data,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                },
            });

            setLineChart(newLineChart);
        } catch (error) {
            console.error('Error fetching income forms:', error);
        }
    }

    return (
        <div>
            <h2>line chart expenses</h2>
            <canvas id="LineChart2" width="1000" height="400" />
        </div>
    )
}

export default Chart4;