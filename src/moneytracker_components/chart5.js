import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

function Chart5({userId}) {
    const [barGraph, setBarGraph] = useState(null);

    useEffect(() => {
        buildGraph();
    }, []);

    const buildGraph = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getincomeforms/${userId}`);
            const incomeForms = response.data;

            // Group income transactions by month
            const groupedByMonth = {};
            incomeForms.forEach(form => {
                const formDate = new Date(form.date);
                const month = formDate.getMonth() + 1; // January is 0
                const year = formDate.getFullYear();
                if (!groupedByMonth[year]) {
                    groupedByMonth[year] = Array.from({ length: 12 }, () => 0);
                }
                groupedByMonth[year][month - 1] += form.amount; // Subtract 1 because array index starts from 0
            });

            // Prepare data for the bar graph
            const years = Object.keys(groupedByMonth);
            const months = Array.from({ length: 12 }, (_, i) => i + 1); // Generate array [1, 2, ..., 12]
            const data = years.map(year => groupedByMonth[year] || Array.from({ length: 12 }, () => 0));

            // Build the graph
            var ctx = document.getElementById("IncomeBarGraph").getContext("2d");
            if (barGraph) barGraph.destroy();

            const newBarGraph = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: months.map(month => month.toString()),
                    datasets: data.map((yearData, index) => ({
                        label: years[index],
                        data: yearData,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)', // Adjust color as needed
                    }))
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            setBarGraph(newBarGraph);
        } catch (error) {
            console.error('Error fetching income forms:', error);
        }
    }

    return (
        <div>
            <canvas id="IncomeBarGraph" width="800" height="400" />

        </div>
    )
}

export default Chart5;
