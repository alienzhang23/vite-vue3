import axios from 'axios';
import { Toast } from 'vant';
import baseUrl from './config';
import { useRouter } from "vue-router";
const router = useRouter()
// 创建axios实例
const service = axios.create({
    baseURL: baseUrl.dev, // api的base_url
    timeout: 15000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
    config.headers = {
        'Content-Type': 'application/json',
        // 'areaId': AREAID,
        'Authorization': window.localStorage.getItem('adminToken') || ''
    };
    if (config.method == 'get') {
        config.params = config.params || {};
    } else {
        config.data = config.data || {};
    }
    return config
}, error => {
    Promise.reject(error)
});

// respone拦截器
service.interceptors.response.use(
    response => {
        var xhr = response,
            code = xhr.data.code;
        if (code == 200) {
            return Promise.resolve(xhr);
        } else if (response.status == 204) { //删除方法
            return Promise.resolve({
                data: {
                    code: 200
                }
            });
        } else if (code === 403) {
            localStorage.clear();
            router.push('/login')
            Toast.fail(xhr.data.message)
            return Promise.reject(xhr);
        } else {
            Toast.fail(xhr.data.message)
            return Promise.reject(xhr);
        }
    },
    error => {
        if (error.response.status == 401) {
            window.localStorage.removeItem('adminToken'); //清除数据
            window.location.hash = '#/login';
        }
        return Promise.reject(error)
    }
);

const fetch = (method, url, data) => {
    if (method == 'post') {
        return service.post(url, {...data })
    } else if (method == 'get') {
        return service.get(url, {
            params: data
        })
    } else if (method == 'put') {
        return service.put(url, {
            ...data
        })
    } else if (method == 'delete') {
        return service.delete(url, {
            data: data
        })
    } else if (method == 'getFile') {
        return service.get(url, {
            params: data,
            responseType: 'blob',
        })
    }
}

export default fetch