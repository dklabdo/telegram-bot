// lib/firebaseAdmin.js
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "order-81a58",
      clientEmail: "firebase-adminsdk-zejue@order-81a58.iam.gserviceaccount.com",
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCr3PgGqjxMlROc\n03cr+Vx6h9UZt3ZDTg8Y3bfFeLfBRNTXuV/1pT/s8B/ubA7aJ09VSsIpcBgfgH/o\nG2mJZuGmM6FERE4CaAlorfAqm/UF/++ZhuQUOCQ3Q78J8mKKrh6IP46wpUvWu0R/\n2WasoXwnv0ZCIjLQ4NtYy+fVJLrhDIZ82mFt3WQNLANLIpN9fTOqLYLlpIaxFVtj\nWHTT0QpMVZjA4XCfqd+jLa0ojlTKCxufL1TgnLNAHqyp/OygY8KcILKjXVbF+biw\njC4T3yum20l6opZwVYOVadYIM3f1qd/SU5JjgijTIj/XUouYBYotPecjbfGd7r23\nMlHnPiobAgMBAAECggEAAswV6AXdSrcib+sBMDYJdfUVWCskQZ7Y9WP7xGWyl/Kx\nhCaq6SnyCxPdcS6mZJE/OU7ThNkji1+2tTsSUf+FV1nVG3IBKF4zyQBhEvshgczT\nRCxt3zu1WzDpwGpcMDr6mZJvQBtwoI4WZKj6gtTIsIeXHSccAfT8R6BfUENzceDm\nGn5YFq7xIUU+6BWbMiY9HcbS35n8Wa8dlym9A84Z/2W7diG1C3rY+FCVHRTfZRIf\nzmCjRjZP/rtXi2D4Vky+VYbfIWu7TraOZTM1seRh3JTgwhWgrTHGTmGd3XGEDVrY\n4YtuDSUl3GUFG6yHhbyAH/kVf07vAL5q2piPWrTYAQKBgQDrc3gYptl1h6pmfQ+k\nheUx0UVXBeefGzso3k7ufU7W5NBArDx53lmzqnHMMjsRs3pIVjCJcrRWnVCSL1k9\n1g7h+pnyKtN/t9cqe1xMeu17RQV/w9tQ+VqAKob2MOf2FpUYxTHUl55ijymHhgsl\nvqKVHan9dFDvA4XA9we57tLzyQKBgQC63MvnkiDGymBKPukvqnMQPlx+z9oJQ72S\nSvVSco+HNGK86c3NMLLxnNdgPisl0lx0cdlHOa/VBnv1Bq0H7PPD7RO2zPi0jGhe\nlhTySwFtl0HySHIg8o1fikPGd3GMYefCzBjg28MNk0e4JqVZyQ+hbV4etbrbACY0\nL/yvgaa4wwKBgQCeYMnEK1fTyzJARpejH74QSKjP5NTtHbApyYBmxDuoKbo8Bp+X\nio3kYR6zMIazXXs/9Voo2tOb/64W52qsQbU5JQ0w7MXf/5XoqZpoh7f/V2pfiyuX\nyGOsGu8146fkzUP1qY/fZS3RNmPFGdGdziInFBEowHlAjaoHJyQ3WgLkoQKBgHS9\n3OYf9To81UuNYkHVS22qiD7xvFZta9Ip4npP+DuQDt/XcivvcNxiEGyganSGqBxX\nxFcrQx7jni3GrfN1phWR1+8sv3SNA+eT/CIjmhDNnvWvLR5Iaup1h0JG/TmnMRQS\nTrisk3+3s+bovgUKCCniGhs1jjekMDoKgONlLLPhAoGABwVufJfZqqGoUnSEc2jJ\n9I3/5jUZ8gUCGkstf3hsS6sqC1C/7YVnvy4FB6HIPKD8ETMjQpA6kE459ROUX2DV\nVfOfsYpyRp5ARajXo1ncND0a/qpKqzg5rLSgcyaEHYNIq26/RvhwUCvLBjcppbKh\nXeEak8vveKqa5AcRjMq69sc=\n-----END PRIVATE KEY-----\n",
    }),
  });
}

const db = admin.firestore();
export { db };
