import React from "react";
import axios from 'axios';
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';

const Chart3= ({userId}) => {
    const [pieChart, setPieChart] = useState(null);

    useEffect(() => {
        buildChart();
    }, []);

    const buildChart = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getincomeforms/${userId}`);
            const expenseForms = response.data;

            // Filter expense transactions for the current month
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1; // January is 0
            const filteredExpense = expenseForms.filter(form => {
                const formDate = new Date(form.date);
                return formDate.getMonth() + 1 === currentMonth;
            });

            // Extract amount for each field in the current month
            const expensesByField = {};
            filteredExpense.forEach(form => {
                if (expensesByField[form.option]) {
                    expensesByField[form.option] += form.amount;
                } else {
                    expensesByField[form.option] = form.amount;
                }
            });

            // Prepare data for the pie chart
            const labels = Object.keys(expensesByField);
            const data = Object.values(expensesByField);

            // Build the chart
            const canvasId = "ExpensePieChart";
            var ctx = document.getElementById(canvasId).getContext("2d");
            if (pieChart) pieChart.destroy();

            const newPieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)'
                        ],
                    }]
                },
            });

            setPieChart(newPieChart);
        } catch (error) {
            console.error('Error fetching expense forms:', error);
        }
    }

    return (
        <div>
            <h2>pie chart incomes</h2>
            <canvas id="ExpensePieChart" width="400" height="200" />
        </div>
    )
}

export default Chart3