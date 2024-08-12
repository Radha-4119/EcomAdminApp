const nodemailer = require("nodemailer");
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");



app.use(express.json());
app.use(cors());

// Database Connection With MangoDB 
mongoose.connect("mongodb+srv://harish3333reddy:harish3333reddy@cluster0.b5szdmt.mongodb.net/Ecommerce");


// API Creation

app.get("/", (req, res) => {
    res.send("Express App is Running")  
})

// Image Storage Engine 

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})


const upload = multer({storage:storage})

// Creating Upload Endpoint for images.

app.use("/images", express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})


// Schema for Creating Products.

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },   
    name: {
        type: String,
        required: true, 
    }, 
    image: {
        type: String, 
        required: true, 
    }, 
    category: {
        type: String,
        required: true, 
    }, 

    new_price: {
        type: Number,
        required: true, 
    }, 

    old_price : {
        type: Number,
        required: true,  
    }, 

    avaliable: {
        type: Boolean,
        default: true,
    }, 
})

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if(products.length>0){
       let last_product_array = products.slice(-1);
       let last_product = last_product_array[0];
       id = last_product.id + 1;
    }
    else {
       id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price : req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// Creating API for Deleting Products 

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})


// Creating API for Getting All Products...

app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

// Schema Creating for User Model.

const Users = mongoose.model('Users', {
    name: {
        type: String,
    }, 
    email: {
        type: String,
        unique: true,
    }, 
    password: {
        type: String, 
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})


// Creating EndPoint for Registering The User. 

app.post('/signup', async (req, res) => {
     let check = await Users.findOne({email:req.body.email});
     if(check) {
         return res.status(400).json({success:false, errors:"Existing User Found With Same Email Address"})
     }

     // Hash the password using bcrypt 

     const saltRounds = 10;
     const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
     
     // initialize cart data 
     let cart = {};
     for(let i = 0; i < 300; i++) {
         cart[i] = 0;
     }

     // Create a new user with hashed password
     const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        cartData: cart,
     })
     await user.save();

     // create a JSON Web Token (JWT)
     const data = {
        user: {
            id: user.id 
        }
     }

     const token = jwt.sign(data, 'secret_ecom');

     // Nodemailer Code Transporter
     const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ecomzoneproject@gmail.com',
            pass: 'swberpfzljocowqv'
        }
    });


    const imagePath = path.join(__dirname, 'path', 'to', 'your', 'image.png');

    const imagePathFromDownloads = path.join('C:', 'Users', 'hp', 'Downloads', 'Beige Minimalist Casual New Collection Bag Desktop Prototype (4).png');

    const mailOptions = {
        from: 'ecomzoneproject@gmail.com',
        to: user.email,
        subject: 'Welcome to Our Services!',
        html: `
               <h1 style="color: #333; margin-top: 0;">Hello ${user.name}, Welcome to EcomZone</h1>
               <h2 style="color: #555; font-size: 17px;">Thank you for signing up! We're glad to have you on EcomZone.</h2>
               <a href="https://ecomzone.netlify.app/womens">
                  <img src="cid:product" width='100%' height='100%' />
               </a>
               <h3 style="color: #333; font-size: 16px;">Check out our Latest Products: </h3>
               <h3 style="color: #666; font-size: 16px;">Best Regards, <br> EcomZone</h3>
               <a href="https://ecomzone.netlify.app/"><button style="background-color: #f48a1d; color: white; font-size: 16px; border-radius: 4px; margin: 4px 2px; cursor: pointer; padding: 18px; border-width: 0px;"> Click Here to Buy »</button></a> 
               `,
               attachments: [  
                {
                   filename: 'product.png',
                   path: imagePathFromDownloads,
                   cid: "product"
                }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error Sending Email:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
        res.json({success:true, token})
})


// Creating EndPoint for User Login. 
app.post('/login', async (req, res) => {
    let user = await Users.findOne({email:req.body.email});
    if(user){
       const passCompare = req.body.password === user.password;
       if(passCompare){
            const data = {
                user: {
                     id: user.id, 
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success: true, token});
       }
       else {
        res.json({success:false, errors:"Wrong Password!"});
       }
    } 
    else {
        res.json({success: false, errors: "Wrong Email Id!"})
    }
})

// Creating End Point All In Products Data.

app.get('/popularinall', async (req, res) => {
     let products = await Product.find({category: "kid"});
     let popular_in_all = products.slice(1).slice(-12);
     console.log("All the Products Fetched");
     res.send(popular_in_all);
})

// Creating End Point for popular in women section 
app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({category: "women"});
    let popular_in_women = products.slice(0,4);
    console.log("Popular in women Fetched");
    res.send(popular_in_women);
})


// Creating MiddleWare to fetch user 

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send({errors:"Please Authenticate using valid token"})
    } 
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"Please Authenticate using a valid token"})
        }
    }  
}

// Creating EndPoint for Adding Products in CartData
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added", req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Added");
})

// Creating EndPoint to Remove Product from CartData 

app.post('/removefromcart', fetchUser, async (req,res)=> {
    console.log("Removed", req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Removed");
})


// Creating EndPoint to Get cartData 

app.post('/getcart', fetchUser, async (req, res) => {
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id})
    res.json(userData.cartData);
})


app.listen(port, (error) => {
     if(!error){
         console.log("Server Running on Port "+port)
     } 
     else {
        console.log("Error : "+error)
     }
})