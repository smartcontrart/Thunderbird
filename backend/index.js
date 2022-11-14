const express = require("express");
const cors = require("cors");
const { Node } = require('./nodemanager');
const { response } = require("express");
const { Route } = require('./routes');
const fileUpload = require("express-fileupload");


const app = express();
app.use(cors());
app.use(fileUpload({debug: true}))

const port = process.env.PORT || 4000
const routes = new Route()

app.listen(port, () => {
  console.log("serving backend");
});

app.use(express.json());

// const catchAsyncErrors = (routeHandler =>{
//     return async (req, res)=>{
//         try{
//             const promise = routeHandler(req, res)
//             if (promise) {
//                 await promise;
//                 return promise}
//         }catch(err){
//             console.log(`err: ${err}`)
//             res.status(400).send({success: false, error:  err.message})
//             return null
//         }
//     }
// })

app.get('/api/erasedb', (req, res) =>{routes.erasedb(req, res)})
app.post('/api/comments', (req, res) =>{routes.getComments(req, res)})
app.post('/api/comment', (req, res) => {routes.postComment(req, res)})
app.delete('/api/comments/:id', (req, res) => {routes.postComment(req, res)})
app.post('/api/upload', (req, res) => {routes.uploadFile(req, res)})
app.get('/api/videos', (req, res) =>{routes.getVideos(req, res)})
app.get('/api/videos/:id', (req, res) =>{routes.getVideoData(req, res)})
app.get('/api/thumbnails/:name', (req, res) =>{routes.getThumbnail(req, res)})
app.post('/api/tip', (req, res) => {routes.addTip(req, res)})
app.post('/api/view', (req, res) => {routes.addView(req, res)})
app.get('/api/streamVideos/:name', (req, res) =>{routes.streamVideo(req, res)})
// app.post('/api/findNode', (req, res) => {routes.findNode(req, res)})
// app.post('/api/connectNode', (req, res) => {routes.connectNode(req, res)})
app.post('/api/getInvoice', (req, res) =>{routes.getInvoice(req, res)})
app.post('/api/getInvoiceStatus/:id', (req, res) =>{routes.getInvoiceStatus(req, res)})
app.post('/api/search', (req, res) =>{routes.search(req, res)})
app.post('/api/verifyMessage', (req, res) =>{routes.verifyMessage(req, res)})
app.post('/api/buyVideo', (req, res) =>{routes.buyVideo(req, res)})
app.get('/api/getPubkeyVideosData', (req, res) => {routes.getPubkeyVideosData(req, res)})


app.get("/stream_sats", (request, response, next) => {
    admin_cert = 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNDRENDQWE2Z0F3SUJBZ0lSQU9RcGIwekRmcEJqTDZPaHRnYURCYXd3Q2dZSUtvWkl6ajBFQXdJd01URWYKTUIwR0ExVUVDaE1XYkc1a0lHRjFkRzluWlc1bGNtRjBaV1FnWTJWeWRERU9NQXdHQTFVRUF4TUZZV3hwWTJVdwpIaGNOTWpBeE1EQTVNREl5TmpNMVdoY05NakV4TWpBME1ESXlOak0xV2pBeE1SOHdIUVlEVlFRS0V4WnNibVFnCllYVjBiMmRsYm1WeVlYUmxaQ0JqWlhKME1RNHdEQVlEVlFRREV3VmhiR2xqWlRCWk1CTUdCeXFHU000OUFnRUcKQ0NxR1NNNDlBd0VIQTBJQUJLT0ZjYzV4Mzk5YlBKNXBST3gwOHpjRUdUeVFIcE9PdFlwMXBFb3NqYlAxcEwzSwpCVEVSS0RBa0hhQi80eUNxYjNieEFtOHRKVFdNbUZKZUlTNnc5cmVqZ2FZd2dhTXdEZ1lEVlIwUEFRSC9CQVFECkFnS2tNQk1HQTFVZEpRUU1NQW9HQ0NzR0FRVUZCd01CTUE4R0ExVWRFd0VCL3dRRk1BTUJBZjh3YXdZRFZSMFIKQkdRd1lvSUZZV3hwWTJXQ0NXeHZZMkZzYUc5emRJSUZZV3hwWTJXQ0RuQnZiR0Z5TFc0ekxXRnNhV05sZ2dSMQpibWw0Z2dwMWJtbDRjR0ZqYTJWMGdnZGlkV1pqYjI1dWh3Ui9BQUFCaHhBQUFBQUFBQUFBQUFBQUFBQUFBQUFCCmh3U3NFd0FFTUFvR0NDcUdTTTQ5QkFNQ0EwZ0FNRVVDSUIvb2R3emJXL1FnTTgwMW45NWgwL2JwVVF0ZzNUK0EKcjg1M2hSYUlQVTVTQWlFQTV2RlA4c2Y2SUU1WUorWXAzc1I5M0hUblRQM05XOUZmcUZhQTArQ040Z0k9Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K'
    admin_mac = 'AgEDbG5kAusBAwoQcpDQW2Z9pG9MQ75TTX4D0RIBMBoWCgdhZGRyZXNzEgRyZWFkEgV3cml0ZRoTCgRpbmZvEgRyZWFkEgV3cml0ZRoXCghpbnZvaWNlcxIEcmVhZBIFd3JpdGUaFAoIbWFjYXJvb24SCGdlbmVyYXRlGhYKB21lc3NhZ2USBHJlYWQSBXdyaXRlGhcKCG9mZmNoYWluEgRyZWFkEgV3cml0ZRoWCgdvbmNoYWluEgRyZWFkEgV3cml0ZRoUCgVwZWVycxIEcmVhZBIFd3JpdGUaGAoGc2lnbmVyEghnZW5lcmF0ZRIEcmVhZAAABiC0Ud7t/uMkQx8dC9bgsKl85RCjLKObWyArkKKom/GV6w=='
    admin_socket = '127.0.0.1:10004'
    const node = new Node(admin_cert, admin_mac, admin_socket)
    try{
        node.streamSats(1,5, 1000, '02647163e26eeedac4b9cba10d821ab06583f95d3fea1be411d2718ddf94578012')
    }catch(err){
        console.log('this is my error')
        console.log(err)
    }
})
