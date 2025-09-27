import { Schema, model } from 'mongoose';

const documentSchema = new Schema({
    title: { type: String, required: true },
    tags: { type: [String], default: [] },
    url: { type: [String], required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const documentModel = model('Document', documentSchema);
export default documentModel;