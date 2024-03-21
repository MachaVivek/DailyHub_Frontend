// Dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './moneyTrackerComponents.css';

import Chart1 from "./chart1";
import Chart2 from "./chart2";
import Chart3 from "./chart3";
import Chart4 from "./chart4";
import Chart5 from "./chart5";
import Chart6 from "./chart6";
import Chart7 from "./chart7";

const MoneyDashboard = () => {
  const [totalExpenditure, setTotalExpenditure] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);
  const [expenseByOption, setExpenseByOption] = useState({});

  useEffect(() => {
    const fetchIncomeForms = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getincomeforms`);
        const total = response.data.reduce((acc, curr) => acc + curr.amount, 0);
        setTotalIncome(total);
        
        // Calculate total debt from income forms
        const debtForms = response.data.filter(form => form.option === 'borrowed');
        const debtTotal = debtForms.reduce((acc, curr) => acc + curr.amount, 0);
        setTotalDebt(debtTotal);
      } catch (error) {
        console.error('Error fetching income forms:', error);
      }
    };

    const fetchExpenseForms = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getexpenseforms`);
          const total = response.data.reduce((acc, curr) => acc + curr.amount, 0);
          setTotalExpenditure(total);
  
          // Calculate total expenditure for each option
          const expenditureByOption = {};
          response.data.forEach(form => {
            if (expenditureByOption[form.option]) {
              expenditureByOption[form.option] += form.amount;
            } else {
              expenditureByOption[form.option] = form.amount;
            }
          });
          setExpenseByOption(expenditureByOption);
        } catch (error) {
          console.error('Error fetching expense forms:', error);
        }
      };
  
    fetchIncomeForms();
    fetchExpenseForms();
  }, []);
  return (
    <div style={{ padding: '2%', backgroundColor: 'gray'}}>
      <div class="dashboard-summary">
      <div class="dashboard-item">
        <p>Total Balance: <span>${totalIncome - totalExpenditure}</span></p>
      </div>
      <div class="dashboard-item">
        <p>Total Expenditure: <span>${totalExpenditure}</span></p>
      </div>
      <div class="dashboard-item">
        <p>Total Income: <span>${totalIncome}</span></p>
      </div>
      <div class="dashboard-item">
        <p>Total Debt: <span>${totalDebt}</span></p>
      </div>
    </div>
    <div style={{ padding: '2%', backgroundColor: 'gray',justifyContent: 'center', alignItems: 'center'}}>
    <div className="col-md-6 mb-4" style={{width: '90%'}}>
    <div className="chart-container p-5 rounded-lg rounded shadow-lg bg-white text-dark mb-4 border d-flex flex-row">
            <div style={{ width: '70%' }}>
                <Chart1 />
            </div>
            <div className="flex-grow-1 p-4">
    <h2 className="chart-titles">Line Chart: Income for Current Month</h2>
    <p>X Axis Details: Days of the month (1 to 31)</p>
    <p>Y Axis Details: Income amount in currency (USD, EUR, etc.)</p>
    <p>Description: This line chart displays the income for the current month. Each point on the chart represents the total income received on a specific day of the month. The X-axis indicates the days of the month, while the Y-axis represents the income amount. The chart provides an overview of the income trends over the course of the month, allowing users to visualize the distribution and fluctuations in income.</p>
</div>

        </div>
    </div>
    
    <div className="col-md-6 mb-4" style={{width: '90%'}}>
    <div className="chart-container p-5 rounded-lg rounded shadow-lg bg-white text-dark mb-4 border d-flex flex-row">
        {/* Details on the left */}
        <div className="flex-grow-1 p-4">
    <h2 className="chart-titles">Line Chart Expenses</h2>
    <p>X Axis Details: Days of the current month</p>
    <p>Y Axis Details: Expense amount</p>
    <p>Description: This line chart displays the expenses for each day of the current month. The X-axis represents the days of the month, while the Y-axis represents the expense amount. Each point on the line chart corresponds to the total expense amount recorded for that particular day of the month.</p>
</div>

            {/* Chart on the right */}
            <div style={{ width: '70%' }}>
                <Chart4 />
            </div>
        </div>
    </div>
    <div className="col-md-6 mb-4" style={{width: '90%'}}>
    <div className="chart-container p-5 rounded-lg rounded shadow-lg bg-white text-dark mb-4 border d-flex flex-row">
            <div style={{ width: '70%' }}>
                <Chart5 />
            </div>
            <div className="flex-grow-1 p-4">
    <h2 className="chart-titles">Income Bar Graph</h2>
    <p>X Axis Details: Each bar represents a month of the year.</p>
    <p>Y Axis Details: The amount of income in currency units.</p>
    <p>Description: This bar graph displays the income distribution over the months of the year. Each bar corresponds to a month, and the height of the bar represents the total income received in that month. The X-axis represents the months of the year, while the Y-axis represents the amount of income. The graph helps visualize the trend of income over different months, facilitating analysis and decision-making based on income patterns.</p>
</div>

        </div>
    </div>
    <div className="col-md-6 mb-4" style={{width: '90%'}}>
    <div className="chart-container p-5 rounded-lg rounded shadow-lg bg-white text-dark mb-4 border d-flex flex-row">
        
    <div className="flex-grow-1 p-4">
    <h2 className="chart-titles">Expenses Bar Graph</h2>
    <p>X Axis Details: Months of the Year</p>
    <p>Y Axis Details: Total Expenses Amount</p>
    <p>Description: This bar graph displays the total Expenses amount for each month of the year. Each bar represents a month, and the height of the bar indicates the total Expenses amount for that month. The x-axis represents the months of the year, and the y-axis represents the total Expenses amount. The data is based on the Expenses forms fetched from the server.</p>
</div>

            <div style={{ width: '70%' }}>
                <Chart6 />
            </div>
        </div>
    </div>
    <div className="col-md-6 mb-4" style={{width: '90%', height: '50%'}}>
    <div className="chart-container p-5 rounded-lg rounded shadow-lg bg-white text-dark mb-4 border d-flex flex-row">
            <div style={{ width: '30%' }}>
                <Chart7 />
            </div>
            <div className="flex-grow-1 p-4">
    <h2 className="chart-titles">Radar Chart Expenses</h2>
    <p>Description: The radar chart displays the total expenses across different categories. Each category is represented along the X axis, and the total expense amount is represented along the Y axis. The chart provides a visual overview of spending patterns, allowing users to identify which expense categories contribute the most to their overall expenses.</p>
</div>

        </div>
    </div>
    <div className="col-md-6 mb-4"style={{width: '90%', height: '50%'}} >
    <div className="chart-container p-5 rounded-lg rounded shadow-lg bg-white text-dark mb-4 border d-flex flex-row">
        {/* Details on the left */}
        <div className="flex-grow-1 p-4">
    <h2 className="chart-titles">pichart Expenses</h2>
    
    <p>Description: This pie chart displays the distribution of expenses across various categories for the current month. It visualizes the proportion of expenses in each category, allowing users to quickly identify where their money is being spent the most.</p>
    <p>Description: The chart dynamically fetches expense data from the server and filters it to display expenses for the current month only. Each expense category is represented by a different colored segment, making it easy to differentiate between categories. Hovering over each segment reveals the exact percentage and amount of money spent in that category.</p>
    <p>Description: Users can use this chart to gain insights into their spending habits, identify areas where they may be overspending, and make informed decisions to manage their finances more effectively.</p>
    <p>Description: Additionally, the chart is responsive and adjusts its size to fit the available space, ensuring a seamless viewing experience across different devices and screen sizes.</p>
</div>

            {/* Chart on the right */}
            <div style={{ width: '40%' }}>
                <Chart2 />
            </div>
        </div>
    </div>
    <div className="col-md-6 mb-4" style={{width: '90%', height: '50%'}}>
    <div className="chart-container p-5 rounded-lg rounded shadow-lg bg-white text-dark mb-4 border d-flex flex-row">
            <div style={{ width: '40%' }}>
                <Chart3 />
            </div>
            <div className="flex-grow-1 p-4">
    <h2 className="chart-titles">Pie Chart Incomes</h2>

        <p>Description:</p><p> This pie chart visualizes the disribution of income across various categories for the current month.
        It provides insights into the proportion of income generated from different sources, including borrowed funds, salary, business income, and gifts.
        By analyzing this chart, users can quickly identify the primary sources of income and their respective contributions to the overall income for the month.
    </p>
</div>

        </div>
    </div>
    </div>
    </div>

    
  );
};



export default MoneyDashboard;
