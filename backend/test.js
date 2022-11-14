const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const lnService = require('ln-service');
const pool =  require('./db_connection.js')
const { Route } = require('./routes');


test("Fetch pubkey in DB", () => {
    let req = {body:{pubkey:"", message:"", signature:""}};
    let res = {};
    expect(Route.verifyMessage(req, res)).toBe("/about-us");
});