const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/data", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const mongodb = mongoose.connection;
mongodb.on("error", console.error.bind(console, "connection error"));
mongodb.once("open", (callback) => {});

let userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: Number,
    question1: String,
    question2: String,
    question3: String,
    loginTime: String
});

let User = mongoose.model("User_Collection", userSchema);
let currentUser = null; // We'll use this to keep track of whos logged in

// Call this function in the routing add a new user
// Returns a message to indicate success
function addUserByRequest(req) {
    let name = req.body.username;
    let pass = req.body.password;
    
    User.exists({ username: name }, (err, result) => {
        if (err) return console.error(err);
        if(result) {
            let user = new User({
                username: name,
                password: pass,
                email: req.body.email,
                age: req.body.age,
                question1: req.body.question1,
                question2: req.body.question2,
                question3: req.body.question3,
                loginTime: new Date().toLocaleTimeString()
            });
        
            user.save((err, user) => {
                if (err) return console.error(err);
                return "User created";
            });
        } else {
            return "Username already exists";
        }
    });

}

// Same as above but takes in a user object rather than a request object
function addUserByObject(user) {
    let name = user.username;
    let pass = user.password;
    
    User.exists({ username: name }, (err, result) => {
        if (err) return console.error(err);
        if(result) {
        
            user.save((err, user) => {
                if (err) return console.error(err);
                return "User created";
            });
        } else {
            return "Username already exists";
        }
    });
}

// Returns a user if username and password match
function getUser(name, pass) {
    User.find({ username: name, password: pass}, (err, user) => {
        if (err) return console.error(err);

        user.loginTime = new Date().toLocaleTimeString();
        user.save((err, user) => {
            if (err) return console.error(err);
        });

        return user;
    });
}

// Updates user info from form
function updateUser(req) {
    let name = req.body.username;
    let pass = req.body.password;
    
    User.find({ username: name, password: pass}, (err, user) => {
        if (err) return console.error(err);

        user.username = name,
        user.password = pass,
        user.email = req.body.email,
        user.age = req.body.age,
        user.question1 = req.body.question1,
        user.question2 = req.body.question2,
        user.question3 = req.body.question3
    
        user.save((err, user) => {
            if (err) return console.error(err);
            return "User information updated";
        });
    });

}

exports.index = (req, res) => {
    res.render("index", {
        title: "Home"
    })
}

exports.login = (req, res) => {
    res.render("login", {
        title: "Login"
    })
}

exports.checkUserLogin = (req, res) => {

    currentUser = getUser(req.username, req.password);

    // res.setHeader('Location', '/');
    res.render("profile", {
        title: currentUser.username,
        user: currentUser
    });

}

exports.signup = (req, res) => {
    res.render("signup", {
        title: "Sign Up"
    })
}

exports.registerUser = (req, res) => {
    let msg = addUserByRequest(req);
    res.render("index", {
        title: "Home",
        message: msg
    });
}