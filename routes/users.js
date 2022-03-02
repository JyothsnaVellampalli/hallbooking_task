var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

let room=[];//array of room details
let roomIds=[];//array of roomids
let customers=[];//array of customer details and rooms booked
let bookedrooms=[];//array of booked room ids

//1.creating Room
router.post('/createroom',(req, res)=>{
  // console.log(req.body);

  if(roomIds.includes(req.body.RoomId)){
      res.send({statuscode:400,
          mesaage:"RoomId already exists"})
  }

  else{
  room.push(req.body);
  roomIds.push(req.body.RoomId);
  res.send({
      satuscode: 200,
      message: 'Room created succesfully'
  })
}
})

//2.Booking Room
router.post('/bookroom',(req, res)=>{
  if(roomIds.includes(req.body.RoomId)){

      if(bookedrooms.includes(req.body.RoomId)){
          res.send({
              statuscode:400,
              mesaage:"Room not available"})
      }

      else{
  customers.push(req.body);
  bookedrooms.push(req.body.RoomId);
  // console.log(bookedrooms);
  res.send({
      satuscode: 200,
      message: 'Room booked succesfully'
  })
  }  
  } 

  else{
      res.send({
          statuscode:400,
          mesaage:"Invalid RoomId"
      })
  }
})

//3.list of rooms created
router.get('/allrooms',(req, res)=>{
  let roomsstatus=[];
  room.map((b)=>{
      if(bookedrooms.includes(b.RoomId)){
          b.status="Booked";
          roomsstatus.push(b)
      }
      else {
          b.status="Available";
          roomsstatus.push(b)
      }
  })
  res.json({
        statuscode: 200,
        message:"rooms data",
        data: roomsstatus
    })

  })

//4.list of customers
router.get('/allcustomers',(req, res)=>{
      res.json({
          statuscode: 200,
          data:customers
      })
  })

//3.booked rooms
router.get('/bookedrooms',(req, res)=>{

  res.json({
      statuscode: 200,
      message:"bookedrooms data",
      "List of Room Ids":bookedrooms,
      data:customers
  })
})

module.exports = router;
