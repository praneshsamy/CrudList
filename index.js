const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

app.use('/api/products', require('./Routes/productRoutes'));
app.use('/uploads', express.static('uploads'));


app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});

app.get('/', (req, res) => {
    res.send("Server is running");
});
