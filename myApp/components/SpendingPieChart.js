import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const SpendingPieChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch the data from the API you just created
        fetch('http://localhost:5000/api/stats/category-data')
            .then(res => res.json())
            .then(json => {
                // Recharts expects 'name' and 'value' keys
                const formattedData = json.map(item => ({
                    name: item._id,
                    value: item.totalAmount
                }));
                setData(formattedData);
            });
    }, []);

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SpendingPieChart;