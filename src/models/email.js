import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
});

emailSchema.set('toJSON', {
	transform: (_document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export const Email = mongoose.model('Email', emailSchema);
