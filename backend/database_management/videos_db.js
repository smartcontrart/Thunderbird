const pool = require('./pool')

async function findAllVideoEntries(){
    try{
        const query_result = await pool.query('SELECT * FROM videos')
        return query_result.rows
    }catch(err){
        console.log(err)
    }
}

async function findVideoEntryWithname(name){
    try{
        const query_result = await pool.query('SELECT * FROM videos WHERE name = $1', [name])
        return query_result.rows[0]
    }catch(err){
        console.log(err)
    }
}

async function createVideoEntry(video_data){
    try {
        const query_result = await pool.query('INSERT INTO videos (name, thumbnail, title, uploader_pubkey, description, publication_date, views, tips, tips_amount, purchases, purchases_amount, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',[
            video_data.name, 
            video_data.thumbnail, 
            video_data.title, 
            video_data.uploader_pubkey, 
            video_data.description,
            video_data.publication_date,
            video_data.views, 
            video_data.tips, 
            video_data.tips_amount, 
            video_data.purchases, 
            video_data.purchases_amount,
            video_data.price
        ])
        return query_result.rows[0]
    }catch(err){
        console.log(err)
    }
}

async function updateTipWithName(tip, name){
    let video = await findVideoEntryWithname(name);
    let new_tips = video.tips + 1;
    let new_tips_amount = video.tips_amount + tip;
    try {
        const query_result = await pool.query('UPDATE videos SET (tips, tips_amount) = ($1, $2) WHERE name = $3 RETURNING *', [new_tips, new_tips_amount, name])
        return query_result.rows[0]
    }catch(err){
        console.log(err)
    }
}


async function updatePurchaseWithName(name){
    let video = await findVideoEntryWithname(name);
    let new_purchases = video.purchases + 1;
    let new_purchases_amount = video.purchases_amount + video.price;
    try {
        const query_result = await pool.query('UPDATE videos SET (purchases, purchases_amount) = ($1, $2) WHERE name = $3 RETURNING *', [new_purchases, new_purchases_amount, name])
        return query_result.rows[0]
    }catch(err){
        console.log(err)
    }
}

async function addView(name){
    let video = await findVideoEntryWithname(name);
    let new_views = video.views + 1;
    try {
        const query_result = await pool.query('UPDATE videos SET views = $1 WHERE name = $2 RETURNING *', [new_views, name])
        return query_result.rows[0]
    }catch(err){
        console.log(err)
    }
}

async function findAllVideosByUploader(pubkey){
    try{
        const query_result = await pool.query('SELECT * FROM videos WHERE uploader_pubkey = $1', [pubkey])
        return query_result.rows
    }catch(err){
        console.log(err)
    }
}

async function searchVideos(filter){
    try{
        const query_result = await pool.query("SELECT * FROM videos WHERE title LIKE '%' || $1 || '%' LIMIT 10", [filter])
        return query_result.rows
    }catch(err){
        console.log(err)
    }
}

module.exports =  {
    findAllVideoEntries,
    findVideoEntryWithname,
    createVideoEntry,
    updateTipWithName,
    updatePurchaseWithName,
    addView,
    findAllVideosByUploader,
    searchVideos
}