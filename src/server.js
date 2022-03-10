import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const loggerMiddleware = morgan("short");

const home = (req, res) => {
  console.log("I will respond.");
  return res.send("hello");
}

app.use(loggerMiddleware);
app.get("/", home);

const handleListening = () => 
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);