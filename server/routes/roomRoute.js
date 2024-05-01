const express = require("express");
const router = express.Router();

const Room = require("../models/room");

router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getroombyid", async (req, res) => {
  try {
    const roomid = req.body.roomid;
    const room = await Room.findOne({ _id: roomid });
    res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.send(rooms);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/addroom", async (req, res) => {
  try {
    const newRoom = req.body;
    console.log(req.body);
    const room = new Room();
    room.name = newRoom.name;
    room.maxcount = newRoom.maxcount;
    room.roomnumber = newRoom.roomnumber;
    room.rentperday = newRoom.rentperday;
    room.type = newRoom.type;
    room.description = newRoom.description;
    room.currentbookings = newRoom.currentbookings;

    if (newRoom.imageurls && newRoom.imageurls.length > 0) {
      room.imageurls = newRoom.imageurls; // Assign the imageurls array directly
    }
   

    const result = await room.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});


// Get rent per day by room ID
router.get("/getrentperday/:roomId", async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json({ rentperday: room.rentperday });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});




router.get("/rentperday", async (req, res) => {
  try {
    // Fetch all rooms from the database
    const rooms = await Room.find({}, 'rentperday'); // Fetch only the rentperday field

    // Extract rentperday values from the rooms
    const rentPerDayValues = rooms.map(room => room.rentperday);

    // Return the rentperday values as a response
    res.json(rentPerDayValues);
  } catch (error) {
    console.error('Error fetching rentperday values:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//room deletion 
// Add this DELETE route to your Express router

router.delete("/deleteroom/:roomId", async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const result = await Room.deleteOne({ _id: roomId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//room deletion ends







router.get('/search', async (req, res) => {
  const minRent = parseFloat(req.query.minRent); 
  const maxRent = parseFloat(req.query.maxRent); 

  if (isNaN(minRent) || isNaN(maxRent) || minRent >= maxRent) {
    return res.status(400).json({ error: 'Invalid input parameters' });
  }

  try {
    const rooms = await Room.find().sort({ rentperday: 1 });

    let minIndex = 0;
    let maxIndex = rooms.length - 1;
    let minRoom, maxRoom;

    while (minIndex <= maxIndex) {
      const mid = Math.floor((minIndex + maxIndex) / 2);
      if (rooms[mid].rentperday >= minRent) {
        minRoom = rooms[mid];
        maxIndex = mid - 1;
      } else {
        minIndex = mid + 1;
      }
    }

    minIndex = 0;
    maxIndex = rooms.length - 1;
    while (minIndex <= maxIndex) {
      const mid = Math.floor((minIndex + maxIndex) / 2);
      if (rooms[mid].rentperday <= maxRent) {
        maxRoom = rooms[mid];
        minIndex = mid + 1;
      } else {
        maxIndex = mid - 1;
      }
    }

    const matchingRooms = rooms.filter(room => room.rentperday >= minRoom.rentperday && room.rentperday <= maxRoom.rentperday);

    res.json({ rooms: matchingRooms });
  } catch (error) {
    console.error('Error searching for rooms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
