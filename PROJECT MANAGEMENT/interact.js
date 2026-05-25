// Initialize projects from localStorage
let projects = JSON.parse(localStorage.getItem('projects')) || [];

// DOM Elements
const projectList = document.getElementById('projectList');
const projectInput = document.getElementById('projectName');
const addBtn = document.getElementById('addBtn');

// Display projects on page load
document.addEventListener('DOMContentLoaded', () => {
    displayProjects();
});

// Add project event listener
if (addBtn) {
    addBtn.addEventListener('click', addProject);
    projectInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addProject();
        }
    });
}

// Add new project
function addProject() {
    const projectName = projectInput.value.trim();

    if (projectName === '') {
        alert('Please enter a project name');
        return;
    }

    const project = {
        id: Date.now(),
        name: projectName,
        date: new Date().toLocaleDateString()
    };

    projects.push(project);
    saveProjects();
    displayProjects();
    projectInput.value = '';
    projectInput.focus();
}

// Display all projects
function displayProjects() {
    if (!projectList) return;

    projectList.innerHTML = '';

    if (projects.length === 0) {
        projectList.innerHTML = '<p class="empty-state">No projects yet. Create one to get started!</p>';
        return;
    }

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <h4>${project.name}</h4>
            <p>Created: ${project.date}</p>
            <button class="delete-btn" onclick="deleteProject(${project.id})">Delete</button>
        `;
        projectList.appendChild(projectCard);
    });
}

// Delete project
function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        projects = projects.filter(project => project.id !== id);
        saveProjects();
        displayProjects();
    }
}

// Save projects to localStorage
function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}
