const urlLogin ="http://localhost:5000/oauth/token";

async function auth(username, password){
    try{
        const data = await axios.post(urlLogin,{data:{
            username,
            password,
            grant_type:'password',
          }});
        return {token:data.data.access_token, error: false};
    }catch{
        return {token:"",
    error:true}
    }
}
module.exports = {auth};