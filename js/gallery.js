let isAdmin = false;


const adminPassword = "SWAP0601";



// LOAD GALLERY

async function loadGallery(){



const { data, error } = await db

.from("gallery")

.select("*")

.order("created_at",{ascending:false});





if(error){

console.error("Gallery Load Error:",error);

return;

}





const container = document.getElementById("gallery-list");



container.innerHTML="";


galleryImages = data.map(item => item.image_url);


data.forEach(photo=>{



container.innerHTML += `


<div class="photo-card">


<img 
src="${photo.image_url}" 
loading="lazy"
onclick="openViewer('${photo.image_url}')"
>


</div>


`;



});



}








// ADMIN LOGIN


const adminBtn = document.getElementById("admin-btn");



if(adminBtn){


adminBtn.addEventListener("click",()=>{


const password = prompt(
"Enter Admin Password"
);



if(password === adminPassword){


isAdmin=true;


document.getElementById("admin-upload").style.display="flex";


alert("Admin Mode Activated 👑");


}


else{


alert("Wrong Password ❌");


}



});


}









// UPLOAD IMAGE


document

.getElementById("upload-btn")

.addEventListener("click", async function(){



const file = document

.getElementById("image-file")

.files[0];





if(!file){


alert("Select image first");


return;


}





const fileName =

Date.now()+"-"+file.name;








// STORAGE UPLOAD


const { error:uploadError } = await db.storage

.from("gallery")

.upload(fileName,file);





if(uploadError){


console.error(uploadError);


alert(uploadError.message);


return;


}







// GET PUBLIC URL


const { data:urlData } = db.storage

.from("gallery")

.getPublicUrl(fileName);






const imageUrl = urlData.publicUrl;








// SAVE DATABASE


const { error } = await db

.from("gallery")

.insert([

{


image_url:imageUrl


}


]);







if(error){


console.error(error);


alert(error.message);


return;


}







alert("Photo uploaded ✅");



document.getElementById("image-file").value="";



loadGallery();



});







loadGallery();


let galleryImages = [];

let currentIndex = 0;



function openViewer(url){


currentIndex = galleryImages.indexOf(url);


document.getElementById("viewer-image").src = url;


document.getElementById("image-viewer").style.display="flex";


}




function closeViewer(){


document.getElementById("image-viewer").style.display="none";


}




function nextImage(){


currentIndex++;


if(currentIndex >= galleryImages.length){

currentIndex=0;

}


document.getElementById("viewer-image").src =
galleryImages[currentIndex];


}




function prevImage(){


currentIndex--;


if(currentIndex < 0){

currentIndex = galleryImages.length-1;

}


document.getElementById("viewer-image").src =
galleryImages[currentIndex];


}





document
.getElementById("close-viewer")
.addEventListener("click",closeViewer);



document
.getElementById("next-btn")
.addEventListener("click",nextImage);



document
.getElementById("prev-btn")
.addEventListener("click",prevImage);