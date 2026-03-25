const AddNewPostBtn = document.getElementById("AddNewPostBtn");
const formContainer = document.getElementById("formContainer");
const postForm = document.getElementById("postForm");
const postIdInput = document.getElementById("postId");
const formTitleInput = document.getElementById("postTitle");
const formBodyInput = document.getElementById("postBody");
const cancelBtn = document.getElementById("cancelBtn");
const formTitle = document.getElementById("formTitle");
const postTableBody = document.querySelector("#postTable tbody");

// step 2 : set the baseURL
let baseURL = "http://localhost:3000/posts";

// step 3 : add new post button clicked --> show form , cancel button clicked --> hide form  + 4 useful steps.
let isEditing = false;
const showForm = ()=>{
    formContainer.classList.remove("hidden");
}
const hideForm = ()=>{
    formContainer.classList.add("hidden");
    postForm.reset();
    isEditing = false;
    postIdInput.value = '';
    formTitle.textContent = "Add Post";
}


AddNewPostBtn.addEventListener('click' , ()=>{
    showForm();
})
cancelBtn.addEventListener('click' , hideForm);

// step 4 : prepare function to recieve posts to display them at table , doing 2 steps : clean tbody , create tr with each post to disply post data.
const renderPosts = (posts)=>{
   postTableBody.innerHTML = '';
   posts.forEach(post => {
    const tr = document.createElement('tr');
   tr.innerHTML = `
    <td>${post.id}</td>
    <td>${post.post_title}</td>
    <td>${post.post_body}</td>
    <button onclick="editPost(${post.id})"  class="btn btn-outline-warning m-3" data-bs-toggle="modal" data-bs-target="#formContainer">Edit</button>
    <button onclick="deletePost(${post.id})" class="btn btn-outline-danger m-3">Delete</button>
   ` 
    postTableBody.appendChild(tr);
   });
  
}
// step 5 : Frist CRUD Operation "read" : get all existing posts [fetch posts function{sending "GET" request by using "fetch"}]
async function fetchPosts(){
   try{
    const resonse = await fetch(baseURL);
    const posts = await resonse.json();

    renderPosts(posts);
   }catch(error){
    console.error("Error in Fetching Posts : " , error);
   }
}

// step 6 : "EditPost" function that sends request to get single post , put post data into form inputs , change "isEditing" to true , and "form title to [Edit Post] , then finally 'showForm'.
async function editPost(id) {
   try{
    const response =  await fetch(`${baseURL}/${id}`);
   const post =await response.json();

   postIdInput.value = post.id;
   formTitleInput.value = post.post_title;
   formBodyInput.value = post.post_body;

   isEditing = true;
   formTitle.textContent = "Edit Post";
   showForm();
   }catch(error){
    console.error("Error in Fetching Posts : " , error);
   } 
}
//step 7 : "deletePost" function sends request with 'DELETE' method , then fetches reminder posts after delete.
async function deletePost(id) {
    try{
        await fetch(`${baseURL}/${id}` , {method : 'DELETE'});
        showAlert("Deleted Successfully" , "danger")
        // alert("Deleted Successfully");
        fetchPosts();
    }catch(error){
    console.error("Error in Fetching Posts : " , error);
   } 
}
// step 8 : "addNewPost" function that sends request with 'POST' method to send new post data.
async function addNewPost(title , body){
   try{
    
    await fetch(baseURL , {
    method : 'POST' , 
    headers: {
    "Content-Type": "application/json"
    },
    body : JSON.stringify({
        post_title : title , 
        post_body : body
    })
   })
      showAlert("Added Successfully" , "success");
//    alert("Added Successfully");
   }catch(error){
    console.error("Error in Fetching Posts : " , error);
   } 
}
// step 9 : "updatePost" function , that sends request with 'POST' method with updated post , knowing the specific post by its 'id'.
async function updatePost(id , title , body){
   try{
    await fetch(`${baseURL}/${id}` , {
    method : 'PUT' , 
    headers: {
    "Content-Type": "application/json"
    },
    body : JSON.stringify({
        id : id ,
        post_title : title , 
        post_body : body
    })
   })
      showAlert("Updated Successfully" , "info")
//    alert("Updated Successfully");

   }catch(error){
    console.error("Error in Fetching Posts : " , error);
   } 
}
// step 10 : when form is submitted --> if it was editing case --> send data to "UpdatePost" function , if it was adding --> send data to "addNewPost" function , then hide form and fetch posts after either editing or adding.
postForm.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const title = formTitleInput.value;
    const body = formBodyInput.value;
    if(isEditing){
        const id = postIdInput.value; 
        updatePost(id , title , body);
    }else{
        addNewPost(title , body);
    }
    hideForm();
    fetchPosts();
});
// excuted initaly to get posts
fetchPosts();
// alert
function showAlert(message , Type = "primary"){
    const alertContainer = document.getElementById("alertContainer");

    const alertDiv = document.createElement('div');
    alertDiv.setAttribute("role"  , "alert");
    alertDiv.className = `alert alert-${Type}`;
    alertDiv.textContent = message ;

    alertContainer.appendChild(alertDiv);

    setTimeout(()=>{
        alertDiv.remove();
    } , 3000)

}
