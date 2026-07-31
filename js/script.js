const stars = document.querySelectorAll(".stars-input span");

const ratingInput = document.getElementById("review-rating");



// STAR HOVER + CLICK SYSTEM

stars.forEach(star => {


star.addEventListener("mouseover", function(){


const value = this.dataset.value;


stars.forEach(s => {


if(s.dataset.value <= value){

s.classList.add("hover");

}
else{

s.classList.remove("hover");

}


});


});





star.addEventListener("mouseout", function(){


stars.forEach(s => {


s.classList.remove("hover");


});


});







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












// LOAD REVIEWS

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






const myToken = localStorage.getItem("review_token");







data.forEach(review => {



let deleteButton = "";



if(review.review_token === myToken){


deleteButton = `

<button class="delete-review"
onclick="deleteReview('${review.id}')">

<i class="fa-solid fa-trash"></i>

</button>

`;

}


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





${deleteButton}





</div>



`;



});



}












// DELETE REVIEW

async function deleteReview(id){



const confirmDelete = confirm(
"Delete this review?"
);



if(!confirmDelete){

return;

}





const { error } = await db

.from("reviews")

.delete()

.eq("id", id);






if(error){


console.error("❌ Delete Error:", error);


alert(error.message);


return;


}






alert("Review deleted ✅");



loadReviews();



}











// SUBMIT REVIEW

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