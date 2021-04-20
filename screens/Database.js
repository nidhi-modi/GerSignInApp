import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "T&GGerSignin.db";
const database_version = "1.3";
const database_displayname = "GER Signin Offline Database";
const database_size = 20000000;


export default class Database {

    initDB() {
        let db;
        return new Promise((resolve) => {
            console.log("Plugin integrity check ...");
            SQLite.echoTest()
                .then(() => {
                    console.log("Integrity check passed ...");
                    console.log("Opening database ...");
                    SQLite.openDatabase(
                        database_name,
                        database_version,
                        database_displayname,
                        database_size
                    )
                        .then(DB => {
                            db = DB;
                            console.log("Database OPEN");
                            db.executeSql('SELECT 1 FROM GerSignin LIMIT 1').then(() => {
                                console.log("Database is ready ... executing query ...");
                            }).catch((error) => {
                                console.log("Received error: ", error);
                                console.log("Database not yet ready ... populating data");
                                db.transaction((tx) => {
                                    tx.executeSql('DROP TABLE IF EXISTS GerSignin', []);
                                    tx.executeSql('CREATE TABLE IF NOT EXISTS GerSignin (visitorId INTEGER PRIMARY KEY AUTOINCREMENT, visitorName VARCHAR(30), signinTime VARCHAR(20), weekNumber VARCHAR(20), signinDate VARCHAR(20), companyName VARCHAR(30), visitingPerson VARCHAR(30), visitingPersonOthers VARCHAR(30), visitedBefore VARCHAR(10), visitedOtherGH VARCHAR(10), termsConditions VARCHAR(10), signoutDate VARCHAR(20), signoutTime VARCHAR(20))');
                                }).then(() => {
                                    console.log("Table created successfully");
                                }).catch(error => {
                                    console.log(error);
                                });
                            });
                            resolve(db);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => {
                    console.log("echoTest failed - plugin not functional");
                });
        });
    };

    closeDatabase(db) {
        if (db) {
            console.log("Closing DB");
            db.close()
                .then(status => {
                    console.log("Database CLOSED");
                })
                .catch(error => {
                    this.errorCB(error);
                });
        } else {
            console.log("Database was not OPENED");
        }
    };

    addVisitor(signin) {
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO GerSignin VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [signin.visitorId, signin.visitorName, signin.signinTime, signin.weekNumber, signin.signinDate, signin.companyName, signin.visitingPerson, signin.visitingPersonOthers, signin.visitedBefore, signin.visitedOtherGH, signin.termsConditions, signin.signoutDate, signin.signoutTime]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    listVisitorsName(signinDateOnly) {
        return new Promise((resolve) => {
            const visitorDetails = [];
            this.initDB().then((db) => {
                db.transaction((tx) => {

                    tx.executeSql('SELECT p.visitorId, p.visitorName, p.signinTime, p.weekNumber, p.signinDate, p.companyName, p.visitingPerson, p.visitingPersonOthers, p.visitedBefore, p.visitedOtherGH, p.termsConditions, p.signoutDate, p.signoutTime FROM GerSignin p WHERE signinDate = ?', [signinDateOnly]).then(([tx, results]) => {
                        console.log("Query completed");
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            console.log(`Visitor ID: ${row.visitorId}, Visitor Name: ${row.visitorName}, Company: ${row.companyName}, Signin Date: ${row.signinDate}`)
                            const { visitorId, visitorName, signinTime, weekNumber, signinDate, companyName, visitingPerson, visitingPersonOthers, visitedBefore, visitedOtherGH, termsConditions, signoutDate, signoutTime } = row;
                            visitorDetails.push({
                                visitorId,
                                visitorName,
                                signinTime,
                                weekNumber,
                                signinDate,
                                companyName,
                                visitingPerson, 
                                visitingPersonOthers, 
                                visitedBefore, 
                                visitedOtherGH, 
                                termsConditions, 
                                signoutDate, 
                                signoutTime
                            });
                        }
                        console.log(visitorDetails);
                        resolve(visitorDetails);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    updateVisitorDetails(id,pts) {
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    //need to add plant name, plant row and plant week 
                    tx.executeSql('UPDATE GerSignin SET visitorId = ?, visitorName = ?, signinTime = ?, weekNumber = ?, signinDate = ?, companyName = ?, visitingPerson = ?, visitingPersonOthers = ?, visitedBefore = ?,  visitedOtherGH = ?, termsConditions = ?, signoutDate = ?, signoutTime = ? WHERE visitorId = ?', [pts.visitorId, pts.visitorName, pts.signinTime, pts.weekNumber, pts.signinDate, pts.companyName, pts.visitingPerson, pts.visitingPersonOthers, pts.visitedBefore, pts.visitedOtherGH, pts.termsConditions, pts.signoutDate, pts.signoutTime, id]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

}