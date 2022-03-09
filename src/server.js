import express from "express";

const app = express();

const urlLogger = (req, res, next) => {
  console.log(`Path: ${req.url}`);
  next();
};

const timeLogger = (req, res, next) => {
  const now = new Date();
  console.log(
    `Time: ${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`
  );
  next();
};

const securityLogger = (req, res, next) => {
  const protocol = req.protocol;
  if (protocol === "https") {
    console.log("Secure");
  } else {
    console.log("Insecure");
  }
  next();
};

const protectorMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    res.send("Do not allowed");
  }
  next();
};

const handleHome = (req, res) => {
  return res.end();
};

app.use(urlLogger, timeLogger, securityLogger, protectorMiddleware);
app.get("/", handleHome);

const handleListening = () => {
  console.log("Server Start!");
};

app.listen(handleListening);
