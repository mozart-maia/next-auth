// import { getSession } from "next-auth/react";
import Layout from "../components/layout";
// import { useEffect } from "react";

// import { Session } from "next-auth";
// import { auth } from "./api/auth/lib/firestore";

export default function IndexPage() {
  // console.log(sessionStorage);
  // console.log(getSession().then((dados) => console.log(dados)));
  // console.log(auth);
  // useEffect(() => {
  //   async function getOidc() {
  //     await fetch("/api/oidc");
  //   }

  //   getOidc();
  // }, []);

  return (
    <Layout>
      <h1>NextAuth.js Example</h1>
      <p>
        This is an example site to demonstrate how to use{" "}
        <a href="https://next-auth.js.org">NextAuth.js</a> for authentication.
      </p>
    </Layout>
  );
}
