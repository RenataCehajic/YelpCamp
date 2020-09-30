var mongoose 	= require("mongoose");
var Campground  = require("./models/campground"); 
var Comment = require("./models/comment");

var data = [
	{
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Camping is an outdoor activity involving overnight stays away from home in a shelter, such as a tent or a recreational vehicle. Typically participants leave developed areas to spend time outdoors in more natural ones in pursuit of activities providing them enjoyment. The night (or more) spent outdoors distinguishes camping from day-tripping, picnicking, and other similarly short-term recreational activities. Camping as a recreational activity became popular among elites in the early 20th century. With time, it grew in popularity among other socioeconomic classes. Modern campers frequent publicly owned natural resources such as national and state parks, wilderness areas, and commercial campgrounds. Camping is a key part of many youth organizations around the world, such as Scouting, which use it to teach both self-reliance and teamwork."
    },
	{
	    name: "Desert Mesa", 
	    image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Camping is an outdoor activity involving overnight stays away from home in a shelter, such as a tent or a recreational vehicle. Typically participants leave developed areas to spend time outdoors in more natural ones in pursuit of activities providing them enjoyment. The night (or more) spent outdoors distinguishes camping from day-tripping, picnicking, and other similarly short-term recreational activities. Camping as a recreational activity became popular among elites in the early 20th century. With time, it grew in popularity among other socioeconomic classes. Modern campers frequent publicly owned natural resources such as national and state parks, wilderness areas, and commercial campgrounds. Camping is a key part of many youth organizations around the world, such as Scouting, which use it to teach both self-reliance and teamwork."
	},
	{
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Camping is an outdoor activity involving overnight stays away from home in a shelter, such as a tent or a recreational vehicle. Typically participants leave developed areas to spend time outdoors in more natural ones in pursuit of activities providing them enjoyment. The night (or more) spent outdoors distinguishes camping from day-tripping, picnicking, and other similarly short-term recreational activities. Camping as a recreational activity became popular among elites in the early 20th century. With time, it grew in popularity among other socioeconomic classes. Modern campers frequent publicly owned natural resources such as national and state parks, wilderness areas, and commercial campgrounds. Camping is a key part of many youth organizations around the world, such as Scouting, which use it to teach both self-reliance and teamwork."
    }
]


function seedDB(){
	//Remove all campgrounds
	Campground.deleteMany({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed campgrounds!");
		//add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err); 
				} else {
					console.log("added a campground"); 
					//create a comment
		Comment.create(
		{
		text: "This place is great, but I wish there was internet",
		author: "Homer"
		}, function(err, comment){
		if(err){
		console.log(err);
		} else {
		campground.comments.push(comment);
		campground.save();
		console.log("Created new comment");
							 }
						});
					}
				});
		
		});
	});
	
	//add a few comments 
}

module.exports = seedDB;

