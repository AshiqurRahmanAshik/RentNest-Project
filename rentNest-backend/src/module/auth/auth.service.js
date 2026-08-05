import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma';
import config from '../../config';
import { jwtUtils } from '../../utils/jwt';
const loginUser = async (payload) => {
    const { email, password } = payload;
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email,
        },
    });
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new Error('Password Not Matched');
    }
    if (user.status === 'BLOCKED') {
        throw new Error('Your account has been blocked. Please contact support.');
    }
    const jwtPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in);
    const refreshToken = jwtUtils.createToken(jwtPayload, config.jwt_refresh_secret, config.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
};
export const authService = {
    loginUser,
};
