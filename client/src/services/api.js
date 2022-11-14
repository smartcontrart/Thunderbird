// export const API_URL = 'http://localhost:4000/api';
export const API_URL = process.env.NOD_ENV === 'production' ? '/api' : 'http://localhost:4000/api';

export const getToken = () => sessionStorage.getItem('TB_TOKEN') || "";
export const setToken = (token) => sessionStorage.setItem('TB_TOKEN', token);
export const clearToken = () => sessionStorage.removeItem('TB_TOKEN');

const httpGet = async (path)=>{
    const url = `${API_URL}/${path}`;
    console.log(url)
    const token = getToken();
    const response = await fetch(url,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Xtoken': token
        }
    });
    const json = await response.json();
    if (json.error){
            throw new Error(json.error)
    }
    return json;
};

const httpPost = async (path, body)=>{
    const url = `${API_URL}/${path}`;
    const token = getToken();
    const response = await fetch(url,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Xtoken': token

        },
        body: JSON.stringify(body)
    });
    const json = await response.json();
    if (json.error){
            throw new Error(json.error)
    }
    return json;
};

const httpUploadFile = async(path, file) =>{
    const url = `${API_URL}/${path}`;
    const token = getToken();
    const response = await fetch (url,{
        method: 'POST',
        headers:{
            'Xtoken': token
        },
        body: file
    });
    const json = await response.json();
    if (json.error){
            throw new Error(json.error)
    }
    return json;
}

// Comments api endpoints

export const postComment = async (video, content) => {
    return await httpPost('comment', {video: video, content: content});
};

export const getComments = async(video) => {
    return await httpPost('comments', {video: video})
}

export const uploadFile = async(file) => {
    return await httpUploadFile('upload', file)
}

export const getVideos = async() => {
    return await httpGet('videos')
}

export const getVideoData = async(video_id) => {
    return await httpGet('videos/' + video_id)
}

export const postNodeInfos = async (nodeInfos) => {
    return await httpPost('connectNode', {tls_cert: nodeInfos.tls_cert, macaroon: nodeInfos.macaroon, nodeIp: nodeInfos.nodeIp})
}

export const postNodePubkey = async (pubkey) => {
    return await httpPost('findNode', {pubkey: pubkey})
}

export const getInvoice = async (amount, memo) =>{
    return await httpPost('getInvoice', {amount: amount, memo: memo})
}

export const getInvoiceStatus = async (invoice_id) =>{
    return await httpPost('getInvoiceStatus/'+invoice_id, {invoice_id: invoice_id})
}

export const sendTip = async (amount, video_name) => {
    return await httpPost('tip', {amount: amount, video_name: video_name})
}

export const addView  = async (video_name) => {
    return await httpPost('view', {video_name: video_name})
}

export const search = async(query) =>{
    return await httpPost('search', {query: query})
}

export const verifyMessage = async (pubkey, message, signature) => {
    return await httpPost('verifyMessage', {pubkey: pubkey, message: message, signature: signature})
}

export const buyVideo = async (video) => {
    return await httpPost('buyVideo', {video: video})
}

export const getPubkeyVideosData = async () => {
    return await httpGet('getPubkeyVideosData')
}
// export const getThumbnail = async () =>{
//     return await 
// }

// export const videoSource = async (name) =>{
//     return await subscribeVideoFeed(`video/${name}`)
// }

// Upload file api endpoint
