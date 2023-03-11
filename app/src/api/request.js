import axios from "axios";

const requests=axios.create({
    //设置根路径
    baseURL:'http://127.0.0.1:8001',
    //设置超时的时间为5s
    timeout:5000
});

//请求拦截器
requests.interceptors.request.use((config)=>{  
    return config
})

//响应拦截器
requests.interceptors.response.use(
    (res)=>{
        return res.data
    },
    (err)=>{
        console.log(err.message)
    });

    export default requests;