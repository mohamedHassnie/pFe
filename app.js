const express = require("express");
const app = express();
const upload = require("express-fileupload");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("./config/database");
AnalyseGenetique = require("./models/BaseNucleotide");
patient = require("./routes/PatientControllers");
Markiting = require("./routes/markitingRouter");
stat = require("./routes/AnalysteControllers");
const analyseRoutes = require("./routes/analyse");
const authAmin = require("./routes/admin");
const pingRoutes = require("./routes/ping");
flash = require("express-flash");
require("dotenv").config();
const PORT = process.env.PORT; //port devient 3000
const session = require("express-session");
const MongoStore = require("connect-mongo");
// stocker information dans bd a travers un id et dans le cookies ( navigateur)
const passport = require("passport");
require("./config/ConFpasseportAuth")(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const cors = require("cors");
/*
app.use(
  session({
    name: "sessionId",
    //secret: "mysecretkeythatiwillnottellyou",
    saveUninitialized: false, // don't create sessions for not logged in users
    resave: false, //don't save session if unmodified

    // Where to store session data
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 1 * 24 * 60 * 60, // = 14 days. ttl means "time to live" (expiration in seconds)
    }),

    // cookies settings
    cookie: {
      secure: false,
      httpOnly: false, // if true, will disallow JavaScript from reading cookie data
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour;
    },
  })
);
*/
//app.use(flash);
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: true }));
app.use(upload({ limit: "5mb" }));
app.use(
  morgan(
    ":date[web] :remote-user IP :remote-addr Method :method URL :url Status:status - :response-time ms Agent :user-agent"
  )
);

app.use(analyseRoutes);
app.use(pingRoutes);
app.use(authAmin);
app.use(patient);
app.use(Markiting);
app.use(stat);
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: { status: err.status || 500, message: err.message } });
});

app.get("/hello", (req, res) => {
  res.send("je suis là");
});

app.listen(PORT, () => {
  console.log(" serveur démarrer avec sucées sur le Port: " + PORT);
});
