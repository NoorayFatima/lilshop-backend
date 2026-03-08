const { exec } = require('child_process');
// Change these to what the client wants
const email = "nf569100@gmail.com"; 
const password = "Noor@123"; 

console.log("Checking/Creating Admin User...");
exec(`npx medusa user -e ${email} -p ${password}`, (error, stdout, stderr) => {
    if (error) {
        // If user exists, it will error; we can ignore that
        console.log("Admin might already exist or error occurred.");
    } else {
        console.log("Admin created successfully!");
    }
});