const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();

    res.send("User Registered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, password: password });
    if (user) {
      const temp = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._id,
      };
      res.send(temp);
    } else {
      return res.status(400).json({ message: "Login Failed" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

// Assuming you have some form of authentication and user identification
// This example uses a simple approach for demonstration purposes

// Add this route to your existing router in the backend code

router.delete("/delete-account/:userId", async (req, res) => {
  try {
    //     const { userId } = req.params;
    //     // Optionally add authentication to verify the user's identity

    //     await User.deleteOne({ _id: userId });
    //     res.json({ message: "Account deleted successfully" });
    //   } catch (error) {
    //     console.log(error);
    //     return res.status(400).json({ message: error.toString() });
    //   }
    // });

    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});




module.exports = router;
