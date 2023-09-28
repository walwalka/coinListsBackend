import mongoose from "mongoose";

const coinSchema = mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
        },
        mintLocation: {
            type: String,
            required: true,
        },
        mintYear: {
            type: Number,
            required: true,
        },
        circulation: {
            type: String,
            required: true,
        },
        grade: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Coin = mongoose.model('Coin', coinSchema);
