const pool = require('./pool')

async function createPurchaseEntry(purchaser, purchase_amount, video_name){
    try {
        const query_result = await pool.query('INSERT INTO purchases (purchaser, purchase_amount, video_name) VALUES ($1, $2, $3) RETURNING *', [purchaser, purchase_amount, video_name])
        return query_result.rows[0]
    }catch(err){
        console.log(err)
    }
}

async function findPurchasesEntriesWithVideoID(video_name){
    try{
        const query_result = await pool.query('SELECT * FROM purchases WHERE video_name = $1', [video_name])
        return query_result.rows
    }catch(err){
        console.log(err)
    }
}

module.exports =  {
    createPurchaseEntry,
    findPurchasesEntriesWithVideoID
}