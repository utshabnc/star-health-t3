import { NextApiRequest, NextApiResponse } from "next";
import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer"
import jwt from 'jsonwebtoken';
import {  z } from 'zod'
import path from "path"

const prisma = new PrismaClient()
const schema = z.object({
    firstName : z.string(),
    lastName : z.string(),
    email : z.string().email({
        message : 'Invalid Email Address'
    }),
    password : z.string().min(8, {
        message: "Password must contain at least: 8 characters length",
    }),
    confirmPassword : z.string(),
}).refine((data)=> data.password === data.confirmPassword,'Passwords must match!')


const handler = async (req:NextApiRequest, res: NextApiResponse) => {

    if(req.method !== "POST") {
        return res.status(405).json({message : "Method is not allowed"})
    }

    const  { firstName, lastName, email , password, confirmPassword } = req.body
    try {


        if(!email || !password || !firstName || !lastName || !confirmPassword) {
            return res.status(400).json({message: "Missing Fields"})
        }

        const check  = schema.safeParse({firstName: firstName,lastName: lastName, email: email, password:password, confirmPassword : confirmPassword})
        if(!check.success){
            const errors = check.error.issues
            return res.status(400).json({errors})
        }

        // check if user email already exists
   
        const userExists = await prisma.user.findUnique({
            where : {
                email : email
            },
        })
        if(userExists) {
            return res.status(400).json({message: "User already exists"})
        }

        // Hash Password 
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        if(!process.env.NEXTAUTH_SECRET) return res.status(400).json({message : "Please contact system adminstrator: SECRET MISSING"})

        const token = jwt.sign({firstName: firstName, lastName : lastName,email : email, hashedPassword: hashedPassword}, process.env.NEXTAUTH_SECRET, {
            expiresIn: "1d"
        })
     
        const tokenExpires = new Date(Date.now() + 24 * 3600 * 1000)


        await  prisma.verificationToken.upsert({
            where: {
                identifier: email,
            },
            update : {
                token : token,
                expires : tokenExpires,
                hashedPassword : hashedPassword
            },
            create : {
                identifier : email,
                token : token,
                expires : tokenExpires,
                hashedPassword : hashedPassword
            }
        })


        // send email

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL,
                pass: process.env.NEXT_PUBLIC_PASS,
            }, 
        })
        const verificationLink = `${process.env.NEXTAUTH_URL}/api/verify/verify-token?token=${token}`;
        const rootFolder = path.resolve(process.cwd())
         // Render the emailTemplateComponent to HTML
     
        const mailOptions = {
            from : process.env.NEXT_PUBLIC_EMAIL,
            to: email,
            subject : 'Email Verfication | StarHealth',
            html : ` <head> <!--[if gte mso 9]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml> <![endif]--> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta name="x-apple-disable-message-reformatting"> <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--> <title></title> <style type="text/css"> @media only screen and (min-width: 620px) { .u-row { width: 600px !important; } .u-row .u-col { vertical-align: top; } .u-row .u-col-100 { width: 600px !important; } } @media (max-width: 620px) { .u-row-container { max-width: 100% !important; padding-left: 0px !important; padding-right: 0px !important; } .u-row .u-col { min-width: 320px !important; max-width: 100% !important; display: block !important; } .u-row { width: 100% !important; } .u-col { width: 100% !important; } .u-col > div { margin: 0 auto; } } body { margin: 0; padding: 0; } table, tr, td { vertical-align: top; border-collapse: collapse; } p { margin: 0; } .ie-container table, .mso-container table { table-layout: fixed; } * { line-height: inherit; } a[x-apple-data-detectors='true'] { color: inherit !important; text-decoration: none !important; } table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_image_4 .v-src-width { width: auto !important; } #u_content_image_4 .v-src-max-width { max-width: 43% !important; } #u_content_heading_1 .v-container-padding-padding { padding: 8px 20px 0px !important; } #u_content_heading_1 .v-font-size { font-size: 21px !important; } #u_content_heading_1 .v-text-align { text-align: center !important; } #u_content_text_2 .v-container-padding-padding { padding: 35px 15px 10px !important; } } </style> <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]--> </head> <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #c2e0f4;color: #000000"> <!--[if IE]><div class="ie-container"><![endif]--> <!--[if mso]><div class="mso-container"><![endif]--> <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #c2e0f4;width:100%" cellpadding="0" cellspacing="0"> <tbody> <tr style="vertical-align: top"> <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #c2e0f4;"><![endif]--> <div class="u-row-container" style="padding: 0px;background-color: #6d28d9"> <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;"> <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #6d28d9;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]--> <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;"> <div style="height: 100%;width: 100% !important;"> <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]--> <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 0px 10px;font-family:arial,helvetica,sans-serif;" align="left"> <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 6px solid #ced4d9;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%"> <tbody> <tr style="vertical-align: top"> <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%"> <span>&#160;</span> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table id="u_content_image_4" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px;font-family:arial,helvetica,sans-serif;" align="left"> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center"> <img align="center" border="0" src="cid:myImg" alt="Logo" title="Logo" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 30%;max-width: 174px;" width="174" class="v-src-width v-src-max-width"/> </td> </tr> </table> </td> </tr> </tbody> </table> <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--> </div> </div> <!--[if (mso)|(IE)]></td><![endif]--> <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]--> </div> </div> </div> <div class="u-row-container" style="padding: 0px;background-color: #6d28d9"> <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;"> <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #6d28d9;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]--> <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;"> <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"> <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]--> <table id="u_content_heading_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:9px 30px 40px 31px;font-family:arial,helvetica,sans-serif;" align="left"> <h1 class="v-text-align v-font-size" style="margin: 0px; color: #023047; line-height: 170%; text-align: center; word-wrap: break-word; font-family: 'Open Sans',sans-serif; font-size: 26px; font-weight: 400;"><strong>Verify Your StarHealth Account - Action Required</strong></h1> </td> </tr> </tbody> </table> <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--> </div> </div> <!--[if (mso)|(IE)]></td><![endif]--> <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]--> </div> </div> </div> <div class="u-row-container" style="padding: 0px;background-color: #6d28d9"> <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;"> <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #6d28d9;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]--> <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;"> <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"> <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]--> <table id="u_content_text_2" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:35px 55px 10px;font-family:arial,helvetica,sans-serif;" align="left"> <div class="v-text-align v-font-size" style="font-size: 14px; color: #000000; line-height: 200%; text-align: left; word-wrap: break-word;"> <p style="font-size: 14px; line-height: 200%;"><span style="font-size: 18px; line-height: 27px; font-family: Lato, sans-serif;"><strong><span style="line-height: 27px; font-size: 18px;">Hi ${firstName}, </span></strong></span></p> <p style="font-size: 14px; line-height: 200%;"> </p> <p style="line-height: 200%;">Welcome to StarHealth, your trusted partner for a healthier future! We're excited to have you join our community of health-conscious individuals. To ensure the security of your account and access to our premium services, we need to verify your email address.</p> <p style="line-height: 200%;"> </p> <p style="line-height: 200%;">Please follow the simple steps below to complete the verification process:</p> <p style="line-height: 200%;"> </p> <p style="line-height: 200%;">1) Click on the<strong> VERIFY </strong>button<br />2) You will then be redirected to a secure page where you can confirm your email address.</p> <p style="line-height: 200%;"> </p> <p style="line-height: 200%;">If you did not create an account with StarHealth or believe this email was sent to you in error, please ignore it. Your account will not be verified unless you take action.</p> <p style="line-height: 200%;"> </p> <p style="line-height: 200%;">Thank you for choosing StarHealth. We look forward to helping you achieve your health and wellness goals. If you have any questions or need assistance with the verification process, please don't hesitate to contact our support team at sales@starhealth.com</p> <p style="line-height: 200%;"> </p> <p style="line-height: 200%;">Stay healthy and stay connected with StarHealth!</p> <p style="line-height: 200%;"> </p> <p style="line-height: 200%;">Warm regards,</p> </div> </td> </tr> </tbody> </table> <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 30px;font-family:arial,helvetica,sans-serif;" align="left"> <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]--> <div class="v-text-align" align="center"> <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${verificationLink}" style="height:58px; v-text-anchor:middle; width:209px;" arcsize="76%" stroke="f" fillcolor="#6d28d9"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]--> <a href="${verificationLink}" target="_blank" class="v-button v-font-size" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #6d28d9; border-radius: 44px;-webkit-border-radius: 44px; -moz-border-radius: 44px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;"> <span style="display:block;padding:20px 70px;line-height:120%;"><strong><span style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 16.8px;">V E R I F Y </span></strong></span> </a> <!--[if mso]></center></v:roundrect><![endif]--> </div> </td> </tr> </tbody> </table> <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--> </div> </div> <!--[if (mso)|(IE)]></td><![endif]--> <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]--> </div> </div> </div> <div class="u-row-container" style="padding: 0px;background-color: #6d28d9"> <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;"> <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #6d28d9;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #6d28d9;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]--> <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;"> <div style="background-color: #6d28d9;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"> <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]--> <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--> </div> </div> <!--[if (mso)|(IE)]></td><![endif]--> <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]--> </div> </div> </div> <div class="u-row-container" style="padding: 0px;background-color: #6d28d9"> <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #010139;"> <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #6d28d9;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #010139;"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]--> <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;"> <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"> <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]--> <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 35px;font-family:arial,helvetica,sans-serif;" align="left"> <div class="v-text-align v-font-size" style="font-size: 14px; color: #ffffff; line-height: 210%; text-align: center; word-wrap: break-word;"> <p style="font-size: 14px; line-height: 210%;">Note: This email is part of the account verification process for StarHealth. Please do not reply to this email.</p> <p style="font-size: 14px; line-height: 210%;"><span style="font-family: Lato, sans-serif; font-size: 14px; line-height: 29.4px;"><strong>©2023 StarHealth</strong> | <a rel="noopener" href="https://www.starhealth.io/privacy-policy" target="_blank">Privacy Policy</a> | <a rel="noopener" href="https://www.starhealth.io/terms-and-conditions" target="_blank">Terms of Service</a></span></p> </div> </td> </tr> </tbody> </table> <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--> </div> </div> <!--[if (mso)|(IE)]></td><![endif]--> <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]--> </div> </div> </div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> </td> </tr> </tbody> </table> <!--[if mso]></div><![endif]--> <!--[if IE]></div><![endif]--> </body> </html>`,
            attachments: [{
                filename: 'StarHealth.png',
                path:  path.join(rootFolder, 'public/images/Logo.png'),
                cid: 'myImg'
            }]
        } 

        await transporter.sendMail(mailOptions)
        .then(() => {
            console.log('Email sent successfully');
            // Handle success, if needed
          })
          .catch(error => {
            console.error('Email sending failed:', error);
            // Handle error, if needed
          });


        return res.status(200).json({message : "Token Created and Sent Sucessfully!"})

    }

    catch(error : any) {
        console.error('Error creating user:', error);

        return res.status(500).json({message : error.message})
    }
}

export default handler