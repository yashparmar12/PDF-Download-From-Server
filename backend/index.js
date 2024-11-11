import express from "express";
import router from "./Router/pdfRoute.js";
import cors from "cors";
const PORT = 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors("*"));


app.get('/', (req, res)=>{
    res.send("<h1>Welcomeeee</h1>")
})

app.use('/api', router);


app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`)
});