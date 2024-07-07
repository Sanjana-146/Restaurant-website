window.addEventListener('scroll',function(){
    let header = document.querySelector('header');
    header.classList.toggle("sticky",window.scrollY > 0)
})
const burgerBtn = document.getElementById('burgerBtn');
function showCategory(category){
    const categories = document.querySelectorAll('.category');
    categories.forEach(cat =>{
        cat.classList.remove('active');
    });

if(category === 'burger'){
    document.getElementById('burger').classList.add('active');
    burgerBtn.style.background = "rgb(3, 97, 3)";
    
}else{
    document.getElementById(category).classList.add('active');
    burgerBtn.style.background = "white";
}
}
const login = document.getElementById('login-btn');
const userImg = document.getElementById('user-img');
const logout = document.getElementById('logout');
const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        login.style.display = 'none';
        userImg.style.display = 'block';
    } else {
        login.style.display = 'block';
        userImg.style.display = 'none';
    }
userImg.addEventListener('click', function() {
    // logout.classList.remove('notVisible');
    logout.classList.add('visibled');
});
logout.addEventListener('click',function(){
    login.style.display = 'block';
    userImg.style.display = 'none';
    logout.style.display = 'none';
})

login.addEventListener('click',function(){
     window.location.href = "form.html";
})

showCategory('burger');
const swiper = new Swiper('.slider-wrapper', {
    // Optional parameters
    // direction: 'vertical',
    loop: true,
    grabCurs0r: true,
    spaceBetween: 30,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints:{
        0: {
            slidesPerView: 1
        },
        620: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        },
    }
  });