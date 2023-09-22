import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient()

interface JwtPayload {
    firstName: string,
    lastName:  string,
    email: string
    hashedPassword : string
  }
  

const handler = async (req: NextApiRequest, res : NextApiResponse) => {
    if(req.method !== 'GET') {
        return res.status(405).json({message : "Method not allowed"})
    }
    const { token } = req.query
  

    try {

        if(!token) return res.status(400).json({message: "Token is required!"})

        const verficationToken = await prisma.verificationToken.findUnique({
            where : {
                token : token as string
            }
        })

        if(!verficationToken){
            return res.status(404).json({message: "Token not found!"})
        }

        if(verficationToken.expires < new Date())
        {
            return res.status(400).json({message : "Token expired"})
        }

        const decoded = jwt.verify(token as string, process.env.NEXTAUTH_SECRET as string) as JwtPayload

        const email = decoded.email
        const hashedPassword = decoded.hashedPassword
        const firstName = decoded.firstName
        const lastName = decoded.lastName

        const fullName = firstName + ' ' + lastName


        const createUser = await prisma.user.create({
            data : {
                name : fullName,
                email : email,
                hashedPassword : hashedPassword,
                emailVerified : new Date(),
            }
        })
        //add a user session then rediret the  user
        return res.redirect(307, '/directory?login=true')

    }
    catch(error) {
        console.log("There was an error trying to verify user ", error)
        return res.status(500).json({message : "Internal Server Error"})
    }
}

export default handler

