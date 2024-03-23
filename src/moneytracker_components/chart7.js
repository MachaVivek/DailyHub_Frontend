import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

function Chart7({userId}) {
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getexpenseforms/${userId}`);
                const expenseForms = response.data;

                // Extract expense categories and their total amounts
                const categories = {};
                expenseForms.forEach(form => {
                    const category = form.option;
                    if (!categories[category]) {
                        categories[category] = 0;
                    }
                    categories[category] += form.amount;
                });

                // Prepare data for radar chart
                const labels = Object.keys(categories);
                const data = Object.values(categories);

                // Create radar chart
                const ctx = chartRef.current.getContext('2d');
                new Chart(ctx, {
                    type: 'radar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Total Expenses',
                            data: data,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            r: {
                                suggestedMin: 0
                            }
                        }
                    }
                });
            } catch (error) {
                console.error('Error fetching expense forms:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Radar Chart Expenses</h2>
            <canvas id="radarChart" ref={chartRef} width="800" height="600" />
        </div>
    );
}

export default Chart7;
