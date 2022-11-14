const { Database } = require('./db.js');
const { Node } = require('./nodemanager.js');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const lnService = require('ln-service');
// const pool =  require('./db_connection.js')
const pubkeys_db = require('./database_management/pubkeys_db.js')
const videos_db = require('./database_management/videos_db.js')
const tips_db = require('./database_management/tips_db.js')
const purchases_db = require('./database_management/purchases_db.js')
const comments_db = require('./database_management/comments_db.js')

class Route{

    constructor(){
        this.db = new Database()
        this.node = new Node ("LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNKekNDQWMyZ0F3SUJBZ0lSQU5VWk55cE1pbjZsZHR3YWpCbHZlUWd3Q2dZSUtvWkl6ajBFQXdJd01URWYKTUIwR0ExVUVDaE1XYkc1a0lHRjFkRzluWlc1bGNtRjBaV1FnWTJWeWRERU9NQXdHQTFVRUF4TUZZV3hwWTJVdwpIaGNOTWpFd09UQXhNVFV3TnpBMVdoY05Nakl4TURJM01UVXdOekExV2pBeE1SOHdIUVlEVlFRS0V4WnNibVFnCllYVjBiMmRsYm1WeVlYUmxaQ0JqWlhKME1RNHdEQVlEVlFRREV3VmhiR2xqWlRCWk1CTUdCeXFHU000OUFnRUcKQ0NxR1NNNDlBd0VIQTBJQUJHanE1UXE5ZkFVN0dyU25idm5SeHV1YTBsY3JRR1NwV3NCaXhuZDh3eHk4VlN1dAovWGlLZE5Fd1RkYWgzV3FRVVN1UW94cVF6NTZHTjlMbFI4Y2NQR0NqZ2NVd2djSXdEZ1lEVlIwUEFRSC9CQVFECkFnS2tNQk1HQTFVZEpRUU1NQW9HQ0NzR0FRVUZCd01CTUE4R0ExVWRFd0VCL3dRRk1BTUJBZjh3SFFZRFZSME8KQkJZRUZCMlUyckFSVTJRU3F3cDJrM2lZYTkxeVM1UXVNR3NHQTFVZEVRUmtNR0tDQldGc2FXTmxnZ2xzYjJOaApiR2h2YzNTQ0JXRnNhV05sZ2c1d2IyeGhjaTF1TXkxaGJHbGpaWUlFZFc1cGVJSUtkVzVwZUhCaFkydGxkSUlIClluVm1ZMjl1Ym9jRWZ3QUFBWWNRQUFBQUFBQUFBQUFBQUFBQUFBQUFBWWNFckJNQUJEQUtCZ2dxaGtqT1BRUUQKQWdOSUFEQkZBaUVBcXNWSm05U3FQMjQ4SjNWVkJQTWpFeWhjVHJiWWRVR3V5VVRrdEo2RU1Oc0NJRW4zMFYybApOM3dEbTBLdkNTMzdMdmlMK2s2bEtOcUlMTkVkWDlHUXhPNlEKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=",
        "AgEDbG5kAvgBAwoQUlq72OUD7YvPt2HEjCtVMxIBMBoWCgdhZGRyZXNzEgRyZWFkEgV3cml0ZRoTCgRpbmZvEgRyZWFkEgV3cml0ZRoXCghpbnZvaWNlcxIEcmVhZBIFd3JpdGUaIQoIbWFjYXJvb24SCGdlbmVyYXRlEgRyZWFkEgV3cml0ZRoWCgdtZXNzYWdlEgRyZWFkEgV3cml0ZRoXCghvZmZjaGFpbhIEcmVhZBIFd3JpdGUaFgoHb25jaGFpbhIEcmVhZBIFd3JpdGUaFAoFcGVlcnMSBHJlYWQSBXdyaXRlGhgKBnNpZ25lchIIZ2VuZXJhdGUSBHJlYWQAAAYgD18qn84ayQnOvUBSFi35/7NpPCNsc98+pwHgG82JPmo=",
        "127.0.0.1:10003")
    }

