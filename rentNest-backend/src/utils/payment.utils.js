import axios from 'axios';
import config from '../config';
const store_id = config.ssl_store_id;
const store_password = config.ssl_store_password;
const is_live = false;
export const initiatePayment = async (paymentData) => {
    const url = is_live
        ? 'https://securepay.sslcommerz.com/gwprocess/v4/api.php'
        : 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php';
    const response = await axios.post(url, {
        store_id,
        store_passwd: store_password,
        ...paymentData,
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    return response.data;
};
export const validatePayment = async (val_id) => {
    const url = is_live
        ? 'https://securepay.sslcommerz.com/validator/api/validationserverAPI.php'
        : 'https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php';
    const response = await axios.get(url, {
        params: {
            val_id,
            store_id,
            store_passwd: store_password,
            format: 'json',
        },
    });
    return response.data;
};
