// script.js – Interactivity and animations

document.addEventListener("DOMContentLoaded", () => {
  // ----- Dark Mode Toggle and Persistence -----
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
  const toggleDark = document.getElementById('toggleDark');
  if (toggleDark) {
    toggleDark.innerText = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    toggleDark.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDark);
      toggleDark.innerText = isDark ? 'Light Mode' : 'Dark Mode';
    });
  }

  // ----- Post Like Button Functionality -----
  window.incrementLike = function (btn) {
    if (btn.disabled) return;
    const countSpan = btn.querySelector('.like-count');
    let count = parseInt(countSpan.innerText);
    count++;
    countSpan.innerText = count;
    btn.classList.add('animate-like');
    btn.disabled = true;
    setTimeout(() => { btn.classList.remove('animate-like'); }, 200);
  };

  // ----- Copy Code Functionality -----
  window.copyCode = function (btn, codeId) {
    const codeElem = document.getElementById(codeId);
    if (!codeElem) return;
    navigator.clipboard.writeText(codeElem.innerText).then(() => {
      btn.innerText = 'Copied!';
      setTimeout(() => { btn.innerText = 'Copy Code'; }, 1500);
    });
  };

  // ----- Comment Functionality -----
  window.addComment = function (e, form) {
    e.preventDefault();
    const commentText = form.comment.value.trim();
    if (!commentText) return;
    
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `
      <p class="comment-text">${commentText}</p>
      <button class="comment-like-btn" onclick="incrementCommentLike(this)">
        Like (<span class="comment-like-count">0</span>)
      </button>
    `;
    
    const commentsList = form.parentElement.querySelector('.comments-list');
    if (commentsList) {
      commentsList.appendChild(commentDiv);
    }
    
    form.reset();
  };

  window.incrementCommentLike = function (btn) {
    if (btn.disabled) return;
    const countSpan = btn.querySelector('.comment-like-count');
    let count = parseInt(countSpan.innerText);
    count++;
    countSpan.innerText = count;
    btn.disabled = true;
  };

  // ----- Featured Gallery Auto-Slide -----
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

  // ----- To-Do Checklist Toggle -----
  window.toggleDone = function (item) {
    item.classList.toggle('done');
  };

  // ----- Background Music Toggle -----
  const bgMusic = document.getElementById("bgMusic");
  window.toggleMusic = function () {
    if (bgMusic) {
      bgMusic.paused ? bgMusic.play() : bgMusic.pause();
    }
  };

  // ----- Portfolio Modal Functionality (if needed) -----
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
    // Additional project objects...
  ];
  
  window.openModal = function (projectIndex) {
    currentProject = projects[projectIndex];
    currentIndex = 0;
    modalTitle.textContent = currentProject.title;
    updateMedia();
    updateThumbnails();
    modal.style.display = "flex";
  };
  
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
});
