const pgp = require('pg-promise')

const getDbConnect = (function (){
    let dbConn = null
    return (dbAddr) =>{
        if(!dbConn){
            dbConn = pgp({})(dbAddr)
        }
        return dbConn
    }
})();




module.exports = {getDbConnect}