import mongoose from "mongoose";

/**
 * Mongoose schema for City model in MongoDB Atlas.
 * 
 * @typedef {Object} City
 * @property {string} name - The name of the city. It is required, unique, and trimmed.
 * @property {number} lat - The latitude of the city. It is required and must be between -90 and 90.
 * @property {number} lon - The longitude of the city. It is required and must be between -180 and 180.
 */
const citySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },  
  lat: { type: Number, required: true, min: -90, max: 90 },
  lon: { type: Number, required: true, min: -180, max: 180 },
}, { timestamps: true });  

citySchema.index({ name: 1, lat: 1, lon: 1 });

export const City = mongoose.model("City", citySchema);