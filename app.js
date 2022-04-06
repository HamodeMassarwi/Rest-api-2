const express = require ('express');
const joi = require ('joi');
const app = express() ;
app.use(express.json());
/// Buyers
let buyers = [
    {name:'Yaso' , invest: '$20,000' , id: 1},
    {name:'Lana' , invest: '$300,000' , id: 2},
    {name:'Sarah' , invest: '$1,000' , id: 3},
    {name:'Bully' , invest: '$532,000' , id: 4},
    {name:'Eva' , invest: '$3,200'  , id: 5},
    {name:'John' , invest: '$1,250,000' , id: 6},
]

//Get Routes
app.get('/' , (req,res) =>{
    res.send("Welcome to hamode Rest Api!");
});
app.get('/api/buyers' , (req,res) =>{
    res.send(buyers);
});
app.get('/api/buyers/:id' , (req,res) =>{
    const buyer = buyers.find(b => b.id === parseInt(req.params.id));
    if(!buyer) res.status(404).send('<h1 style=" color:darked;">Not Found!</h1>');
    res.send(buyer);
});
//Post Routes 
app.post('/api/buyers' , (req,res) =>{
   
    const buyer = req.body;
    if(buyer.name.length < 3){
        res.send("Name has to be more than 2 words");
        return;
    } 
    if(buyer.invest.length < 4){
        res.send("invest has to be more than 3 words");
        return;
    }
    let x = buyers.length+1;
    for (let i = 0; i < buyers.length ; i++) {
         if(buyers[i].id == x)x++;
      }
    buyers.push({ ...buyer , id: x });
    res.send(`The User With the name ${buyer.name} is Added to the DB`); 
});
//Patch (Update)
app.patch('/api/buyers/:id' , (req,res) => {
    const { id } = req.params;
    const { name , invest  } = req.body;
    const buyer = buyers.find((buyer) => buyer.id == id );
    if(name) buyer.name = name;
    if(invest) buyer.invest = invest;
    res.send(`buyer with the id ${id} has been updated`);
});
//delete 
app.delete('/api/buyers/:id' , (req,res) =>{
    const { id } = req.params;
    buyers = buyers.filter((buyer) => buyer.id != id );
    res.send(`buyer ${id} is deleted`);
});
//Start Listening
const port = 2022;
app.listen(port ,() => console.log(`Go To localhost:${port} ...`) );