import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user";

interface CustomRequest extends Request {
    user?: any;
}

const validateJwt = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {

    const authorizationHeader = req.get("Authorization");

    // 1. مفيش Authorization Header
    if (!authorizationHeader) {
        res.status(401).send({
            success: false,
            error: "AUTHORIZATION_HEADER_MISSING",
            message: "Authorization header is missing"
        });
        return;
    }

    // 2. تقسيم Authorization
    const [scheme, token] = authorizationHeader.split(" ");

    // 3. الـ Bearer مش موجود أو مكتوب غلط
    if (scheme !== "Bearer") {
        res.status(401).send({
            success: false,
            error: "INVALID_AUTHORIZATION_FORMAT",
            message: "Authorization must be: Bearer <token>",
            received: authorizationHeader,
        });
        return;
    }

    // 4. مفيش Token
    if (!token) {
        res.status(401).send({
            success: false,
            error: "TOKEN_MISSING",
            message: "JWT token is missing"
        });
        return;
    }

    // 5. التحقق من JWT
    jwt.verify(
        token,
        "RPqBQ4yE/Y4E+NZsYFSXL6m6ommdp6YyXn9tPiUCRtY=",
        async (err, payload) => {

            // 6. الـ Token غير صحيح
            if (err) {
                res.status(401).send({
                    success: false,
                    error: "INVALID_TOKEN",
                    message: err.message
                });
                return;
            }

            if (!payload) {
                res.status(401).send({
                    success: false,
                    error: "EMPTY_TOKEN_PAYLOAD",
                    message: "JWT payload is empty",
                 

                });
                return;
            }

            try {

                const userPayload = payload as {
                    email: string;
                    firstName: string;
                    lastName: string;
                    id: string;
                };

                // 7. البحث عن المستخدم
                const user = await UserModel.findOne({
                    email: userPayload.email
                });

                // 8. المستخدم مش موجود
                if (!user) {
                    res.status(401).send({
                        success: false,
                        error: "USER_NOT_FOUND",
                        message: "User associated with this token was not found",
                        user: userPayload,
                    });
                    return;
                }

                // 9. كل شيء تمام
                req.user = user;

                next();

            } catch (error) {

                // 10. مشكلة في Database
                res.status(500).send({
                    success: false,
                    error: "DATABASE_ERROR",
                    message: "Error while finding user"
                });

            }
        }
    );
};

export default validateJwt;