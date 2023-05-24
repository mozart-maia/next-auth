import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import helmet from "helmet";
import path from "path";
import http from "http";
import { Issuer, Strategy } from "openid-client";
const app = express();

export default function GET(req, res) {
  try {
    app.use(cookieParser());
    app.use(
      express.urlencoded({
        extended: true,
      })
    );
    // app.set("views", path.join(__dirname, "views"));
    // app.set("view engine", "ejs");
    // app.use(express.static(path.join(__dirname, "public")));
    app.use(cookieParser());
    app.use(
      express.urlencoded({
        extended: true,
      })
    );

    app.use(express.json({ limit: "15mb" }));
    app.use(
      session({ secret: "secret", resave: false, saveUninitialized: true })
    );
    app.use(helmet());
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
      console.log("-----------------------------");
      console.log("serialize user");
      console.log(user);
      console.log("-----------------------------");
      done(null, user);
    });
    passport.deserializeUser(function (user, done) {
      console.log("-----------------------------");
      console.log("deserialize user");
      console.log(user);
      console.log("-----------------------------");
      done(null, user);
    });

    Issuer.discover("http://localhost:3000/api/auth/oidc").then(function (
      oidcIssuer
    ) {
      var client = new oidcIssuer.Client({
        client_id: "oidcCLIENT",
        client_secret: "Some_super_secret",
        redirect_uris: ["http://localhost:3000/api/auth/client"],
        response_types: ["code"],
      });

      passport.use(
        "oidc",
        new Strategy(
          { client, passReqToCallback: true },
          (req, tokenSet, userinfo, done) => {
            console.log("tokenSet", tokenSet);
            console.log("userinfo", userinfo);
            req.session.tokenSet = tokenSet;
            req.session.userinfo = userinfo;
            return done(null, tokenSet.claims());
          }
        )
      );
    });

    app.get(
      "/login",
      function (req, res, next) {
        console.log("-----------------------------");
        console.log("/Start login handler");
        next();
      },
      passport.authenticate("oidc", { scope: "openid" })
    );

    app.get("/auth/login/callback", (req, res, next) => {
      passport.authenticate("oidc", {
        successRedirect: "/user",
        failureRedirect: "/",
      })(req, res, next);
    });

    app.get("/", (req, res) => {
      res.send(" <a href='/login'>Log In with OAuth 2.0 Provider </a>");
    });
    app.get("/user", (req, res) => {
      res.header("Content-Type", "application/json");
      res.end(
        JSON.stringify(
          { tokenset: req.session.tokenSet, userinfo: req.session.userinfo },
          null,
          2
        )
      );
    });

    const httpServer = http.createServer(app);
    // const server= https.createServer(options,app).listen(3003);
    return res.status(200).json({ mensagem: "sucesso" });
    // console.log(httpServer);
    // return httpServer.listen(8080, () => {
    //   console.log(`Http Server Running on port 3004`);
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensagem: error.toString() });
  }
}
