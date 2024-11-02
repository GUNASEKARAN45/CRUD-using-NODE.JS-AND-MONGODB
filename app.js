const express=require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const path=require('path')

const app=express();

app.use(bodyparser.urlencoded({
    extended:true
}));

app.use(express.static(path.join(__dirname,'public')));


const userschema=new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        unique: true  
      },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contactno: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    }
   });

const user=mongoose.model('users',userschema);

app.post('/form_filled',async (req,res)=>{
    try{
        const newUser = new user({
         email:req.body.email,
         password:req.body.password,
         name:req.body.name,
         contactno:req.body.contactno,
         dob:req.body.dob,
         gender:req.body.gender,
         language:req.body.language,
         place:req.body.place
    });

    await newUser.save();
        res.send('<h1>Thank you your data has been recorded!<h1>');
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Error saving data');
    
    }
});




app.get('/',(req,res)=>{
        res.sendFile(path.join(__dirname,'views','home.html'));
})

mongoose.connect('mongodb+srv://gunasekaran:gunasekaran23@crudoperation.rbavy.mongodb.net/?retryWrites=true&w=majority&appName=CRUDoperation/users').then(()=>{
    console.log('database is connected');
}).catch((err)=>{
    console.log('database is not connected',err)
})












const port=process.env.PORT || 8000;


app.listen(port,()=>{
    console.log('running on port 8000')
})
