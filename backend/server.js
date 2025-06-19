require('dotenv').config();
const express = require('express');
const path = require('path');
const tenantDbMiddleware = require("./middlewares/tenantmiddleware");
const authRoutes = require("./routes/authRoutes");
const dataRoutes = require("./routes/dataRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(tenantDbMiddleware);
app.use("/api/auth", authRoutes);

app.use("/api/data", dataRoutes);
// Serve frontend static HTML
app.use(express.static(path.join(__dirname, '../frontend/public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
