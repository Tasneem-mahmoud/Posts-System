# Posts-System
User can display , add , edit and delete his posts.
# Basic Structure (how project works ?) 
1- posts are displayed at a table.
2- to add new post --> click "add new post " button , a pop up window will appear to add [post title , post body ], add them then you have option to 'submit' or 'cancel'.
   a- if you clicked 'submit' --> it will be added at table after exixiting posts.
   b - if you clicked 'cancel' --> it won't be added.

3 - to edit existing post --> click "edit" button , a pop up window will be opened with data at [post title , post body ] , uodate then you can press 'submit' , or you can cancel editing process.

4 - to delete exisiting post --> click "delete" buttton, a message will apear after deleteing ubove table.

# hint 
an Alert will apear [ above posts table ] after any process either its "Adding" , "Editing" , or "Deleteing" .

# Main Structure (Techincal )
1- html page : to display table .
2- db.json : works as database file.
3- js file : for bussiness logic.

# Used Concepts 
1- depending on "fetch" to send requests to "POST" , "PUT" , "GET" , "DELETE" data from db.json.
2- Function : for Solid Priceplies "clean code".


# Technical Logic
1- when "AddNewPost" button clicked --> showForm.
2- when "Cancel" button clicked --> hideForm + 4 useful steps : 
   a- detect that user not editing.
   b- reset form fileds.
   c- form title -->  returns to "Add Post" [if it was 'Editing' process.
   d- reset 'id' value.
 3- "renderPosts" function to create new row at table body with 5 elements [post id , post title , post body , edit btn , delete btn ].
 4 - "fetchPosts" function : our first CRUD Opeartion --> to "GET"  all exsiting posts from db.json file, by sending request , and gives these data to "renderPosts" function to display them , "simply : renderPosts is a pre-created structure" and "fetchPosts" is data putted into this structure.
 5- At step 3 we added "edit" btn and "delete" btn , now let's explain "Edit" btn : 
   when its clicked "pop up window wil be opened" and its exactlly "modal" , with posts data putted into form fileds [ post title , post Body ]. 
   How to know specific post ? using its "Id". 
   edit post then you have 2 options : 
   1- 'submit' --> either post is added or updated.
   2- 'cancel' --> to cancel operation.
6- "deletePost" function : secound CRUD Operation "DELETE" , sending request with "DELETE"
method.
7-"addNewPost"function : third CRUD Operation "Add" , sending request with "POST" method.
8- "updatePost" function : forth CRUD Operation "Edit" , sending request with "PUT" method.
9- And we save the best for last , what happened when form is 'submitted' ? we should handle case seniaroies : 
  1 - if its "adding" process --> "addNewPost" function is excuted and passing data to it as parameters {post title , post body }.
  2- if its "editing" process --> "editPost" function is excuted and passing data to it as parametes {post id , post title , post body }.
    then hideForm and fetch posts after either its "adding" or "editing" process .
10 - "showAlert" function that is adding div element with class="alert" , changing its color depends on either its "Adding"  , "Editing" , "Deleting" , "Reading".
   
  

