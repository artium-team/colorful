const firebaseConfig = {
    apiKey: "AIzaSyCY7jOiZrPTKR62X0d5apUpLKyBRg66KxE",
    authDomain: "r-color.firebaseapp.com",
    projectId: "r-color",
    storageBucket: "r-color.appspot.com",
    messagingSenderId: "1054869912373",
    appId: "1:1054869912373:web:2c599764b8923bc702ea7c",
    measurementId: "G-QW327CGHW1",
    databaseURL: "https://r-color-default-rtdb.asia-southeast1.firebasedatabase.app",
}

firebase.initializeApp(firebaseConfig)

var pointsData = firebase.database().ref()
var points = []

var col = 0

function setup() {

    // pointsData.remove()

    createCanvas(400, 400)
    background(255)
    fill(col)
    noStroke()

    pointsData.on('child_added', function (point) {
        points.push(point.val())
    })

    mousePressed = drawPoint
    mouseDragged = drawPoint

    $("canvas").detach().prependTo("#main");
}

function draw() {
    background(255)

    for (var i = 0; i < points.length; i++) {
        var point = points[i]
        fill(point.color)
        circle(point.x, point.y, point.size)
    }
}

async function drawPoint() {
    await pointsData.push({ x: mouseX, y: mouseY, color: col, size: Math.floor(Math.random() * 15) + 5 })
}