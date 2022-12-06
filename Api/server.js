import express from "express"
import cors from "cors"
import { upload } from "./middleware/upload.js";
import fs from "fs";

const app = express()
const port = 5000;

const fileUpload =  upload().fields([
    { name : 'files' }
]);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static("uploads"));

app.get("/api/upload", async (req, res) => {
    const dirname = "uploads";
    if (!fs.existsSync(dirname)){
        fs.mkdirSync(dirname, { recursive: true });
    }
    let uploads = [];
    let i = 1;
    fs.readdirSync(dirname).forEach(file => {
        uploads.push(dirname + "/" + file);
        i++;
    });

    res.status(200).json({status: "success", message: "Files fetched successfully!", uploads: uploads});
});

app.post("/api/upload", fileUpload ,async (req, res) => {
    let newfiles = [];

    req.files.files.map((file) => {
        newfiles.push(file.destination + "/" + file.filename)
    })

    res.status(200).json({status: "success", message: "Files uploaded successfully!", files: newfiles});
});

app.get("/api/uploads/:filename/download", async (req, res) => {
    res.download(`uploads/${req.params.filename}`);
});

app.use("*", (req, res) => {
    res.status(404).json({status: "fail", message: "Not found!"})
})

app.listen(port, () => {
    console.log(`Listening on the port: ${port}`)
});
