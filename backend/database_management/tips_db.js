const pool = require('./pool')

async function createTipsEntry(tipper_pubkey=null, tip_amount, video_name){
    try {
        const query_result = await pool.query('INSERT INTO tips (tipper, tips_amount, paid_out, video_name) VALUES ($1, $2, $3, $4) RETURNING *', [tipper_pubkey, tip_amount, false, video_name])
        return query_result.rows[0]
    }catch(err){
        console.log(err)
    }
}

async function findTipsEntriesWithVideoID(video_name){
    try{
        const query_result = await pool.query('SELECT * FROM tips WHERE video_name = $1', [video_name])
        return query_result.rows
    }catch(err){
        console.log(err)
    }
}

module.exports =  {
    createTipsEntry,
    findTipsEntriesWithVideoID
}