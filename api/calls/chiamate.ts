import axios from "axios"

export const chiamata_publ_get = (url:string) =>{
    return axios.get(url);
}

export const chiamata_publ_get_async = async (url:string) =>{
    return await axios.get(url);
}

export const chiamata_publ_post = (url:string, body?:any) =>{
    return axios.post(url,body);
}

export const chiamata_publ_post_async = async (url:string,body?:any) =>{
    return await axios.post(url,body);
}