// import express from "express";
// import Provider from "oidc-provider";
// import path from "path";
// import Keygrip from "keygrip";
// import e from "express";

// export default async function GET(req, res) {
//   // const app = express();

//   //Middlewares
//   // app.use(express.static(__dirname + "/public"));
//   // app.set("views", path.join(__dirname, "views"));
//   // app.set("view engine", "ejs")
//   try {
//     const keylist = ["SEKRIT3", "SEKRIT2", "SEKRIT1"];
//     let chaves = Keygrip(keylist);
//     console.log(chaves.sign, chaves.verify, chaves.index);

//     const configuration = {
//       clients: [
//         {
//           client_id: "oidcCLIENT",
//           client_secret: "Some_super_secret",
//           grant_types: ["authorization_code"],
//           redirect_uris: [
//             "http://localhost:3000/api/auth/client",
//             "https://oidcdebugger.com/debug",
//             "http://localhost:8080/auth/login/callback",
//           ],
//           response_types: ["code"],

//           //other configurations if needed
//         },
//       ],
//       pkce: {
//         required: () => false,
//       },
//       cookies: {
//         long: {
//           httpOnly: true,
//           overwrite: true,
//           sameSite: "none",
//         },
//         names: {
//           interaction: "_interaction",
//           resume: "_interaction_resume",
//           session: "_session",
//         },
//       },
//     };

//     const oidc = new Provider(process.env.NEXTAUTH_URL, configuration);
//     return res.status(200).json({ mensagem: "sucesso" });
//     // console.log(oidc);
//     // return oidc;
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ mensagem: error.toString() });
//   }

//   // app.use("/oidc", oidc.callback());

//   // app.listen(3000, function () {
//   //   console.log("OIDC is listening on port 3000!");
//   // });
// }
