


let userName = document.getElementById("name");

let foodTruck  = document.getElementById("ft-select");

let rating = document.getElementById("rating");

let userReview = document.getElementById("review");

let sendButton = document.getElementById("get-button");

sendButton.addEventListener("click", function() {


	let review  = {
		name: userName.value,
		foodTruck: foodTruck.value,
		rating: rating.value, 
        review: userReview.value 
	}
 
	console.log("the review is",JSON.stringify(review));

	fetch('/add', {
		method: "POST",
		headers: {
			"Content-Type": "application/JSON",
		},
		body: JSON.stringify(review),
	}).then(function (response) {
		document.getElementById("message").innerHTML = "Success";

		if(response.status!=200){
			throw new Error('Something went wrong');
		}

		console.log("Response status after stringify",response.status);
	}).catch(function (error) {
		document.getElementById("message").innerHTML = "Bad Request";
		console.log(error);
	});

}); 