const mongoose = require('mongoose');
const connectionMap = {};

module.exports = async function tenantDbMiddleware(req, res, next) {
  try {
    const host = req.hostname; 
    const tenantId = host.split('.')[0]; 
    console.log(tenantId, "in midlleware");

    if (!tenantId) {
      return res.status(400).json({ message: "Tenant not found in hostname" });
    }

    if (!connectionMap[tenantId]) {
      const dbUri = `mongodb://127.0.0.1:27017/${tenantId}`;
      const connection = await mongoose.createConnection(dbUri);
      console.log(`Connected to DB for tenant: ${tenantId}`);
      connectionMap[tenantId] = connection;
    }

    req.db = connectionMap[tenantId];
    req.tenantId = tenantId;

    next();
  } catch (error) {
    // console.error('Tenant DB connection error:', error);
    res.status(500).json({ message: 'Error connecting to tenant DB' });
  }
};
