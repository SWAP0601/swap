const stars = document.querySelectorAll(".stars-input span");

const ratingInput = document.getElementById("review-rating");



stars.forEach(star => {


star.addEventListener("click", function(){


const value = this.dataset.value;



ratingInput.value = value;



stars.forEach(s => {


if(s.dataset.value <= value){

s.classList.add("active");

}
else{

s.classList.remove("active");

}


});



});


});









async function loadReviews() {


const { data, error } = await db
.from("reviews")
.select("*")
.order("created_at", { ascending: false });




if(error){

console.error("❌ Reviews Error:", error);

return;

}





const container = document.getElementById("reviews-list");



if(!container){

console.error("❌ reviews-list missing");

return;

}





container.innerHTML = "";





data.forEach(review => {



container.innerHTML += `


<div class="review-card">



<div class="review-header">



<h3>
${review.name}
</h3>



<span>
${new Date(review.created_at).toLocaleDateString()}
</span>



</div>




<div class="stars">

${"⭐".repeat(review.rating)}

</div>




<p>

${review.review}

</p>



</div>



`;



});



}









async function submitReview(){



const name = document

.getElementById("review-name")

.value

.trim();





const rating = document

.getElementById("review-rating")

.value;





const review = document

.getElementById("review-message")

.value

.trim();






if(!name || !review || !rating){


alert("Please fill all details");


return;


}







let token = localStorage.getItem("review_token");



if(!token){


token = crypto.randomUUID();


localStorage.setItem("review_token", token);


}









const { error } = await db

.from("reviews")

.insert([

{


name:name,


review:review,


rating:Number(rating),


review_token:token



}


]);










if(error){


console.error("❌ Submit Error:", error);


alert(error.message);


return;


}






alert("Review submitted successfully ✅");






document.getElementById("review-name").value="";


document.getElementById("review-message").value="";



ratingInput.value="";



stars.forEach(star => {


star.classList.remove("active");


});







loadReviews();





}









document

.getElementById("submit-review")

.addEventListener("click", submitReview);








loadReviews();