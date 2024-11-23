import {initializeApp, cert} from "firebase-admin/app";
import {getMessaging} from "firebase-admin/messaging";

const app  = initializeApp({
    credential: cert(require("./serviceAccount.json")),
    databaseURL: ""
});
const adminMessage = getMessaging(app);

adminMessage
    .send({
        data: {
            type: "sample",
        },
        topic: "topic",
        android: {
            priority: "high"
        },
        apns: {
            payload: {
                aps: {
                    contentAvailable: true
                }
            }
        }
    })
    .then(() => console.log("notification sent"))
    .catch((e) => console.log(e));
