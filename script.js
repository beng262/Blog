// script.js – Interactivity and animations

// Preserve dark mode state across pages
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
  if (document.getElementById('toggleDark')) {
    document.getElementById('toggleDark').innerText = 'Light Mode';
  }
}

const toggleDark = document.getElementById('toggleDark');
if (toggleDark) {
  toggleDark.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    toggleDark.innerText = isDark ? 'Light Mode' : 'Dark Mode';
  });
}

// Like Button Animation
function incrementLike(btn) {
  if (btn.disabled) return; // Prevent multiple likes
  const countSpan = btn.querySelector('.like-count');
  let count = parseInt(countSpan.innerText);
  count++;
  countSpan.innerText = count;
  btn.classList.add('animate-like');
  btn.disabled = true; // Disable the button after one click
  setTimeout(() => { btn.classList.remove('animate-like'); }, 200);
}

// Like Button for Posts
function incrementLike(btn) {
  if (btn.disabled) return;
  const countSpan = btn.querySelector('.like-count');
  let count = parseInt(countSpan.innerText);
  count++;
  countSpan.innerText = count;
  btn.classList.add('animate-like');
  btn.disabled = true;
  setTimeout(() => { btn.classList.remove('animate-like'); }, 200);
}

// Copy Code Functionality
function copyCode(btn, codeId) {
  const codeElem = document.getElementById(codeId);
  if (!codeElem) return;
  navigator.clipboard.writeText(codeElem.innerText).then(() => {
    btn.innerText = 'Copied!';
    setTimeout(() => { btn.innerText = 'Copy Code'; }, 1500);
  });
}

// Add Comment Functionality
function addComment(e, form) {
  e.preventDefault();
  const commentText = form.comment.value.trim();
  if (!commentText) return;
  
  // Create comment element
  const commentDiv = document.createElement('div');
  commentDiv.className = 'comment';
  commentDiv.innerHTML = `
    <p class="comment-text">${commentText}</p>
    <button class="comment-like-btn" onclick="incrementCommentLike(this)">Like (<span class="comment-like-count">0</span>)</button>
  `;
  
  // Append comment to the corresponding comments list (assumed to be in the same post)
  const commentsList = form.parentElement.querySelector('.comments-list');
  if (commentsList) {
    commentsList.appendChild(commentDiv);
  }
  
  form.reset();
}

// Like Button for Comments
function incrementCommentLike(btn) {
  if (btn.disabled) return;
  const countSpan = btn.querySelector('.comment-like-count');
  let count = parseInt(countSpan.innerText);
  count++;
  countSpan.innerText = count;
  btn.disabled = true;
}

// Featured Gallery Auto-Slide
let slideIndex = 0;
function showSlide(index) {
  const slides = document.querySelectorAll('.gallery-slide');
  slides.forEach((slide, i) => {
    slide.style.display = (i === index) ? 'block' : 'none';
  });
  slideIndex = index;
}
function autoSlide() {
  const slides = document.querySelectorAll('.gallery-slide');
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}
if (document.querySelectorAll('.gallery-slide').length > 0) {
  showSlide(0);
  setInterval(autoSlide, 5000);
}

// Dark mode toggle
const toggleDark = document.getElementById('toggleDark');
if (toggleDark) {
  toggleDark.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    toggleDark.innerText = isDark ? 'Light Mode' : 'Dark Mode';
  });
}
// To-Do Checklist Toggle
function toggleDone(item) {
  item.classList.toggle('done');
}

// Background Music Toggle
const bgMusic = document.getElementById("bgMusic");
function toggleMusic() {
  if (bgMusic) {
    if (bgMusic.paused) { bgMusic.play(); } else { bgMusic.pause(); }
  }
}

function copyCode(btn, codeId) {
  const codeElem = document.getElementById(codeId);
  if (!codeElem) return;
  navigator.clipboard.writeText(codeElem.innerText).then(() => {
    btn.innerText = 'Copied!';
    setTimeout(() => { btn.innerText = 'Copy Code'; }, 1500);
  });
}


// Featured Gallery Auto-Slide (for index.html)
let slideIndex = 0;
function showSlide(index) {
  const slides = document.querySelectorAll('.gallery-slide');
  slides.forEach((slide, i) => {
    slide.style.display = (i === index) ? 'block' : 'none';
  });
  slideIndex = index;
}
function autoSlide() {
  const slides = document.querySelectorAll('.gallery-slide');
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}
if (document.querySelectorAll('.gallery-slide').length > 0) {
  showSlide(0);
  setInterval(autoSlide, 5000);
}

// Portfolio Modal Functionality (if needed)
let currentProject = null;
let currentIndex = 0;
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const sliderMedia = document.getElementById("sliderMedia");
const thumbnailGallery = document.getElementById("thumbnailGallery");
const navLeft = document.getElementById("navLeft");
const navRight = document.getElementById("navRight");
const closeBtn = document.querySelector(".close");

