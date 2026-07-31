async function loadReviews() {

  const { data, error } = await db
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });


  if (error) {

    console.error("❌ Reviews Error:", error);

    return;

  }


  console.log("✅ Reviews Loaded");

  console.log(data);



  const container = document.getElementById("reviews-list");


  if(!container){

    console.error("❌ reviews-list missing");

    return;

  }



  container.innerHTML = "";



  data.forEach(review => {


    container.innerHTML += `

    <div class="review-card">

      <h3>${review.name}</h3>

      <div class="stars">

        ${"⭐".repeat(review.rating)}

      </div>


      <p>${review.message}</p>


    </div>


    `;


  });



}



loadReviews();