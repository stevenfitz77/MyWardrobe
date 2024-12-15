import express from 'express';
import dotenv from "dotenv";
import clothingItemRoutes from "./routes/clothingItemRoute.js";
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import outfitRoutes from './routes/outfitRoute.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;


// Middleware
app.use(express.json()); // allows us to accept JSON data in the req.body
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/clothingItems', clothingItemRoutes);
app.use('/api/outfits', outfitRoutes);

app.get('/', (req, res) => {
    res.send("MyWardrobe API is running...");
});

// Serve static files from React app
const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};


app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});
