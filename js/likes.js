let like = document.querySelectorAll(".like");
like.forEach((likeE1) => {
    likeE1.addEventListener('click', addlike);
});

function addlike(event) {
    console.log('like');
    let likeE1 = event.currentTarget;
    let zeroLikesHeart = likeE1.classList.contains('dont');
    if (zeroLikesHeart) {
        likeE1.classList.remove('dont');
        likeE1.classList.add('be');
    } else {
        likeE1.classList.remove('be');
        likeE1.classList.add('dont');
    }
}
