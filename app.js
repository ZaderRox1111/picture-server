// Get modules
const path = require('path');
const express = require('express');
const fs = require('fs');

// Make new express application
const app = express();

// Constants
const imgArr = [];
const portNum = 8080;
const numImgs = 5;

// Read through img directory and push file paths to array
fs.readdir('img_directory', (err, files) => {
    // Try to go through list and push file paths
    // Catch any errors and log them
    try {
        files.forEach(function (file) {
            // Push absolute path of file to imgArr
            imgArr.push(path.resolve('img_directory', file.toString()));
        })

        // Close directory
        return;
    } catch (err) {
        // Log the error and close directory
        return console.error(err);
    }
})

// Get random image's file path from array
const getRandImg = function () {
    // Multiply random number between 0-1 to the number of images
    // Floor the outcome to get random integer
    let randomIndex = Math.floor(Math.random() * numImgs);

    // Return the file path
    return imgArr[randomIndex];
}

// Serve the image to the user
// The '/' denotes the home path to be used: http://localhost:8080/ <-
app.get('/', function (req, res) {
    // Read in a random image file
    fs.readFile(getRandImg(), function (err, data) {
        // Change content type to accept jpg images
        res.writeHead(200, {
            'Content-Type': 'image/jpeg'
        });

        // Display the data (image)
        res.end(data);
    })
})

// Tells the app what port to listen to
app.listen(portNum, function () {
    console.log('listening to port ' + portNum);
})