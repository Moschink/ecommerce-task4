const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const jwt = require("jsonwebtoken");
const todoRouter = require("./router/router");
const authRouter = require("./router/userRouter");
const mongoose = require("mongoose");
const userModel = require("./schema/user");
const uploadFile = require("./utility/fileUploads");
const uploads = require("./utility/multerConfig");
require("dotenv").config();
const { setSocket } = require("./controller/orderController"); // make sure you export setSocket

// ✅ connect to database
mongoose.connect(process.env.DB_url)
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log("An error occurred while trying to connect::::", err));

const app = express();
app.use(express.json());

// ✅ create a single http server
const httpServer = createServer(app);

// ✅ attach socket.io to that server
const io = new Server(httpServer, {
  cors: { origin: "*" }
});

// ✅ inject socket into your controllers
setSocket(io);

// routers
app.use("/order", todoRouter);
app.use("/brand", todoRouter);
app.use("/auth", authRouter);
app.use("/product", todoRouter);
app.use("/profile", todoRouter);
app.use("/histories", todoRouter);

// file upload route
app.post("/file-uploads", uploads.single("file"), async (req, res) => {
  console.log("file properties", req.file);
  const fileDetails = await uploadFile(req.file);
  res.send({
    message: "File uploaded successfully",
    fileDetails,
  });
});

// normalize users route
app.get("/normalize", async (req, res) => {
  await userModel.updateMany({}, { role: "customer" });
  res.send("Done");
});

// test route
app.get("/", (req, res) => {
  res.send("API is working");
});

// ✅ start server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server has started on port ${PORT}`);
});
