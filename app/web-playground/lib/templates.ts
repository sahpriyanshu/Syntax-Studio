interface Template {
  description: string;
  tags: string[];
  files: Record<string, string>;
  preview?: string;
}

export const templates: Record<string, Template> = {
  "Landing Page": {
    description: "A modern landing page with hero section and features",
    tags: ["Marketing", "Business", "Responsive"],
    files: {
      "index.html": `<!DOCTYPE html>
<html>
<head>
  <title>Modern Landing Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <div class="logo">Brand</div>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <section class="hero">
      <h1>Welcome to Our Platform</h1>
      <p>The best solution for your needs</p>
      <button>Get Started</button>
    </section>
  </main>
  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `/* Modern landing page styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  line-height: 1.5;
}

nav {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.hero {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

button {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  background: #fff;
  color: #764ba2;
  cursor: pointer;
  transition: transform 0.2s;
}

button:hover {
  transform: translateY(-2px);
}`,
      "script.js": `// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});`,
    },
  },
  Portfolio: {
    description: "Professional portfolio showcase with projects grid",
    tags: ["Personal", "Creative", "Gallery"],
    files: {
      "index.html": `<!DOCTYPE html>
<html>
<head>
  <title>Portfolio</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>John Doe</h1>
    <p>Web Developer & Designer</p>
  </header>
  <main>
    <section class="about">
        <div class="about-content">
            <div class="profile-image">
                <img src="https://via.placeholder.com/200" alt="Profile Picture">
            </div>
            <div class="about-text">
                <h1>John Doe</h1>
                <h2>Web Developer & Designer</h2>
                <p>A passionate web developer and designer with 5+ years of experience creating beautiful and functional websites. I specialize in responsive design, user experience, and modern web technologies.</p>
            </div>
        </div>
    </section>
    <section class="projects">
        <h2>Projects</h2>
        <div class="project-grid">
            <div class="project-card">
                <img src="https://via.placeholder.com/300" alt="Project 1">
                <h3>Project 1</h3>
                <p>Description of project 1</p>
                <div class="project-links">
                    <a href="#" class="button">View Project</a>
                    <a href="#" class="button">Github</a>
                </div>
            </div>
            <div class="project-card">
                <img src="https://via.placeholder.com/300" alt="Project 2">
                <h3>Project 2</h3>
                <p>Description of project 2</p>
                <div class="project-links">
                    <a href="#" class="button">View Project</a>
                    <a href="#" class="button">Github</a>
                </div>
            </div>
            <div class="project-card">
                <img src="https://via.placeholder.com/300" alt="Project 3">
                <h3>Project 3</h3>
                <p>Description of project 3</p>
                <div class="project-links">
                    <a href="#" class="button">View Project</a>
                    <a href="#" class="button">Github</a>
                </div>
            </div>
        </div>
    </section>
    <section class="contact">
        <h2>Contact</h2>
        <form id="contact-form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit">Send</button>
        </form>
    </section>
    <footer>
        <div class="social-links">
            <a href="#" class="social-link">Github</a>
            <a href="#" class="social-link">LinkedIn</a>
            <a href="#" class="social-link">Twitter</a>
        </div>
        <p>&copy; 2023 John Doe</p>
    </footer>
  </main>
  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `/* Reset and base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f5f5;
}

/* Header styles */
header {
    background-color: #3B4371;
    color: white;
    text-align: center;
    padding: 2rem;
}

/* About section */
.about {
    padding: 4rem 2rem;
    background-color: white;
}

.about-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 2rem;
    align-items: center;
}

.profile-image img {
    border-radius: 50%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.about-text {
    flex: 1;
}

.about-text h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #3B4371;
}

.about-text h2 {
    font-size: 1.5rem;
    color: #666;
    margin-bottom: 1rem;
}

/* Projects section */
.projects {
    padding: 4rem 2rem;
    background-color: #f8f9fa;
}

.projects h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #3B4371;
}

.project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.project-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}

.project-card:hover {
    transform: translateY(-5px);
}

.project-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.project-card h3 {
    padding: 1rem;
    color: #3B4371;
}

.project-card p {
    padding: 0 1rem;
    color: #666;
}

.project-links {
    padding: 1rem;
    display: flex;
    gap: 1rem;
}

.button {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #3B4371;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.button:hover {
    background-color: #2a325c;
}

/* Contact section */
.contact {
    padding: 4rem 2rem;
    background-color: white;
}

.contact h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #3B4371;
}

#contact-form {
    max-width: 600px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #666;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.form-group textarea {
    height: 150px;
    resize: vertical;
}

button[type="submit"] {
    display: block;
    width: 100%;
    padding: 1rem;
    background-color: #3B4371;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

button[type="submit"]:hover {
    background-color: #2a325c;
}

/* Footer */
footer {
    background-color: #3B4371;
    color: white;
    padding: 2rem;
    text-align: center;
}

.social-links {
    margin-bottom: 1rem;
}

.social-link {
    color: white;
    text-decoration: none;
    margin: 0 1rem;
    transition: opacity 0.2s;
}

.social-link:hover {
    opacity: 0.8;
}

/* Responsive design */
@media (max-width: 768px) {
    .about-content {
        flex-direction: column;
        text-align: center;
    }

    .project-grid {
        grid-template-columns: 1fr;
    }
}`,
      "script.js": `// Form submission handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // You would typically send this data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    this.reset();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation to project cards when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(card);
});`,
    },
  },
  Blog: {
    description: "Clean and minimal blog layout",
    tags: ["Content", "Writing", "Minimal"],
    files: {
      "index.html": `<!DOCTYPE html>
