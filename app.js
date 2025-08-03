const express = require("express");
const todoRouter = require("./router/router");
const authRouter = require("./router/userRouter");
const mongoose = require("mongoose");
const userModel = require("./schema/user");
const PORT = process.env.PORT || 3000;
const  uploadFile  = require("./utility/fileUploads");
const uploads = require("./utility/multerConfig");
require("dotenv").config();

mongoose.connect(process.env.DB_url).then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log("An error occurred while trying to connect::::", err);
});

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/product", todoRouter);

app.post("/file-uploads", uploads.single("file"), async (req, res) => {
    console.log("file properties", req.file);
    const fileDetails = await uploadFile(req.file);
    res.send({
        message: "File uploaded successfully",
        fileDetails
    });
});

app.get("/normalize", async (req, res) => {
    await userModel.updateMany({}, {
        role: "customer"
    });
    res.send("Done")
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server has started on port ${PORT}`);
});

