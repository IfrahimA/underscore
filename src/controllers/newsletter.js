import express from 'express';
import nodemailer, { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import { Email } from '../models/email.js';
dotenv.config();

const router = express.Router();

const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: 'ifrahimansari11@gmail.com',
		pass: process.env.APP_PASSWORD,
	},
});

const mailOptions = (email) => {
	return {
		from: {
			name: 'Parh',
			address: 'ifrahimansari11@gmail.com',
		},
		to: email,
		subject: 'Hello World',
		text: 'Hello World',
		html: '<b>Hello World</b>',
	};
};

const sendMail = async (transporter, mailOptions) => {
	try {
		await transporter.sendMail(mailOptions);
		console.log('Email has been sent successfully');
	} catch (error) {
		console.error(error);
	}
};

router.post('/', async (req, res) => {
	const newEmail = mailOptions(req.body.email);
	try {
		await sendMail(transporter, newEmail);
		const email = await Email.findOne({ email: req.body.email });
		if (!email) {
			const newEmail = new Email({ email: req.body.email });
			await newEmail.save();
		}
		res.status(200).end();
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
});

export default router;