const projects = [
  {
    title: "Arcane Style Drawing",
    mainImage: "https://assets.onecompiler.app/438dg3d7r/43d5w35zq/bengi-src-1000001715%20(1).jpg",
    media: [
      "https://assets.onecompiler.app/438dg3d7r/43d5w35zq/bengi-src-1000001715%20(1).jpg",
      "https://assets.onecompiler.app/438dg3d7r/43d5w35zq/bengi-src-1000001714.jpg"
    ]
  },
  {
    title: "Scarlet Witch",
    mainImage: "https://assets.onecompiler.app/438dg3d7r/43d5w35zq/bengi-src-1000001305.jpg",
    media: [
      "https://assets.onecompiler.app/438dg3d7r/43d5w35zq/bengi-src-1000001305.jpg",
      "https://assets.onecompiler.app/438dg3d7r/43d5w35zq/bengi-src-20220919-065646.jpg"
    ]
  },
  {
    title: "Skyrim Miraak",
    mainImage: "https://assets.onecompiler.app/438dg3d7r/43d5w35zq/bengi-src-1549655700007.jpg",
    media: [
      "https://assets.onecompiler.app/438dg3d7r/43d5w35zq/bengi-src-1549655700007.jpg",
      "https://assets.onecompiler.app/438dg3d7r/43d5w35zq/bengi-src-1549567656014.jpg",
      "https://assets.onecompiler.app/438dg3d7r/43d5w35zq/bengi-src-20221227-233651.jpg"
    ]
  },
  {
    title: "Pastels",
    mainImage: "https://assets.onecompiler.app/438dg3d7r/43d5w35zq/bengi-src-untitled77-20220123224135.jpg",
    media: [
      "https://assets.onecompiler.app/438dg3d7r/43d5w35zq/bengi-src-untitled77-20220123224135.jpg",
      "https://assets.onecompiler.app/438dg3d7r/43d5w35zq/bengi-src-untitled77-20220123224216.jpg",
      "https://assets.onecompiler.app/438dg3d7r/43d5w35zq/bengi-src-untitled77-20220123224226.jpg",
      "https://assets.onecompiler.app/438dg3d7r/43d5w35zq/bengi-src-untitled77-20220123224142.jpg"
    ]
  },
  {
    title: "Animals",
    mainImage: "https://assets.onecompiler.app/438dg3d7r/43d5w35zq/bengi-src-1533201409907.jpg",
    media: [
      "https://assets.onecompiler.app/438dg3d7r/43d5w35zq/bengi-src-1533201409907.jpg",
      "https://assets.onecompiler.app/438dg3d7r/43d5w35zq/bengi-src-20200203-205907.jpg"
    ]
  },
  {
    title: "Eye",
    mainImage: "https://assets.onecompiler.app/438dg3d7r/43d5w35zq/bengi-src-20200203-205832%20(1).jpg",
    media: [
      "https://assets.onecompiler.app/438dg3d7r/43d5w35zq/bengi-src-20200203-205832%20(1).jpg"
    ]
  }
];

function openModal(projectIndex) {
  currentProject = projects[projectIndex];
  currentIndex = 0;
  modalTitle.textContent = currentProject.title;
  updateMedia();
  updateThumbnails();
  modal.style.display = "flex";
}

function updateMedia() {
  sliderMedia.innerHTML = "";
  if (!currentProject || !currentProject.media.length) return;
  const src = currentProject.media[currentIndex];
  let mediaElem;
  if (src.match(/\.(mp4|webm|ogg)$/i)) {
    mediaElem = document.createElement("video");
    mediaElem.src = src;
    mediaElem.controls = true;
    mediaElem.autoplay = true;
  } else {
    mediaElem = document.createElement("img");
    mediaElem.src = src;
    mediaElem.alt = currentProject.title;
  }
  sliderMedia.appendChild(mediaElem);
  updateNavButtons();
}

function updateNavButtons() {
  navLeft.style.display = currentIndex > 0 ? "block" : "none";
  navRight.style.display = currentIndex < currentProject.media.length - 1 ? "block" : "none";
}

function updateThumbnails() {
  thumbnailGallery.innerHTML = "";
  currentProject.media.forEach((src, idx) => {
    const thumb = document.createElement("img");
    thumb.src = src;
    thumb.alt = `Thumbnail ${idx + 1}`;
    if (idx === currentIndex) thumb.classList.add("active");
    thumb.onclick = () => {
      currentIndex = idx;
      updateMedia();
      updateThumbnails();
    };
    thumbnailGallery.appendChild(thumb);
  });
}

function setRating(btn, rating) {
  const ratingDiv = btn.parentElement;
  const stars = ratingDiv.querySelectorAll('button');
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
  // Optionally, I can store the rating value or do something with it here.
}


if (closeBtn) {
  closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
}
window.addEventListener("click", (e) => {
  if (e.target === modal) { modal.style.display = "none"; }
});
navLeft.addEventListener("click", () => {
  if (currentIndex > 0) { currentIndex--; updateMedia(); updateThumbnails(); }
});
navRight.addEventListener("click", () => {
  if (currentIndex < currentProject.media.length - 1) { currentIndex++; updateMedia(); updateThumbnails(); }
});
