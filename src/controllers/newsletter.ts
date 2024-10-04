import express from 'express';
import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: "ifrahimansari11@gmail.com",
		pass: process.env.APP_PASSWORD,
	},
});

const mailOptions = (email: string) => {
	return {
		from: {
			name: 'Parh',
			address: "ifrahimansari11@gmail.com"
		},
		to: email,
		subject: 'Hello World',
		text: 'Hello World',
		html: '<b>Hello World</b>',
	};
};

const sendMail = async (transporter: Transporter, mailOptions: object) => {
    try {
        await transporter.sendMail(mailOptions)
        console.log("Email has been sent successfully")
    }
    catch(error) {
        console.error(error)
    }
}

router.post('/', async (req, res) => {
	const { email } = req.body;
	const newEmail = mailOptions(email);
	
	console.log(process.env.APP_PASSWORD)
	console.log(process.env.USER)

	await sendMail(transporter, newEmail)

	res.status(200).end()
});

export default router;
