import express from 'express';
import cors from 'cors';
import newsletter from './controllers/newsletter.js';

//MongoDB Connection
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/newsletter', newsletter);

dotenv.config();

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.log(error);
	});

const PORT = 3001;
app.listen(PORT, () => {
	console.log('Server is listening on PORT', PORT);
});
