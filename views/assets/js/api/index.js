import axios from 'axios';

const axiosClient = axios.create({
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default {
    cafeGet: url => axiosClient.get(url).then(res => res.data.data),
    cafePost: (url, data) => axiosClient.post(url, data).then(res => res.data),
    messagesGet: url => axiosClient.get(url).then(res => res.data),
}