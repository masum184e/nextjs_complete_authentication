import jwt from "jsonwebtoken";

export const getUserIdFromToken = (request) => {
    try {
        const authorizationToken = request.cookies.get(process.env.COOKIE_KEY)?.value || '';
        if (!authorizationToken) {
            return null;
        }

        const decodedToken = jwt.verify(authorizationToken, process.env.JWT_SECRET_KEY);
        if (!decodedToken.userId) {
            return null;
        }

        return decodedToken.userId;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};
