const pool = require('./pool')

async function catchErrors(myFunc){

}

async function createPubkeyEntry(pubkey, token){
    try {
        const query_result = await pool.query('INSERT INTO pubkeys (pubkey, token, videos) VALUES ($1, $2, $3) RETURNING *', [pubkey, token, []])
        return query_result.rows[0]
    }catch(err){
        console.log(err)
    }
}

async function updateTokenWithPubkey(pubkey, token){
    try {
        const query_result = await pool.query('UPDATE pubkeys SET token = $1 WHERE pubkey = $2 RETURNING *', [token, pubkey])
        return query_result.rows[0]
    }catch(err){
        console.log(err)
    }
}

async function findPubkeyEntryWithPubkey(pubkey){
    try{
        const query_result = await pool.query('SELECT * FROM pubkeys WHERE pubkey = $1', [pubkey])
        return query_result.rows[0]
    }catch(err){
        console.log(err)
    }
}

async function findPubkeyEntryWithToken(token){
    try{
        const query_result = await pool.query('SELECT * FROM pubkeys WHERE token = $1', [token])
        return query_result.rows[0]
    }catch(err){
        console.log(err)
    }
}

async function addVideoToPubkey(pubkey, video_name){
    try{
        console.log(`pubkey: ${pubkey}`)
        let pubkey_data = await findPubkeyEntryWithPubkey(pubkey)
        let videos = pubkey_data.videos
        videos.push(video_name)
        const query_result = await pool.query('UPDATE pubkeys SET videos = $1 WHERE pubkey = $2 RETURNING *', [videos, pubkey])
        return query_result.rows[0]
    }catch(err){
        console.log(err)
    }
}

module.exports =  {
    createPubkeyEntry,
    updateTokenWithPubkey,
    findPubkeyEntryWithPubkey,
    findPubkeyEntryWithToken,
    addVideoToPubkey
}