    async postComment(req, res){
        let author = "anonymous"
        let author_node;
        if(req.headers.xtoken){
            author = await pubkeys_db.findPubkeyEntryWithToken(req.headers.xtoken)
            author_node = await this.node.getNodeInfo(author.pubkey)
        }
        let comment = await comments_db.createComment(author_node.alias, req.body.content, Date.now(), req.body.video.name)
        let response = Object.assign(comment, {success: true})
        res.send(JSON.stringify(response))
    }

    async getComments(req, res){
        let comments = await comments_db.findCommentsByVideo(req.body.video.name)
        res.send(JSON.stringify(comments))
    }

    async getVideos(req, res){
        console.log('works')
        let videos = await videos_db.findAllVideoEntries()
        res.send(JSON.stringify(videos))
    }

    async uploadFile(req, res){
        let uuid = uuidv4()
        let video_ext = req.files.video.name.split(".")
        let video_name = uuid + "." + video_ext[video_ext.length -1]
        let thumbnail_ext = req.files.thumbnail.name.split(".")
        let thumbnail_name = uuid + "." + thumbnail_ext[thumbnail_ext.length -1]
        let video_title = req.body.videoTitle
        let video_description = req.body.videoDescription
        let uploader_pubkey = null;
        req.files.video.mv(__dirname + '/videos/' + video_name, (err)=>{
            console.log(err)
        })
        req.files.thumbnail.mv(__dirname + '/thumbnails/' + thumbnail_name, (err)=>{
            console.log(err)
        })

        if(req.headers.xtoken){
            // if a token is sent, the pubkey has to exist in the db, as such, 
            // we add the video to the ones owned by the uploader
            let uploader_data = await pubkeys_db.findPubkeyEntryWithToken(req.headers.xtoken)
            uploader_pubkey  = uploader_data.pubkey
            pubkeys_db.addVideoToPubkey(uploader_pubkey, video_name)
        }
        let video_data={
            name: video_name, 
            thumbnail: thumbnail_name, 
            title: video_title, 
            uploader_pubkey: uploader_pubkey,
            description: video_description,
            publication_date: Date.now(),
            views: 0, 
            tips: 0, 
            tips_amount: 0, 
            purchases: 0, 
            purchases_amount: 0,
            price: 200
        }
        videos_db.createVideoEntry(video_data)
        res.send(JSON.stringify({success: true}))
    }

    async getVideos(req, res){
        let videos = await videos_db.findAllVideoEntries()
        res.send(JSON.stringify(videos))
    }

    async getVideoData(req, res){
        let userHasVideo;
        let response;
        let video_name = req.params.id
        let data = await videos_db.findVideoEntryWithname(video_name)
        // let video_comments = []
        if(req.headers.xtoken){
            let user = await pubkeys_db.findPubkeyEntryWithToken(req.headers.xtoken)
            userHasVideo = user.videos.includes(data.name) ? true : false
        }
        response= JSON.stringify({videoData: data, userHasVideo: userHasVideo})
        res.send(response)
    }

    async addTip(req, res){
        let tip = parseInt(req.body.amount)
        let user = await pubkeys_db.findPubkeyEntryWithToken(req.headers.xtoken)
        let video = await videos_db.updateTipWithName(tip, req.body.video_name)
        let response = await tips_db.createTipsEntry(user.pubkey, tip, req.body.video_name)
        // let response = this.db.addtip(req.body.amount, req.body.video_name)
        res.send(JSON.stringify(response))
    }

    async addView(req, res){
        res.send(JSON.stringify(await videos_db.addView(req.body.video_name)))
    }

    // erasedb(req, res){
    //     this.db.eraseDB()
    //     res.send(JSON.stringify(this.db.getVideos()))
    // }

