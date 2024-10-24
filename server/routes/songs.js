import express from 'express';
import { getConnectionPool } from '../database.js'; // Import the database connection
import sql from 'mssql';

const router = express.Router();


router.get('/', async (req, res) => {
    const { keyword = '' } = req.query;
  
    try {
      const pool = await getConnectionPool(); // Get a connection pool
      const result = await pool.request()
        .input('keyword', sql.NVarChar, `%${keyword}%`)
        .query('SELECT * FROM [dbo].[Song] WHERE song_name LIKE @keyword'); // Search for songs with the keyword
  
      res.status(200).json(result.recordset); // Return the matching songs
    } catch (error) {
      console.error('Error fetching songs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

export default router;
