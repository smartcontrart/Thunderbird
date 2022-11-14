const pool = require('./pool')

async function createComment(author, content, publication_date, video_name){
    try {
        const query_result = await pool.query('INSERT INTO comments (author, content, publication_date, video_name) VALUES ($1, $2, $3, $4) RETURNING *', [author, content, publication_date, video_name])
        return query_result.rows
    }catch(err){
        console.log(err)
    }
}

async function findCommentsByVideo(video_name){
    try {
        const query_result = await pool.query('SELECT * FROM comments WHERE video_name = $1', [video_name])
        return query_result.rows
    }catch(err){
        console.log(err)
    }
}



module.exports =  {
    createComment,
    findCommentsByVideo
}