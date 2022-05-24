const blogs = Array.from(document.querySelector(".blog-container"));
adjustBlogsForBigScreen();
function adjustBlogsForBigScreen(){
    
    blogs.forEach((blog,index)=>{
        if(index===0)
        blog.style.grid_column = "1/3";
        else if(index===1)
        blog.style.grid_column = "3/5";
    });
}