<html>
<head>
  <title>My Blog</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>My Blog</h1>
    <nav>
      <a href="#home">Home</a>
      <a href="#articles">Articles</a>
      <a href="#about">About</a>
    </nav>
  </header>

  <main>
    <article class="post">
      <h2>First Blog Post</h2>
      <div class="meta">Posted on January 1, 2024</div>
      <p>This is the content of my first blog post. It's a great way to share thoughts and ideas.</p>
      <a href="#" class="read-more">Read More</a>
    </article>

    <article class="post">
      <h2>Second Blog Post</h2>
      <div class="meta">Posted on January 5, 2024</div>
      <p>Another interesting post about various topics that matter to me and my readers.</p>
      <a href="#" class="read-more">Read More</a>
    </article>
  </main>

  <aside>
    <section class="about">
      <h3>About Me</h3>
      <p>A passionate writer sharing thoughts and experiences.</p>
    </section>

    <section class="categories">
      <h3>Categories</h3>
      <ul>
        <li><a href="#">Technology</a></li>
        <li><a href="#">Travel</a></li>
        <li><a href="#">Food</a></li>
        <li><a href="#">Lifestyle</a></li>
      </ul>
    </section>
  </aside>

  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `/* Blog styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  color: #333;
  display: grid;
  grid-template-columns: 1fr minmax(auto, 800px) 300px 1fr;
  gap: 2rem;
  background: #f5f5f5;
}

header {
  grid-column: 1 / -1;
  background: white;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

nav {
  margin-top: 1rem;
}

nav a {
  margin: 0 1rem;
  text-decoration: none;
  color: #333;
}

main {
  grid-column: 2 / 3;
  padding: 2rem 0;
}

aside {
  grid-column: 3 / 4;
  padding: 2rem 0;
}

.post {
  background: white;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.meta {
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0 1rem;
}

.read-more {
  display: inline-block;
  margin-top: 1rem;
  color: #3B4371;
  text-decoration: none;
}

aside section {
  background: white;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.categories ul {
  list-style: none;
}

.categories a {
  display: block;
  padding: 0.5rem 0;
  text-decoration: none;
  color: #333;
}

@media (max-width: 1200px) {
  body {
    grid-template-columns: 1fr minmax(auto, 800px) 1fr;
  }
  
  aside {
    grid-column: 2 / 3;
    margin-top: 2rem;
  }
}`,
      "script.js": `// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Read more functionality
document.querySelectorAll('.read-more').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const post = this.closest('.post');
    post.classList.toggle('expanded');
  });
});`,
    },
  },
  "Todo App": {
    description: "Interactive todo list application",
    tags: ["Interactive", "Productivity", "JavaScript"],
    files: {
      "index.html": `<!DOCTYPE html>
<html>
<head>
  <title>Todo App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Todo List</h1>
    
    <form id="todo-form">
      <input 
        type="text" 
        id="todo-input" 
        placeholder="What needs to be done?"
        required
      >
      <button type="submit">Add Task</button>
    </form>

    <div class="filters">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="active">Active</button>
      <button class="filter-btn" data-filter="completed">Completed</button>
    </div>

    <ul id="todo-list"></ul>

    <div class="todo-stats">
      <span id="items-left">0 items left</span>
      <button id="clear-completed">Clear completed</button>
    </div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `/* Todo App styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  color: #333;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.container {
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #3B4371;
}

#todo-form {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

input {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  padding: 0.8rem 1.5rem;
  background: #3B4371;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #F3904F;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.filter-btn {
  background: none;
  color: #333;
  border: 1px solid #ddd;
}

.filter-btn.active {
  background: #3B4371;
  color: white;
  border-color: #3B4371;
}

#todo-list {
  list-style: none;
  margin-bottom: 2rem;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-item input[type="checkbox"] {
  margin-right: 1rem;
}

.todo-item.completed span {
  text-decoration: line-through;
  color: #999;
}

.todo-item button {
  margin-left: auto;
  padding: 0.4rem 0.8rem;
  background: #ff4444;
}

.todo-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
}

#clear-completed {
  background: none;
  color: #666;
  padding: 0.4rem 0.8rem;
}

#clear-completed:hover {
  text-decoration: underline;
}`,
      "script.js": `// Todo App functionality
class TodoApp {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    this.filter = 'all';
    this.init();
  }

  init() {
    // DOM elements
    this.todoForm = document.getElementById('todo-form');
    this.todoInput = document.getElementById('todo-input');
    this.todoList = document.getElementById('todo-list');
    this.itemsLeft = document.getElementById('items-left');
    this.clearCompleted = document.getElementById('clear-completed');
    this.filterButtons = document.querySelectorAll('.filter-btn');

    // Event listeners
    this.todoForm.addEventListener('submit', (e) => this.addTodo(e));
    this.clearCompleted.addEventListener('click', () => this.clearCompletedTodos());
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => this.setFilter(btn.dataset.filter));
    });

    this.render();
  }

  addTodo(e) {
    e.preventDefault();
    const text = this.todoInput.value.trim();
    if (text) {
      this.todos.push({
        id: Date.now(),
        text,
        completed: false
      });
      this.todoInput.value = '';
      this.save();
      this.render();
    }
  }

  toggleTodo(id) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.save();
    this.render();
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.save();
    this.render();
  }

  clearCompletedTodos() {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.save();
    this.render();
  }

  setFilter(filter) {
    this.filter = filter;
    this.filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    this.render();
  }

  getFilteredTodos() {
    switch (this.filter) {
      case 'active':
        return this.todos.filter(todo => !todo.completed);
      case 'completed':
        return this.todos.filter(todo => todo.completed);
      default:
        return this.todos;
    }
  }

  save() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  render() {
    const filteredTodos = this.getFilteredTodos();
    
    this.todoList.innerHTML = filteredTodos.map(todo => \`
      <li class="todo-item \${todo.completed ? 'completed' : ''}">
        <input 
          type="checkbox" 
          \${todo.completed ? 'checked' : ''} 
          onchange="todoApp.toggleTodo(\${todo.id})"
        >
        <span>\${todo.text}</span>
        <button onclick="todoApp.deleteTodo(\${todo.id})">Delete</button>
      </li>
    \`).join('');

    const itemsLeft = this.todos.filter(todo => !todo.completed).length;
    this.itemsLeft.textContent = \`\${itemsLeft} item\${itemsLeft === 1 ? '' : 's'} left\`;
  }
}

// Initialize the app
const todoApp = new TodoApp();`,
    },
  },
  Dashboard: {
    description: "Modern admin dashboard layout",
    tags: ["Admin", "Analytics", "UI"],
    files: {
      "index.html": `<!DOCTYPE html>
<html>
<head>
  <title>Admin Dashboard</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
  <div class="dashboard">
    <aside class="sidebar">
      <div class="logo">
        <i class="fas fa-chart-line"></i>
        <span>Dashboard</span>
      </div>
      <nav>
        <a href="#" class="active">
          <i class="fas fa-home"></i>
          <span>Overview</span>
        </a>
        <a href="#">
          <i class="fas fa-chart-bar"></i>
          <span>Analytics</span>
        </a>
        <a href="#">
          <i class="fas fa-users"></i>
          <span>Users</span>
        </a>
        <a href="#">
          <i class="fas fa-cog"></i>
          <span>Settings</span>
        </a>
      </nav>
    </aside>

    <main class="content">
      <header>
        <div class="search">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Search...">
        </div>
        <div class="user">
          <i class="fas fa-bell"></i>
          <img src="https://ui-avatars.com/api/?name=John+Doe" alt="User">
        </div>
      </header>

      <div class="stats">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-users"></i>
          </div>
          <div class="stat-details">
            <h3>Total Users</h3>
            <p class="stat-value">2,453</p>
            <p class="stat-change positive">+12.5%</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-shopping-cart"></i>
          </div>
          <div class="stat-details">
            <h3>Sales</h3>
            <p class="stat-value">$45,623</p>
            <p class="stat-change positive">+8.3%</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-chart-line"></i>
          </div>
          <div class="stat-details">
            <h3>Revenue</h3>
            <p class="stat-value">$21,456</p>
            <p class="stat-change negative">-2.4%</p>
          </div>
        </div>
      </div>

      <div class="charts">
        <div class="chart">
          <h3>Sales Overview</h3>
          <canvas id="salesChart"></canvas>
        </div>
        <div class="chart">
          <h3>User Activity</h3>
          <canvas id="usersChart"></canvas>
        </div>
      </div>
    </main>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `/* Dashboard styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  background: #f5f7fb;
  color: #333;
}

.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
}

.sidebar {
  background: #3B4371;
  color: white;
  padding: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  margin-bottom: 3rem;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sidebar a {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  text-decoration: none;
  color: white;
  border-radius: 8px;
  transition: background 0.3s;
}

.sidebar a:hover,
.sidebar a.active {
  background: rgba(255, 255, 255, 0.1);
}

.content {
  padding: 2rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.search {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.search input {
  border: none;
  outline: none;
  font-size: 1rem;
}

.user {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  gap: 1.5rem;
}

.stat-icon {
  width: 60px;
  height: 60px;
  background: #3B4371;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.stat-details h3 {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stat-change {
  font-size: 0.9rem;
}

.stat-change.positive {
  color: #4caf50;
}

.stat-change.negative {
  color: #f44336;
}

.charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.chart {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.chart h3 {
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: none;
  }
}`,
      "script.js": `// Initialize charts
const salesCtx = document.getElementById('salesChart').getContext('2d');
const usersCtx = document.getElementById('usersChart').getContext('2d');

// Sales chart
new Chart(salesCtx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales ($)',
      data: [30000, 35000, 32000, 40000, 38000, 45000],
      borderColor: '#3B4371',
      tension: 0.4,
      fill: false
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => '$' + value
        }
      }
    }
  }
});

// Users chart
new Chart(usersCtx, {
  type: 'bar',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Active Users',
      data: [1200, 1900, 1500, 1800, 2000, 1700, 1600],
      backgroundColor: '#3B4371'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Search functionality
const searchInput = document.querySelector('.search input');
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  // Add your search logic here
});

// Notifications
const notificationBtn = document.querySelector('.user .fa-bell');
notificationBtn.addEventListener('click', () => {
  // Add your notifications logic here
  alert('No new notifications');
});`,
    },
  },
  "E-commerce": {
    description: "Product listing and shopping cart",
    tags: ["Shop", "Products", "Cart"],
    files: {
      "index.html": `<!DOCTYPE html>
<html>
<head>
  <title>E-commerce Store</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
  <header>
    <nav>
      <div class="logo">Store</div>
      <div class="nav-items">
        <a href="#" class="active">Home</a>
        <a href="#">Products</a>
        <a href="#">Categories</a>
        <a href="#">Contact</a>
      </div>
      <div class="cart">
        <button id="cart-btn">
          <i class="fas fa-shopping-cart"></i>
          <span id="cart-count">0</span>
        </button>
      </div>
    </nav>
  </header>

  <main>
    <section class="hero">
      <h1>Welcome to Our Store</h1>
      <p>Discover amazing products at great prices</p>
    </section>

    <section class="filters">
      <div class="search">
        <input type="text" placeholder="Search products...">
      </div>
      <div class="categories">
        <button class="active">All</button>
        <button>Electronics</button>
        <button>Clothing</button>
        <button>Books</button>
      </div>
    </section>

    <section class="products" id="products">
      <!-- Products will be added here by JavaScript -->
    </section>
  </main>

  <div class="cart-modal" id="cart-modal">
    <div class="cart-content">
      <div class="cart-header">
        <h2>Shopping Cart</h2>
        <button id="close-cart">×</button>
      </div>
      <div class="cart-items" id="cart-items">
        <!-- Cart items will be added here by JavaScript -->
      </div>
      <div class="cart-footer">
        <div class="total">
          Total: <span id="cart-total">$0.00</span>
        </div>
        <button class="checkout-btn">Checkout</button>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `/* E-commerce styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  color: #333;
}

header {
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3B4371;
}

.nav-items {
  display: flex;
  gap: 2rem;
}

.nav-items a {
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav-items a:hover,
.nav-items a.active {
  background: #f5f5f5;
}

.cart button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  position: relative;
}

#cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #F3904F;
  color: white;
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
}

.hero {
  background: linear-gradient(135deg, #3B4371, #F3904F);
  color: white;
  text-align: center;
  padding: 4rem 2rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.filters {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.search input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.categories {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.categories button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: none;
  cursor: pointer;
  transition: all 0.3s;
}

.categories button:hover,
.categories button.active {
  background: #3B4371;
  color: white;
  border-color: #3B4371;
}

.products {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 1.5rem;
}

.product-title {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.product-price {
  color: #3B4371;
  font-weight: bold;
  margin-bottom: 1rem;
}

.add-to-cart {
  width: 100%;
  padding: 0.8rem;
  background: #3B4371;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.add-to-cart:hover {
  background: #F3904F;
}

.cart-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  background: white;
  box-shadow: -2px 0 4px rgba(0,0,0,0.1);
  transform: translateX(100%);
  transition: transform 0.3s;
}

.cart-modal.open {
  transform: translateX(0);
}

.cart-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.cart-header {
  padding: 1.5rem;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#close-cart {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.cart-item-info {
  flex: 1;
}

.cart-item-title {
  margin-bottom: 0.5rem;
}

.cart-item-price {
  color: #3B4371;
  font-weight: bold;
}

.cart-item-remove {
  color: #ff4444;
  background: none;
  border: none;
  cursor: pointer;
}

.cart-footer {
  padding: 1.5rem;
  border-top: 1px solid #ddd;
}

.total {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  background: #3B4371;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.checkout-btn:hover {
  background: #F3904F;
}

@media (max-width: 768px) {
  .nav-items {
    display: none;
  }

  .cart-modal {
    width: 100%;
  }
}`,
      "script.js": `// Sample product data
const products = [
  {
    id: 1,
    title: 'Wireless Headphones',
    price: 99.99,
    image: 'https://source.unsplash.com/random/400x400/?headphones',
    category: 'Electronics'
  },
  {
    id: 2,
    title: 'Cotton T-Shirt',
    price: 24.99,
    image: 'https://source.unsplash.com/random/400x400/?tshirt',
    category: 'Clothing'
  },
  {
    id: 3,
    title: 'Novel Collection',
    price: 49.99,
    image: 'https://source.unsplash.com/random/400x400/?books',
    category: 'Books'
  },
  // Add more products as needed
];

// Shopping cart
let cart = [];

// DOM elements
const productsContainer = document.getElementById('products');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const cartBtn = document.getElementById('cart-btn');
const closeCart = document.getElementById('close-cart');
const searchInput = document.querySelector('.search input');
const categoryButtons = document.querySelectorAll('.categories button');

// Render products
function renderProducts(products) {
  productsContainer.innerHTML = products.map(product => \`
    <div class="product-card">
      <img src="\${product.image}" alt="\${product.title}" class="product-image">
      <div class="product-info">
        <h3 class="product-title">\${product.title}</h3>
        <p class="product-price">$\${product.price.toFixed(2)}</p>
        <button class="add-to-cart" onclick="addToCart(\${product.id})">
          Add to Cart
        </button>
      </div>
    </div>
  \`).join('');
}

// Add to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push({ ...product, quantity: 1 });
    updateCart();
  }
}

// Update cart
function updateCart() {
  cartCount.textContent = cart.length;
  
  cartItems.innerHTML = cart.map(item => \`
    <div class="cart-item">
      <img src="\${item.image}" alt="\${item.title}">
      <div class="cart-item-info">
        <h4 class="cart-item-title">\${item.title}</h4>
        <p class="cart-item-price">$\${item.price.toFixed(2)}</p>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(\${item.id})">×</button>
    </div>
  \`).join('');

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = \`$\${total.toFixed(2)}\`;
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// Event listeners
cartBtn.addEventListener('click', () => {
  cartModal.classList.add('open');
});

closeCart.addEventListener('click', () => {
  cartModal.classList.remove('open');
});

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = products.filter(product =>
    product.title.toLowerCase().includes(query)
  );
  renderProducts(filtered);
});

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const category = button.textContent;
    const filtered = category === 'All'
      ? products
      : products.filter(product => product.category === category);
    renderProducts(filtered);
  });
});

// Initialize
renderProducts(products);
updateCart();`,
    },
  },
  Documentation: {
    description: "Technical documentation layout",
    tags: ["Docs", "Reference", "Guide"],
    files: {
      "index.html": `<!DOCTYPE html>
<html>
<head>
  <title>Documentation</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism.min.css">
</head>
<body>
  <nav class="sidebar">
    <div class="logo">Documentation</div>
    <div class="search">
      <input type="text" placeholder="Search docs...">
    </div>
    <ul class="nav-links">
      <li><a href="#getting-started" class="active">Getting Started</a></li>
      <li><a href="#installation">Installation</a></li>
      <li><a href="#usage">Usage</a></li>
      <li><a href="#api">API Reference</a></li>
      <li><a href="#examples">Examples</a></li>
    </ul>
  </nav>

  <main>
    <section id="getting-started">
      <h1>Getting Started</h1>
      <p>Welcome to our documentation. This guide will help you get started with our product.</p>
      
      <h2>Quick Start</h2>
      <pre><code class="language-bash">npm install my-package
npm start</code></pre>
      
      <h2>Features</h2>
      <ul>
        <li>Easy to use API</li>
        <li>Comprehensive documentation</li>
        <li>Multiple examples</li>
        <li>Active community</li>
      </ul>
    </section>

    <section id="installation">
      <h1>Installation</h1>
      <p>Follow these steps to install the package:</p>
      
      <pre><code class="language-bash">git clone https://github.com/user/repo
cd repo
npm install</code></pre>
    </section>

    <section id="usage">
      <h1>Usage</h1>
      <p>Here's a basic example of how to use our package:</p>
      
      <pre><code class="language-javascript">import { MyPackage } from 'my-package';

const instance = new MyPackage();
instance.doSomething();</code></pre>
    </section>
  </main>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/prism.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-bash.min.js"></script>
  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  display: flex;
  min-height: 100vh;
  color: #333;
}

.sidebar {
  width: 280px;
  background: #f8f9fa;
  border-right: 1px solid #dee2e6;
  padding: 2rem;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #3B4371;
}

.search {
  margin-bottom: 2rem;
}

.search input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.nav-links {
  list-style: none;
}

.nav-links li {
  margin-bottom: 0.5rem;
}

.nav-links a {
  text-decoration: none;
  color: #495057;
  padding: 0.5rem;
  display: block;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav-links a:hover,
.nav-links a.active {
  background: #e9ecef;
  color: #3B4371;
}

main {
  margin-left: 280px;
  padding: 2rem;
  flex: 1;
  max-width: 800px;
}

section {
  margin-bottom: 4rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #3B4371;
}

h2 {
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
  color: #495057;
}

p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

pre {
  margin: 1rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  overflow-x: auto;
}

code {
  font-family: 'Fira Code', monospace;
}

ul {
  margin: 1rem 0;
  padding-left: 2rem;
}

ul li {
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  body {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
    position: static;
    border-right: none;
    border-bottom: 1px solid #dee2e6;
  }
  
  main {
    margin-left: 0;
    padding: 1rem;
  }
}`,
      "script.js": `// Handle navigation
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Remove active class from all links
    document.querySelectorAll('.nav-links a').forEach(l => {
      l.classList.remove('active');
    });
    
    // Add active class to clicked link
    link.classList.add('active');
    
    // Smooth scroll to section
    const targetId = link.getAttribute('href').slice(1);
    document.getElementById(targetId).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Handle search
const searchInput = document.querySelector('.search input');
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  
  document.querySelectorAll('section').forEach(section => {
    const text = section.textContent.toLowerCase();
    if (text.includes(query)) {
      section.style.display = 'block';
    } else {
      section.style.display = 'none';
    }
  });
});

// Initialize Prism.js for syntax highlighting
Prism.highlightAll();`,
    },
  },
  "Social Profile": {
    description: "Social media profile page",
    tags: ["Social", "Profile", "Community"],
    files: {
      "index.html": `<!DOCTYPE html>
<html>
<head>
  <title>Social Profile</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
  <div class="profile-container">
    <div class="cover-photo">
      <img src="https://source.unsplash.com/random/1200x400/?nature" alt="Cover Photo">
    </div>
    
    <div class="profile-content">
      <div class="profile-header">
        <div class="profile-photo">
          <img src="https://source.unsplash.com/random/200x200/?portrait" alt="Profile Photo">
        </div>
        <div class="profile-info">
          <h1>John Doe</h1>
          <p class="bio">Digital Creator & Tech Enthusiast</p>
          <p class="location"><i class="fas fa-map-marker-alt"></i> San Francisco, CA</p>
        </div>
        <div class="profile-actions">
          <button class="follow-btn">Follow</button>
          <button class="message-btn">Message</button>
        </div>
      </div>
      
      <div class="stats">
        <div class="stat">
          <span class="number">1.2K</span>
          <span class="label">Posts</span>
        </div>
        <div class="stat">
          <span class="number">4.5K</span>
          <span class="label">Followers</span>
        </div>
        <div class="stat">
          <span class="number">892</span>
          <span class="label">Following</span>
        </div>
      </div>
      
      <div class="tabs">
        <button class="tab active" data-tab="posts">Posts</button>
        <button class="tab" data-tab="photos">Photos</button>
        <button class="tab" data-tab="about">About</button>
      </div>
      
      <div class="tab-content" id="posts">
        <div class="post">
          <div class="post-header">
            <img src="https://source.unsplash.com/random/50x50/?portrait" alt="Profile">
            <div>
              <h3>John Doe</h3>
              <span class="time">2 hours ago</span>
            </div>
          </div>
          <p class="post-content">Just launched my new project! Check it out and let me know what you think. #coding #webdev</p>
          <img src="https://source.unsplash.com/random/600x400/?technology" alt="Post Image" class="post-image">
          <div class="post-actions">
            <button><i class="fas fa-heart"></i> 245</button>
            <button><i class="fas fa-comment"></i> 23</button>
            <button><i class="fas fa-share"></i> Share</button>
          </div>
        </div>
        
        <div class="post">
          <div class="post-header">
            <img src="https://source.unsplash.com/random/50x50/?portrait" alt="Profile">
            <div>
              <h3>John Doe</h3>
              <span class="time">1 day ago</span>
            </div>
          </div>
          <p class="post-content">Beautiful day for coding outdoors! ☀️ #programming #lifestyle</p>
          <img src="https://source.unsplash.com/random/600x400/?laptop" alt="Post Image" class="post-image">
          <div class="post-actions">
            <button><i class="fas fa-heart"></i> 189</button>
            <button><i class="fas fa-comment"></i> 15</button>
            <button><i class="fas fa-share"></i> Share</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  background: #f0f2f5;
  color: #1c1e21;
  line-height: 1.5;
}

.profile-container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-top: 2rem;
  overflow: hidden;
}

.cover-photo {
  height: 300px;
  overflow: hidden;
}

.cover-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-content {
  padding: 0 2rem 2rem;
}

.profile-header {
  display: flex;
  align-items: flex-end;
  margin-top: -60px;
  margin-bottom: 2rem;
}

.profile-photo {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 4px solid white;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.profile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
  padding: 0 2rem;
}

.profile-info h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.bio {
  color: #65676b;
  margin-bottom: 0.5rem;
}

.location {
  color: #65676b;
  font-size: 0.9rem;
}

.location i {
  margin-right: 0.5rem;
}

.profile-actions {
  display: flex;
  gap: 1rem;
}

.follow-btn,
.message-btn {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.follow-btn {
  background: #1877f2;
  color: white;
}

.follow-btn:hover {
  background: #166fe5;
}

.message-btn {
  background: #e4e6eb;
  color: #050505;
}

.message-btn:hover {
  background: #d8dadf;
}

.stats {
  display: flex;
  justify-content: space-around;
  padding: 1.5rem 0;
  border-top: 1px solid #e4e6eb;
  border-bottom: 1px solid #e4e6eb;
  margin-bottom: 2rem;
}

.stat {
  text-align: center;
}

.number {
  display: block;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.label {
  color: #65676b;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.tab {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  font-weight: 600;
  color: #65676b;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
}

.tab.active {
  color: #1877f2;
  border-bottom-color: #1877f2;
}

.post {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.post-header img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 1rem;
}

.time {
  color: #65676b;
  font-size: 0.9rem;
}

.post-content {
  margin-bottom: 1rem;
}

.post-image {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.post-actions {
  display: flex;
  gap: 1rem;
  border-top: 1px solid #e4e6eb;
  padding-top: 1rem;
}

.post-actions button {
  flex: 1;
  background: none;
  border: none;
  padding: 0.5rem;
  color: #65676b;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  border-radius: 4px;
}

.post-actions button:hover {
  background: #f0f2f5;
}

.post-actions i {
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .profile-photo {
    margin-bottom: 1rem;
  }
  
  .profile-info {
    padding: 1rem 0;
  }
  
  .profile-actions {
    margin-top: 1rem;
  }
}`,
      "script.js": `// Handle tab switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(t => {
      t.classList.remove('active');
    });
    
    // Add active class to clicked tab
    tab.classList.add('active');
    
    // Show corresponding content
    const tabName = tab.dataset.tab;
    document.querySelectorAll('.tab-content > div').forEach(content => {
      content.style.display = 'none';
    });
    document.getElementById(tabName).style.display = 'block';
  });
});

// Handle follow button
const followBtn = document.querySelector('.follow-btn');
let following = false;

followBtn.addEventListener('click', () => {
  following = !following;
  if (following) {
    followBtn.textContent = 'Following';
    followBtn.style.background = '#e4e6eb';
    followBtn.style.color = '#050505';
  } else {
    followBtn.textContent = 'Follow';
    followBtn.style.background = '#1877f2';
    followBtn.style.color = 'white';
  }
});

// Handle post likes
document.querySelectorAll('.post-actions button').forEach(button => {
  let liked = false;
  
  button.addEventListener('click', () => {
    if (button.querySelector('.fa-heart')) {
      liked = !liked;
      const icon = button.querySelector('.fa-heart');
      const count = parseInt(button.textContent.match(/\d+/)[0]);
      
      if (liked) {
        icon.style.color = '#e41e3f';
        button.textContent = button.textContent.replace(count, count + 1);
      } else {
        icon.style.color = '#65676b';
        button.textContent = button.textContent.replace(count, count - 1);
      }
    }
  });
});`,
    },
  },
  "Contact Form": {
    description: "Contact page with form validation",
    tags: ["Form", "Contact", "Business"],
    files: {
      "index.html": `<!DOCTYPE html>
<html>
<head>
  <title>Contact Us</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Contact Us</h1>
    <p class="subtitle">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
    
    <form id="contact-form" novalidate>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>
        <div class="error-message"></div>
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
        <div class="error-message"></div>
      </div>
      
      <div class="form-group">
        <label for="subject">Subject</label>
        <input type="text" id="subject" name="subject" required>
        <div class="error-message"></div>
      </div>
      
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5" required></textarea>
        <div class="error-message"></div>
      </div>
      
      <button type="submit">Send Message</button>
    </form>
    
    <div id="success-message" class="success-message" style="display: none;">
      Thank you for your message! We'll get back to you soon.
    </div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  background: #f5f5f5;
  color: #333;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.container {
  max-width: 600px;
  width: 100%;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1 {
  font-size: 2rem;
  color: #2d3436;
  margin-bottom: 0.5rem;
  text-align: center;
}

.subtitle {
  text-align: center;
  color: #636e72;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2d3436;
  font-weight: 500;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dfe6e9;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #74b9ff;
}

textarea {
  resize: vertical;
}

button {
  width: 100%;
  padding: 1rem;
  background: #74b9ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #0984e3;
}

.error-message {
  color: #d63031;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  min-height: 1.25rem;
}

input.error,
textarea.error {
  border-color: #d63031;
}

.success-message {
  text-align: center;
  color: #00b894;
  padding: 1rem;
  background: #55efc4;
  border-radius: 4px;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  body {
    padding: 1rem;
  }
  
  .container {
    padding: 1.5rem;
  }
  
  h1 {
    font-size: 1.5rem;
  }
  
  p {
    font-size: 1rem;
  }
  
  .actions {
    flex-direction: column;
  }
}`,
      "script.js": `// Form validation
const form = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

// Validation patterns
const patterns = {
  name: /^[a-zA-Z\s]{2,30}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  subject: /^.{2,100}$/,
  message: /^[\s\S]{10,1000}$/
};

// Validation messages
const messages = {
  name: 'Please enter a valid name (2-30 characters)',
  email: 'Please enter a valid email address',
  subject: 'Subject must be between 2 and 100 characters',
  message: 'Message must be between 10 and 1000 characters'
};

// Real-time validation
Object.keys(patterns).forEach(field => {
  const input = document.getElementById(field);
  
  input.addEventListener('input', () => {
    validateField(field, input);
  });
  
  input.addEventListener('blur', () => {
    validateField(field, input);
  });
});

function validateField(field, input) {
  const pattern = patterns[field];
  const errorElement = input.nextElementSibling;
  
  if (!pattern.test(input.value)) {
    input.classList.add('error');
    errorElement.textContent = messages[field];
    return false;
  } else {
    input.classList.remove('error');
    errorElement.textContent = '';
    return true;
  }
}

// Form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Validate all fields
  let isValid = true;
  Object.keys(patterns).forEach(field => {
    const input = document.getElementById(field);
    if (!validateField(field, input)) {
      isValid = false;
    }
  });
  
  if (isValid) {
    // Simulate form submission
    form.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Reset form
    form.reset();
    setTimeout(() => {
      form.style.display = 'block';
      successMessage.style.display = 'none';
    }, 3000);
  }
});`,
    },
  },
  "404 Page": {
    description: "Creative 404 error page",
    tags: ["Error", "404", "UI"],
    files: {
      "index.html": `<!DOCTYPE html>
<html>
<head>
  <title>404 - Page Not Found</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <div class="error-code">404</div>
    <div class="astronaut">
      <img src="https://source.unsplash.com/random/400x400/?astronaut" alt="Lost Astronaut">
    </div>
    <h1>Houston, we have a problem!</h1>
    <p>The page you're looking for seems to have drifted into space...</p>
    <div class="actions">
      <button onclick="window.history.back()">Go Back</button>
      <button onclick="window.location.href='/'">Home Page</button>
    </div>
    <div class="stars"></div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  background: #1a1a2e;
  color: white;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.container {
  text-align: center;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.error-code {
  font-size: 15rem;
  font-weight: bold;
  line-height: 1;
  background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  animation: float 6s ease-in-out infinite;
}

.astronaut {
  width: 200px;
  height: 200px;
  margin: 0 auto 2rem;
  animation: float 4s ease-in-out infinite;
}

.astronaut img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(79, 172, 254, 0.5);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  animation: float 5s ease-in-out infinite;
}

p {
  font-size: 1.2rem;
  color: #a0a0a0;
  margin-bottom: 2rem;
  animation: float 5.5s ease-in-out infinite;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  animation: float 5s ease-in-out infinite;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.3s;
}

button:hover {
  transform: scale(1.05);
}

.stars {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .error-code {
    font-size: 8rem;
  }
  
  .astronaut {
    width: 150px;
    height: 150px;
  }
  
  h1 {
    font-size: 1.8rem;
  }
  
  p {
    font-size: 1rem;
  }
  
  .actions {
    flex-direction: column;
  }
}`,
      "script.js": `// Create stars
function createStars() {
  const stars = document.querySelector('.stars');
  const count = 200;
  
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.style.position = 'absolute';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.width = Math.random() * 3 + 'px';
    star.style.height = star.style.width;
    star.style.backgroundColor = 'white';
    star.style.borderRadius = '50%';
    star.style.opacity = Math.random();
    star.style.animation = 'twinkle ' + (Math.random() * 4 + 2) + 's infinite';
    
    stars.appendChild(star);
  }
}

// Add twinkling animation
const style = document.createElement('style');
style.textContent = \`
  @keyframes twinkle {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
\`;
document.head.appendChild(style);

// Initialize stars
createStars();

// Add parallax effect
document.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  const moveX = (clientX - centerX) / 50;
  const moveY = (clientY - centerY) / 50;
  
  document.querySelector('.error-code').style.transform = 
    \`translate(\${moveX}px, \${moveY}px)\`;
  
  document.querySelector('.astronaut').style.transform = 
    \`translate(\${-moveX}px, \${-moveY}px)\`;
});`,
    },
  },
  "Coming Soon": {
    description: "Countdown page indicating upcoming launches",
    tags: ["Landing", "Timer", "UI"],
    files: {
      "index.html": `<!DOCTYPE html>
<html>
<head>
  <title>Coming Soon</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Something Amazing is Coming</h1>
    <p class="subtitle">We're working hard to bring you something extraordinary. Stay tuned!</p>
    
    <div class="countdown">
      <div class="countdown-item">
        <span id="days">00</span>
        <span class="label">Days</span>
      </div>
      <div class="countdown-item">
        <span id="hours">00</span>
        <span class="label">Hours</span>
      </div>
      <div class="countdown-item">
        <span id="minutes">00</span>
        <span class="label">Minutes</span>
      </div>
      <div class="countdown-item">
        <span id="seconds">00</span>
        <span class="label">Seconds</span>
      </div>
    </div>
    
    <form id="notify-form" class="notify-form">
      <input type="email" placeholder="Enter your email for updates" required>
      <button type="submit">Notify Me</button>
    </form>
    
    <div class="social-links">
      <a href="#" class="social-link">Twitter</a>
      <a href="#" class="social-link">Instagram</a>
      <a href="#" class="social-link">Facebook</a>
    </div>
  </div>
  
  <div class="background">
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    <div class="shape shape-3"></div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  background: #0f0c29;
  background: linear-gradient(135deg, #24243e, #302b63, #0f0c29);
  color: white;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.container {
  text-align: center;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;
}

.countdown {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.countdown-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  min-width: 120px;
}

.countdown-item span {
  display: block;
}

.countdown-item span:first-child {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.label {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.8;
}

.notify-form {
  max-width: 500px;
  margin: 0 auto 3rem;
  display: flex;
  gap: 1rem;
}

input {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(10px);
}

input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.3s;
}

button:hover {
  transform: scale(1.05);
}

.social-links {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.social-link {
  color: white;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.social-link:hover {
  opacity: 1;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.3;
  animation: float 20s infinite;
}

.shape-1 {
  background: #ff6b6b;
  width: 600px;
  height: 600px;
  top: -300px;
  left: -300px;
}

.shape-2 {
  background: #feca57;
  width: 400px;
  height: 400px;
  top: 50%;
  right: -200px;
  animation-delay: -5s;
}

.shape-3 {
  background: #48dbfb;
  width: 500px;
  height: 500px;
  bottom: -250px;
  left: 50%;
  transform: translateX(-50%);
  animation-delay: -10s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(50px, 50px);
  }
  50% {
    transform: translate(0, 100px);
  }
  75% {
    transform: translate(-50px, 50px);
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  
  .countdown {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .countdown-item {
    min-width: 100px;
    padding: 1rem;
  }
  
  .countdown-item span:first-child {
    font-size: 2rem;
  }
  
  .notify-form {
    flex-direction: column;
  }
  
  button {
    width: 100%;
  }
}`,
      "script.js": `// Set the launch date (1 month from now)
const launchDate = new Date();
launchDate.setMonth(launchDate.getMonth() + 1);

// Update countdown
function updateCountdown() {
  const now = new Date();
  const distance = launchDate - now;
  
  // Calculate time units
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  // Update DOM
  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  
  // If countdown is finished
  if (distance < 0) {
    clearInterval(countdownInterval);
    document.querySelector('.countdown').innerHTML = '<h2>We\'re Live!</h2>';
  }
}

// Update countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Handle form submission
const form = document.getElementById('notify-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input').value;
  
  // Simulate form submission
  const button = e.target.querySelector('button');
  const originalText = button.textContent;
  button.textContent = 'Thanks!';
  button.disabled = true;
  
  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
    e.target.reset();
  }, 2000);
});

// Animate background shapes on mousemove
document.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  const moveX = (clientX - centerX) / 50;
  const moveY = (clientY - centerY) / 50;
  
  document.querySelectorAll('.shape').forEach(shape => {
    const shapeX = moveX * (Math.random() + 0.2);
    const shapeY = moveY * (Math.random() + 0.2);
    shape.style.transform = \`translate(\${shapeX}px, \${shapeY}px)\`;
  });
});`,
    },
  }
}
