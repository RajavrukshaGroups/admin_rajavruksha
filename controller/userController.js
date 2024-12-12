const Admin = require('../models/adminModel');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body, 'Incoming data');

        // Validate input fields
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            console.log('Invalid email format');
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        if (!password) {
            console.log('Password is missing');
            return res.status(400).json({ success: false, message: "Password is required" });
        }

        // Check if admin exists
        const admin = await Admin.findOne({ email });

        if (!admin) {
            console.log('Admin not found');
            return res.status(400).json({ success: false, message: "Incorrect email or password" });
        }

        console.log(admin, 'Admin found');

        // Compare plain text passwords
        if (password !== admin.password) {
            console.log('Password mismatch');
            return res.status(400).json({ success: false, message: "Incorrect email or password" });
        }

        console.log('Login successful');
        return res.status(200).json({ success: true, message: "Login Success" });

    } catch (error) {
        console.error("Error during login:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = {
    login
};

    // try {
    //     const { email, password } = req.body;

    //     console.log(req.body, 'Incoming data');

    //     // Check if admin already exists
    //     const AdminEmail = await Admin.findOne({ email });
    //     console.log(AdminEmail, 'Admin already exists');
        
    //     if (!AdminEmail) {
    //         return res.status(400).json({ success: false, message: "Enter Currect email id" });
    //     }else if(password!==AdminEmail.password){
    //         return res.status(400).json({ success: false, message: "Incorrect password" });
    //     }
    //     console.log('login successful');
        
    //     res.status(200).json({success:true,message:"Login Success"})
        
    // } catch (error) {
    //     console.error("Error during login:", error.message);
    //     res.status(500).json({ success: false, message: "Server error" });
    // }
// };

// module.exports={
//     login
// }