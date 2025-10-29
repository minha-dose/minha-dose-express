import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authotization;
    if(!authHeader) return res.status(401).json({error: "Token não fornecido"});
    const [, token] = authHeader.split("");

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch{
        return res.status(401).json({error: "Token inválido ou expirado"})
    }
};