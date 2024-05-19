import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    mobile TEXT,
    treatment TEXT,
    treatmentCost REAL,
    paidAmount REAL
  )`);
});

// Get all customers
app.get('/api/customers', (req: Request, res: Response) => {
  const search = req.query.search as string || '';
  db.all(`SELECT * FROM customers WHERE name LIKE ? OR mobile LIKE ?`, [`%${search}%`, `%${search}%`], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

// Get customer by ID
app.get('/api/customers/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  db.get(`SELECT * FROM customers WHERE id = ?`, [id], (err, row) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(row);
    }
  });
});

// Create a new customer
app.post('/api/customers', (req: Request, res: Response) => {
  const { name, mobile, treatment, treatmentCost, paidAmount } = req.body;
  db.run(`INSERT INTO customers (name, mobile, treatment, treatmentCost, paidAmount) VALUES (?, ?, ?, ?, ?)`,
    [name, mobile, treatment, treatmentCost, paidAmount],
    function (err) {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.json({ id: this.lastID });
      }
    });
});

// Update an existing customer
app.put('/api/customers/:id', (req: Request, res: Response) => {
  const { name, mobile, treatment, treatmentCost, paidAmount } = req.body;
  const id = req.params.id;
  db.run(`UPDATE customers SET name = ?, mobile = ?, treatment = ?, treatmentCost = ?, paidAmount = ? WHERE id = ?`,
    [name, mobile, treatment, treatmentCost, paidAmount, id],
    function (err) {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.sendStatus(200);
      }
    });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
