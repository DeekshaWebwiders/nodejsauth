module.exports = (req, res, next) => {
  const { name, email, password, mobile, gender } = req.body;

  if (!name || !email || !password || !mobile || !gender) {
    return res.status(422).json({ message: "All fields are required." });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(422).json({ message: "Invalid email format." });
  }

  if (password.length < 6) {
    return res.status(422).json({ message: "Password must be at least 6 characters." });
  }

  if (!/^\d{10}$/.test(mobile)) {
    return res.status(422).json({ message: "Mobile number must be 10 digits." });
  }

  if (!req.file) {
    return res.status(422).json({ message: "Profile picture is required." });
  }

  next();
};
