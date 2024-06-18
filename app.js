const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'your-host',
    user: 'your-username',
    password: 'your-password',
    database: 'your-database'
});

app.post('/activities', (req, res) => {
    const { userID, activityType, topic, summary } = req.body;
    pool.query('INSERT INTO Activities (UserID, ActivityType, Topic, Summary, Timestamp) VALUES (?, ?, ?, ?, NOW())', 
    [userID, activityType, topic, summary], (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.status(201).json({ message: 'Activity created', activityID: results.insertId });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