    streamVideo(req, res){
        const path = __dirname +`/videos/` + req.params.name;
        const stat = fs.statSync(path);
        const fileSize = stat.size;
        const range = req.headers.range;
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize-1;
            const chunksize = (end-start) + 1;
            const file = fs.createReadStream(path, {start, end});
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(path).pipe(res);
        }
    }

    getThumbnail(req, res){
        const path = __dirname +`/thumbnails/` + req.params.name;
        res.sendFile(path);
    }

    // async connectNode(req, res){
    //     // Save the node info in the db
    //     let response;

    //     if (this.db.saveNode(req.body)){
    //         let node = await new Node(req.body.tls_cert, req.body.macaroon, req.body.nodeIp)
    //         let node_info = await node.getWalletInfo()
    //         response = Object.assign(node_info, {success: true})
    //     }else{
    //         response = {succes: false}
    //     }

    //     // Test the connection of the node
    //     res.send(JSON.stringify(response))
    // }

    // async findNode(req, res){
    //     let response;
    //     this.db.saveNodePubkey(req.body.pubkey)
    //     let node_info = await this.node.getNodeInfo(req.body.pubkey)
    //     .then((node_info)=>{
    //         response = Object.assign(node_info, {success: true})
    //     })
    //     .catch((err)=>{
    //         response = {success: false, message: "Could not find node"}
    //     })     
    //     res.send(JSON.stringify(response))
    // }

    // getNodes(req, res){
    //     res.send(JSON.stringify(this.db.getNodes()))
    // }

    async getInvoice(req, res){
        let response;
        let invoice = await this.node.generateInvoice(req.body.amount, req.body.memo)
        .then((invoice) =>{
            response = Object.assign(invoice, {success: true})
        })
        .catch((err)=>{
            response = {success: false, message: "Could not generate invoice"}
        })
        res.send(JSON.stringify(response)) 
    }

    async getInvoiceStatus(req, res){
        let response;
        let invoice_id = req.body.invoice_id
        // let video_name = req.body.video_name
        let invoice_status = await this.node.getInvoiceStatus(invoice_id)
        .then((invoice_status)=>{
            if(invoice_status.is_confirmed) {
                response = Object.assign(invoice_status, {success: true})
                // this.db.addView(video_name)
            }else{
                response = {success: false, message: "invoice not paid"}
            }
        })
        .catch((err)=>{
            console.log(err)
            response = {success: false, message: "error fetching invoice status"} 
        })
        res.send(JSON.stringify(response)) 
    }

    async search(req, res){
        let results = await videos_db.searchVideos(req.body.query) 
        res.send(JSON.stringify(results))
    }

    async verifyMessage(req, res){
        let response;
        let pubkey = req.body.pubkey
        let signing_pubkey = await this.node.verifyMessage(req.body.message, req.body.signature)
        .then(async (signing_pubkey)=> {
            if(signing_pubkey === pubkey){
                let token = uuidv4().replace(/-/g, "")
                response = {success: true, token: token}
                let pk = await pubkeys_db.findPubkeyEntryWithPubkey(pubkey)
                if (!pk){
                    pubkeys_db.createPubkeyEntry(pubkey, token)
                } else{
                    pubkeys_db.updateTokenWithPubkey(pubkey, token)
                }
            }else{
                response = {success: false, message: "The pubkey provided and the one which signed the message do not match. Please retry"} 
            }
        })
        .catch((err)=>{
            console.log(err)
            response = {success: false, message: "Signature invalid, please try again"} 
        })
        res.send(JSON.stringify(response)) 
    }

    async buyVideo(req, res){
        let response;
        let video = await videos_db.updatePurchaseWithName(req.body.video.name)
        let user = await pubkeys_db.findPubkeyEntryWithToken(req.headers.xtoken)
        let purchase_data = await purchases_db.createPurchaseEntry(user.pubkey, video.price, req.body.video.name)
        if(user.pubkey){
            pubkeys_db.addVideoToPubkey(user.pubkey, req.body.video.name)
            response = {success: true, purchase_data: purchase_data}
        }else{
            response = {success: false, message: "Could not unlock video for user"}
        }
        res.send(JSON.stringify(response))
    }

    async getPubkeyVideosData(req, res){
        let uploaderData = await pubkeys_db.findPubkeyEntryWithToken(req.headers.xtoken)
        let uploaderVideos = await videos_db.findAllVideosByUploader(uploaderData.pubkey)
        
        let response;
        if(uploaderVideos.length > 0){
            response =  ({success: true, videosData: uploaderVideos})
        }else{
            response = ({succes: false, message: "User did not upload any videos"})
        }
        res.send(JSON.stringify(response))
    }
}

module.exports = { Route }