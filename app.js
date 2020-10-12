require('dotenv').config();

var express       	= require("express");
	app          	= express();
	bodyParser    	= require("body-parser"); 
	mongoose      	= require("mongoose");
	flash 			= require("connect-flash");
	passport 	  	= require("passport");
	LocalStrategy 	= require("passport-local");
	methodOverride  = require("method-override"); 
	Campground    	= require("./models/campground");
	Comment		 	= require("./models/comment"); 
	User    	  	= require("./models/user");
	seedDB        	= require("./seeds"); 

//requiring routes
var commentRoutes 		= require("./routes/comments"); 
	campgroundRoutes 	= require("./routes/campgrounds"); 
	authRoutes 	        = require("./routes/index"); 	

// var url = process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp_v12Deployed_Stripe"

// mongoose.connect(url, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true
// });

mongoose.connect("mongodb://localhost:27017/yelp_camp_v12Deployed_Stripe", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// mongoose.connect("mongodb+srv://Renata:Renatarenata@cluster0.rh4lq.mongodb.net/YelpCamp?retryWrites=true&w=majority", {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true
// }); 

mongoose.set('useFindAndModify', false);

app.use(express.json()); 
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash()); 

//seedDB(); //seed the database

//PASSPORT CONFIGURATION 
app.use(require("express-session")({
	secret: "Emma is really the best!",
	resave: false,
	saveUninitialized: false
})); 
app.use(passport.initialize()); 
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/", authRoutes);

var port = process.env.PORT || 3000; 
app.listen(port, function () {
console.log("Server Has Started!");
});

