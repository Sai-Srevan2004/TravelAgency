const User = require("../models/User")
const Booking=require('../models/Booking')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


//sign up
const signUp = async (req, res) => {
    try {
        // Fetch data from req.body
        const { username, email, password, cpassword } = req.body;
       
        console.log(req.body);
        
        // Validate data
        if (!username || !email || !password || !cpassword) {
            return res.json({
                success: false,
                message: "All fields are required!"
            });
        }

        // Check if passwords match
        if (password !== cpassword) {
            return res.json({
                success: false,
                message: "Password and confirm password do not match!"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Return response
        return res.json({
            success: true,
            message: "User registration successful!",
            data: user
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "User registration failed! Please try again later."
        });
    }
};


//login

const login = async (req, res) => {
     try {
        //get data from req.body
        const {email,password}=req.body


        console.log(req.body)

        //validate
        if(!email || !password)
        {
            return res.json({
                success:false,
                message:"User not exists!"
            })
        }

        //check if user not actually exists but trying to login
        const isExist=await User.findOne({email})

        if(!isExist)
        {
            return res.json({
                success:false,
                message:"User do not exist!"
            })
        }

        //password check
        if(!await bcrypt.compare(password,isExist.password))
            {
                return res.json({
                    success:false,
                    message:"Password do not match!"
                })
            }


        const payLoad={
            email:isExist.email,
            id:isExist._id,
            role:isExist.role
        }

        const token=jwt.sign(payLoad,process.env.JWT_SECRET)
    
        //undeifing password
        isExist.password=undefined

        //if all correct generate jwt token
        return res.json({
            success:true,
            message:"User Logged In successfully!",
            data:isExist,
            token:token
        })


     } catch (error) {
        console.log(error.message)

        return res.json({
            success:false,
            message:"Login failed! please try Again later!"
        })
     }
}

module.exports = {signUp, login}