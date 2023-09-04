import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";


const prisma = new PrismaClient()



const handler = async (req: NextApiRequest, res : NextApiResponse) => {
    if(req.method !== 'POST'){
        return res.status(405).json({mesage : "Method not allowed"})
    }
    return res.status(200).json({message : "Success"})

    /*const { userId , formData } = req.body
    const { hashedPassword } = formData



    // Hash Password

    const salt = await bcryptjs.genSalt(10)
    const hashedPass = await bcryptjs.hash(hashedPassword,salt)

    try {
        const updateUser = await prisma.user.update({
            where: {id : userId},
            data : {
                ...formData,
                hashedPassword : hashedPass,
                isRegistered : true
            }
        })
        console.log(updateUser)
        return res.status(200).json({message : "Success", updateUser})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ error})
    }*/
}

export default handler