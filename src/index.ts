import express from 'express';
import cors from 'cors';
import newsletter from './controllers/newsletter.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/newsletter', newsletter);

const PORT = 3001;
app.listen(PORT, () => {
	console.log('Server is listening on PORT', PORT);
});
