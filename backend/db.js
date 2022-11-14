const fs = require('fs');

class Database{
    #comments;
    #videos;
    #nodes;
    #pubkeys;

    constructor(){
        let comments = this.loadComments()
        this.#comments = comments ? comments : []
        let videos = this.loadVideos()
        this.#videos = videos ? videos : []
        let nodes = this.loadNodes()
        this.#nodes = nodes ? nodes : []
        let pubkeys = this.loadPubkeys()
        this.#pubkeys = pubkeys ? pubkeys : []
    }

    updateDB(){
        fs.writeFile('./the_db.json', JSON.stringify({comments: this.#comments, videos: this.#videos, nodes: this.#nodes, pubkeys: this.#pubkeys}),err =>{
            if(err){
                console.log(err)
            }else{
                console.log('db_updated')
            }
        })
    }

    postComment(body){
        let comment = {author: body.author, content: body.content}
        if(this.#comments.push(comment)){
            this.updateDB()
            return comment
        }else return null
    }

    getComments(){
        return this.#comments
    }

    saveVideo(video_data){
        if(this.#videos.push(video_data)){
            this.updateDB()
            return video_data
        }else return null
    }

    getVideos(){
        return this.#videos
    }

    getVideoData(name){
        let video_data;
        this.#videos.map((video)=>{
            if(video.name === name) {
                video_data = video
            }
        })
        return video_data
    }

    addtip(tip, video_name){
        let total_tips = 0
        let video = this.#videos.find((video)=> video.name === video_name)
        video.tips += 1
        video.tips_amount += tip
        total_tips = video.tips
        this.updateDB()
        return {success: true, tips: total_tips}
    }

    addview(video_name){
        let total_view = 0
        this.#videos.map((video)=>{
            if(video.name === video_name){
                video.views = video.views + 1
                total_view = video.views
            }
        })
        this.updateDB()
        return {success: true, views: total_view}
    }

    saveNode(body){
        let node = {tls_cert: body.tls_cert, macaroon: body.macaroon, nodeIp: body.nodeIp}
        if(node.tls_cert && node.macaroon && node.nodeIp && this.#nodes.push(node)){
            this.updateDB()
            return node
        }else return null
    }

    addPubkey(pubkey){
        if(this.#pubkeys.push({'pubkey': pubkey.pubkey, 'token': pubkey.token, 'videos': pubkey.videos})){
            this.updateDB()
            return pubkey
        }else return null
    }

    updatePubkey(pubkey){
        let pk = this.#pubkeys.find(publickey => publickey.pubkey === pubkey.pubkey)
        pk = pubkey
        this.updateDB()
    }

    getNodes(){
        return this.#nodes
    }

    getPubkeys(){
        return this.#pubkeys
    }

    eraseDB(){
        this.#comments = []
        this.#videos = []
        this.#nodes = []
        this.#pubkeys = []
        this.updateDB()
    }

    async loadComments(){
        const db_content = await fs.readFile('./the_db.json', (err, data)=>{
            this.#comments = data != "" ? JSON.parse(data.toString()).comments : []
        })
    }

    async loadVideos(){
        const db_content = await fs.readFile('./the_db.json', (err, data)=>{
            this.#videos = data !="" ? JSON.parse(data.toString()).videos : []
        })
    }

    async loadNodes(){
        const db_content = await fs.readFile('./the_db.json', (err, data)=>{
            this.#nodes = data !="" ? JSON.parse(data.toString()).nodes : []
        })
    }

    async loadPubkeys(){
        const db_content = await fs.readFile('./the_db.json', (err, data)=>{
            this.#pubkeys = data !="" ? JSON.parse(data.toString()).pubkeys : []
        })
    }

    setToken(pubkey, token){
        let pk;
        pk = this.#pubkeys.find(publickey => publickey.pubkey === pubkey)
        if (!pk){
            pk = {pubkey: pubkey, token: token, videos: []}
            this.addPubkey(pk)
        } else{
            pk['token'] = token
            this.updatePubkey(pk)
        }
        return token
    }
}

module.exports = { Database }