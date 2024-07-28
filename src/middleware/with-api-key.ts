import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const WithApiKey = (handler: NextApiHandler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const apiKey = req.headers['x-api-key'] as string | undefined;
        const expectedApiKey = process.env.API_SECRET_KEY as string;

        if (!apiKey || apiKey !== expectedApiKey) {
            return res.status(403).json({error: "Forbidden"});
        }

        return handler(req, res);
    };
};
