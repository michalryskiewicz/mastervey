import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const cors = require("cors")({ origin: true });

admin.initializeApp();

admin.firestore().settings({ ignoreUndefinedProperties: true });
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const signup = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const { email, password } = request.body;

    const { uid } = await admin.auth().createUser({
      email,
      password,
    });

    response.send(uid);
  });
});

export const createSurvey = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const tokenId = req.get("Authorization")?.split("Bearer ")[1];
      const { name } = req.body;

      if (!tokenId || typeof tokenId === "undefined") {
        res.status(403).send("Unauthorized");
      }

      const { uid } = await admin.auth().verifyIdToken(tokenId as string);

      const newSurvey = { userId: uid, create: [], answers: [], name };

      await admin.firestore().collection("surveys").doc().create(newSurvey);

      return res.status(200).send(newSurvey);
    } catch (e) {
      return res.status(500).send("There was an error during creating survey");
    }
  });
});

export const getSurveys = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const tokenId = req.get("Authorization")?.split("Bearer ")[1];

    if (!tokenId || typeof tokenId === "undefined") {
      res.status(403).send("Unauthorized");
    }

    const { uid } = await admin.auth().verifyIdToken(tokenId as string);

    const surveysRef = admin.firestore().collection("surveys");
    const snapshot = await surveysRef.where("userId", "==", uid).get();

    functions.logger.log(snapshot);

    if (snapshot.empty) {
      console.log("No matching documents.");
      return res.status(200).send([]);
    }

    const data = snapshot.docs.map((doc) => doc.data());

    return res.status(200).send(data);
  });
});

export const saveSurvey = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const tokenId = req.get("Authorization")?.split("Bearer ")[1];
    const { name, create } = req.body;

    if (!tokenId || typeof tokenId === "undefined") {
      res.status(403).send("Unauthorized");
    }

    const { uid } = await admin.auth().verifyIdToken(tokenId as string);

    if (!uid) {
      return res.status(403).send("Unauthorized");
    }

    functions.logger.log("create", create);

    const surveysRef = admin.firestore().collection("surveys");
    const snapshot = await surveysRef.where("name", "==", name).get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return res.status(200).send([]);
    }

    const data = snapshot.docs.map((doc) => {
      doc.get("create").update(create);
    });

    return res.status(200).send(data);
  });
});
