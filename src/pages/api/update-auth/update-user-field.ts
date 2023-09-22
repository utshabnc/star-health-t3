import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";


const prisma = new PrismaClient()



const handler = async (req: NextApiRequest, res : NextApiResponse) => {
    if(req.method !== 'POST'){
        return res.status(405).json({mesage : "Method not allowed"})
    }

    const { userId , formData } = req.body
    const { hashedPassword } = formData


    try {
        const registerUserInfo = await prisma.userRegisterInfo.create({
            data : {
                ...formData,
               userId : userId
            }
        })
        const updateUser = await prisma.user.update({
            where : {id : userId},
            data : {
                isRegistered : true
            }
        })
        console.log(registerUserInfo)
        console.log(updateUser)
        return res.status(200).json({message : "Success"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ error})
    }
}

export default handler