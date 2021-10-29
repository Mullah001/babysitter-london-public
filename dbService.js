const mysql = require("mysql");
let instance = null;

const connection = mysql.createConnection({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b8ebf5d6890d2c',
    password: 'ff599450',
    database: 'heroku_981c457bea970b1'
});

connection.connect((err) => {
    if (err) console.log(err);
    console.log("db " + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async disablePost(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE posts SET posts.active = 0 WHERE posts.id = " + id + ";";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });

            //console.log(response);
            return response;


        } catch (error) {
            console.log(error);
        }
    }

    async getPosts() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM posts WHERE posts.active = 1;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });

            //console.log(response);
            return response;


        } catch (error) {
            console.log(error);
        }
    }

    async createPost(formValues) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                let query = "INSERT INTO posts (fullname, townArea, periodNeeded, phoneNumber, email,noOfChildren, ageOfChildren, hourlyFee, message, referenceNeeded, whatsappContact, signalContact, smsContact, callContact)";
                query += " VALUES(?, ?,?,?,?,?,?,?,?,?, ?, ?,?, ?);";
                console.log(query);
                const fullName = formValues.fullName;
                const townArea = formValues.townArea;
                const periodNeeded = formValues.periodNeeded;
                const phoneNumber = formValues.phoneNumber;
                const email = formValues.email;
                const noOfChildren = formValues.noOfChildren;
                const ageOfChildren = formValues.ageOfChildren;
                const hourlyFee = formValues.hourlyFee;
                const message = formValues.message;
                const referenceNeeded = formValues.references;
                const whatsappContact = formValues.whatsapp;
                const signalContact = formValues.signal;
                const smsContact = formValues.sms;
                const callContact = formValues.call;
                const formValuesArray = [fullName, townArea, periodNeeded, phoneNumber, email, noOfChildren, ageOfChildren, hourlyFee, message, referenceNeeded, whatsappContact, signalContact, smsContact, callContact];

                connection.query(query, formValuesArray, (err, res) => {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    else
                        resolve(res.insertId);
                });
            });
            console.log(insertId);
            return insertId;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;