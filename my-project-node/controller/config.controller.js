const db = require("../config/Db.js");
const { logError } = require("../util/logError");

const getConfig = async (req, res) => {
    try{
        const sql = `SELECT team_name as "lable", team_id as "value" FROM team`;
        const [result] = await db.query(sql);
        res.json({
            message: "Get all config successfully",
            config: result,
        });
    }catch(err){
        logError("ConfigControllers", err, res);
    }
}

module.exports = {
    getConfig
}