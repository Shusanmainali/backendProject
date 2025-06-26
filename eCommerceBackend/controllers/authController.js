const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;  // <-- Added isAdmin here

  try {
    // Check if user exists
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ msg: "Email already registered" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // Create user with isAdmin (default false if not provided)
    const user = await User.create({ 
      name, 
      email, 
      password: hashed, 
      isAdmin: isAdmin || false 
    });

    // Custom response based on isAdmin
    if (user.isAdmin) {
      res.status(201).json({ msg: "Admin is registered successfully" });
    } else {
      res.status(201).json({ msg: "User registered successfully" });
    }

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "3d"
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
