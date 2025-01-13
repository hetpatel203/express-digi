// require('dotenv').config();     // to use .env file
import 'dotenv/config'; // to use .env file
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

let teaData = []
let nextId = 1;

//add a new tea
app.post('/teas', (req,res)=>{
        const {name, price} = req.body;
        const newTea = {
            id: nextId++,
            name,
            price
        }
        teaData.push(newTea);
        res.status(201).send(newTea);
})

//get all teas
app.get('/teas', (req,res)=>{
    res.status(201).send(teaData);
})

//get a tea by id //AI written code
// app.get('/teas/:id', (req,res)=>{
//     const {id} = req.params;
//     const tea = teaData.find((tea)=>tea.id == id);
//     if(tea){
//         res.status(200).send(tea);
//     }else{
//         res.status(404).send('Tea not found');
//     }
// })

//get a tea by id //my written code
app.get('/teas/:id', (req,res)=>{
    // const tea = req.params;
    const tea = teaData.find((t)=>t.id === parseInt(req.params.id));
    if(tea){
        res.status(200).send(tea);
    }else{
        res.status(404).send('Tea not found');
    }
})

//update a tea by id //AI written code
// app.put('/teas/:id', (req,res)=>{
//     const {id} = req.params;
//     const {name, price} = req.body;
//     const tea = teaData.find((tea)=>tea.id == id);
//     if(tea){
//         tea.name = name;
//         tea.price = price;
//         res.status(200).send(tea);
//     }else{
//         res.status(404).send('Tea not found');
//     }
// })

//update a tea by id //my written code
app.put('/teas/:id', (req,res)=>{
    const tea = teaData.find((t)=>t.id === parseInt(req.params.id));
    if(!tea){
        res.status(404).send('Tea not found');
        // return;
    }
    const {name, price} = req.body;
    tea.name = name;
    tea.price = price; 
    res.status(200).send(tea);
})

//delete a tea by id //AI written code
// app.delete('/teas/:id', (req,res)=>{
//     const {id} = req.params;
//     const tea = teaData.find((tea)=>tea.id == id);
//     if(tea){
//         teaData = teaData.filter((tea)=>tea.id != id);
//         res.status(200).send(tea);
//     }else{
//         res.status(404).send('Tea not found');
//     }
// })
app.delete('/teas/:id', (req, res) =>{
    const index = teaData.findIndex((t)=>t.id === parseInt(req.params.id));
    if(index === -1){
        return res.status(404).send('Tea not found');
    }
    teaData.splice(index, 1); // remove the tea from the array // 1 index is removed
    return res.status(204).send('tea id {req.params.id} deleted'); 
})

app.get('/', (req,res)=>{
    res.send('Hello from me,HET..!');
})

app.get('/masala-tea', (req,res)=>{
    res.send('Hello, one masala tea from me..!');
})

app.get('/instagram', (req,res)=>{
    res.send('Hello, this is my instagram page..!');
})

app.listen(port, ()=>{
    console.log(`the server is running on port: , ${port}....`);
})