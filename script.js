document.addEventListener('DOMContentLoaded', function() {
  // Inject header and footer HTML
  const headerHTML = `
    <header>
      <div class="logo">Bengimini</div>
      <nav>
        <ul>
          <li><a href="index.html">All Posts</a></li>
          <li><a href="daily.html">Daily Life</a></li>
          <li><a href="dev.html">Dev Projects</a></li>
          <li><a href="art.html">Art Projects</a></li>
          <li><a href="recipes.html">Recipes</a></li>
          <li><a href="pets.html">Pets</a></li>
        </ul>
      </nav>
      <div class="header-icons">
        <button class="dark-mode-toggle" id="darkModeToggle">
          <i class="fas fa-moon"></i>
        </button>
        <button class="login-btn" id="loginBtn">
          <i class="fas fa-user"></i>
        </button>
      </div>
    </header>
  `;
  const footerHTML = `
    <footer>
      <p>&copy; 2025 Bengimini. All Rights Reserved.</p>
      <p>
        <a href="about.html">About</a> |
        <a href="contact.html">Contact</a> |
        <a href="privacy.html">Privacy Policy</a> |
        <a href="portfolio.html">Portfolio</a>
      </p>
      <p>
        <a href="mailto:bengisu.sarac@bilgiedu.net" title="Email">Email</a> |
        <a href="https://github.com/beng262" target="_blank" title="GitHub">GitHub</a> |
        <a href="https://linkedin.com/in/bengisarac14697" target="_blank" title="LinkedIn">LinkedIn</a> |
        <a href="https://bengisrc.artstation.com" target="_blank" title="ArtStation">ArtStation</a> |
        <a href="https://www.figma.com/design/cfYIqVr6bICi37Y1FilpQa/Figma-Portfolio?node-id=0-1" target="_blank" title="Figma">Figma</a>
      </p>
    </footer>
  `;
  // Sidebar Widgets Injection
  const sidebarHTML = `
    <aside class="sidebar">
      <div class="widget trending-posts animated-hover">
        <h3>Trending Posts</h3>
        <ul>
          <li><a href="#">Top 10 Web Dev Tools</a></li>
          <li><a href="#">Daily Routine Hacks</a></li>
          <li><a href="#">Art Techniques Revealed</a></li>
          <li><a href="#">Healthy Recipes</a></li>
          <li><a href="#">Pet Adventures</a></li>
        </ul>
      </div>
      <div class="widget trending-comments animated-hover">
        <h3>Trending Comments</h3>
        <ul>
          <li><a href="#">"Absolutely inspiring!" - Alex</a></li>
          <li><a href="#">"Love the creativity" - Jamie</a></li>
          <li><a href="#">"Delicious recipe, must try!" - Sam</a></li>
        </ul>
      </div>
      <div class="widget about-me animated-hover">
        <h3>About Me</h3>
        <img src="https://assets.onecompiler.app/438dg3d7r/438dg5wd8/BPic.png" alt="About Me" />
        <p>I'm a creative soul blending computer engineering with art and design. I love building projects, capturing daily moments, and whipping up delicious recipes.</p>
      </div>
    </aside>
  `;

  document.getElementById('headerContainer').innerHTML = headerHTML;
  document.getElementById('footerContainer').innerHTML = footerHTML;
  document.getElementById('sidebarContainer').innerHTML = sidebarHTML;

  // Dark Mode Toggle with Icon Swap
  const darkModeToggle = document.getElementById('darkModeToggle');
  function updateDarkModeIcon() {
    if (document.body.classList.contains('dark-mode')) {
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
  updateDarkModeIcon();
  darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    updateDarkModeIcon();
  });

  // Fake Users and Session Management
  const fakeUsers = [
    { username: 'user1', password: 'pass1', favorites: [], isAdmin: false },
    { username: 'admin', password: 'adminpass', favorites: [], isAdmin: true }
  ];
  function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
  function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    updateLoginButton();
    renderFavorites();
  }
  function updateLoginButton() {
    const loginBtn = document.getElementById('loginBtn');
    const user = getCurrentUser();
    if (user) {
      loginBtn.innerHTML = user.isAdmin 
        ? '<i class="fas fa-user-shield"></i>' 
        : '<i class="fas fa-user"></i>';
    } else {
      loginBtn.innerHTML = '<i class="fas fa-user"></i>';
    }
  }
  updateLoginButton();

  // Login Modal Handling
  const loginModal = document.getElementById('loginModal');
  const loginBtn = document.getElementById('loginBtn');
  const loginClose = document.getElementById('loginClose');
  const loginForm = document.getElementById('loginForm');
  loginBtn.addEventListener('click', function() {
    const user = getCurrentUser();
    if (user && user.isAdmin) {
      openAdminDashboard();
    } else if (!user) {
      loginModal.style.display = 'flex';
    }
  });
  if (loginClose) {
    loginClose.addEventListener('click', function() {
      loginModal.style.display = 'none';
    });
  }
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      const user = fakeUsers.find(u => u.username === username && u.password === password);
      if (user) {
        setCurrentUser(user);
        loginModal.style.display = 'none';
      } else {
        alert('Invalid credentials');
      }
    });
  }

  // Admin Dashboard Handling
  const adminModal = document.getElementById('adminModal');
  const adminClose = document.getElementById('adminClose');
  const adminPostForm = document.getElementById('adminPostForm');
  function openAdminDashboard() {
    adminModal.style.display = 'flex';
  }
  if (adminClose) {
    adminClose.addEventListener('click', function() {
      adminModal.style.display = 'none';
    });
  }
  if (adminPostForm) {
    adminPostForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const postTitle = document.getElementById('postTitle').value.trim();
      const postContent = document.getElementById('postContent').value.trim();
      const postCategory = document.getElementById('postCategory').value;
      alert(`Post saved:\nTitle: ${postTitle}\nCategory: ${postCategory}\nContent: ${postContent}`);
      adminPostForm.reset();
      adminModal.style.display = 'none';
    });
  }

  // Like Button Functionality
  window.incrementLike = function(btn) {
    if (btn.disabled) return;
    const countSpan = btn.querySelector('.like-count');
    let count = parseInt(countSpan.innerText);
    count++;
    countSpan.innerText = count;
    btn.classList.add('animate-like');
    btn.disabled = true;
    setTimeout(() => {
      btn.classList.remove('animate-like');
      btn.disabled = false;
    }, 500);
  };

  // Favorite Button Functionality (using star icon)
  window.toggleFavorite = function(btn, postId) {
    let currentUser = getCurrentUser();
    if (!currentUser) {
      alert("Please login to favorite posts.");
      return;
    }
    const favs = currentUser.favorites || [];
    const index = favs.indexOf(postId);
    if (index > -1) {
      favs.splice(index, 1);
      btn.classList.remove('favorited');
    } else {
      favs.push(postId);
      btn.classList.add('favorited');
    }
    currentUser.favorites = favs;
    setCurrentUser(currentUser);
  };

  // Render Favorites in Sidebar
  function renderFavorites() {
    const favContainer = document.getElementById('favoritesContainer');
    if (!favContainer) return;
    const user = getCurrentUser();
    if (!user || !user.favorites.length) {
      favContainer.innerHTML = '<p>No favorites yet.</p>';
      return;
    }
    favContainer.innerHTML = '';
    user.favorites.forEach(function(postId) {
      const favItem = document.createElement('div');
      favItem.className = 'favorite-item';
      favItem.innerText = "Post: " + postId;
      favContainer.appendChild(favItem);
    });
  }
  renderFavorites();

  // Copy Code Functionality
  window.copyCode = function(btn, codeId) {
    const codeElem = document.getElementById(codeId);
    if (!codeElem) return;
    navigator.clipboard.writeText(codeElem.innerText).then(() => {
      btn.innerText = 'Copied!';
      setTimeout(() => { btn.innerText = 'Copy Code'; }, 1500);
    });
  };

  // Comment Functionality
  window.addComment = function(e, form) {
    e.preventDefault();
    const commentText = form.comment.value.trim();
    if (!commentText) return;
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `<p class="comment-text">${commentText}</p>
      <button class="comment-like-btn" onclick="incrementCommentLike(this)">Like(<span class="comment-like-count">0</span>)</button>`;
    const commentsList = form.parentElement.querySelector('.comments-list');
    if (commentsList) {
      commentsList.appendChild(commentDiv);
    }
    form.reset();
  };
  window.incrementCommentLike = function(btn) {
    if (btn.disabled) return;
    const countSpan = btn.querySelector('.comment-like-count');
    let count = parseInt(countSpan.innerText);
    count++;
    countSpan.innerText = count;
    btn.disabled = true;
  };

  // Gallery Slide Functionality
  let slideIndex = 0;
  function showSlide(index) {
    const slides = document.querySelectorAll('.gallery-slide');
    slides.forEach((slide, i) => {
      slide.style.display = (i === index) ? 'block' : 'none';
    });
    slideIndex = index;
  }
  window.showSlide = showSlide;
  function autoSlide() {
    const slides = document.querySelectorAll('.gallery-slide');
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }
  if (document.querySelectorAll('.gallery-slide').length > 0) {
    showSlide(0);
    setInterval(autoSlide, 5000);
  }

  // Checklist Toggle for Recipes
  window.toggleDone = function(item) {
    item.classList.toggle('done');
    item.classList.add('toggle-animation');
    setTimeout(() => { item.classList.remove('toggle-animation'); }, 300);
  };

  // Rating Stars Functionality
  window.setRating = function(btn, rating) {
    const buttons = btn.parentElement.querySelectorAll('button');
    buttons.forEach((b, i) => {
      if (i < rating) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
  };
});
