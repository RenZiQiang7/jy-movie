import axios from 'axios'


axios.interceptors.response.use(ret=>{
    return ret.data||ret;
})

axios.interceptors.request.use(config=>{
    let jwt=localStorage.getItem('jwt');
    if(jwt){
        config.headers={
            Authorization:jwt
        };
    }
    return config;
})
export default axios