import express from "express"
import fotografirouter from "./routes/fotografi.js";
import fotografijerouter from "./routes/fotografije.js";

const app = express();
app.use(express.json());
const PORT = 3000;


app.use("/fotografi", fotografirouter);
app.use("/fotografije", fotografijerouter);

app.listen(3000, () => console.log("Server radi na portu 3000"));

