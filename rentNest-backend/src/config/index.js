import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
    database_url: process.env.DATABASE_URL,
    port: process.env.PORT || 8000,
    app_url: process.env.APP_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    admin_email: process.env.ADMIN_EMAIL,
    admin_password: process.env.ADMIN_PASSWORD,
    admin_name: process.env.ADMIN_NAME,
    admin_phone: process.env.ADMIN_PHONE,
    admin_address: process.env.ADMIN_ADDRESS,
    ssl_store_id: process.env.SSL_STORE_ID,
    ssl_store_password: process.env.SSL_STORE_PASSWORD,
    ssl_is_live: process.env.SSL_IS_LIVE,
    validation_url: process.env.VARIFICATION_URL,
};
