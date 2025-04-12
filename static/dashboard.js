  // DOM Elements
  const DOM = {
    element(id) {
        return document.getElementById(id);
    },
    elements(selector) {
        return document.querySelectorAll(selector);
    },
    projectGrid() {
        return this.element('projectGrid');
    },
    loadingSpinner() {
        return this.element('loadingSpinner');
    }
};

// State Management
class DashboardState {
    static #instance = null;
    static getInstance() {
        if (!this.#instance) {
            this.#instance = new DashboardState();
        }
        return this.#instance;
    }

    constructor() {
        this.projects = [];
        this.isLoading = false;
        this.error = null;
    }

    updateProjects(projects) {
        this.projects = projects;
        this.updateUI();
    }

    setLoading(loading) {
        this.isLoading = loading;
        this.updateUI();
    }

    setError(error) {
        this.error = error;
        this.updateUI();
    }

    updateUI() {
        if (this.isLoading) {
            DOM.loadingSpinner().style.display = 'block';
        } else {
            DOM.loadingSpinner().style.display = 'none';
        }

        if (this.error) {
            UI.showNotification(this.error, 'error');
        }
    }
}

// UI Components
class UI {
    static showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 5000);
        }, 100);
    }

    static updateProjectGrid(projects) {
        const grid = DOM.projectGrid();
        if (!grid) return;

        grid.innerHTML = '';

        if (projects.length === 0) {
            grid.innerHTML = this.createNoProjectsMessage();
            return;
        }

        projects.forEach(project => {
            const card = this.createProjectCard(project);
            grid.appendChild(card);
        });

        this.updateProjectCount(projects.length);
    }

    static createNoProjectsMessage() {
        return `
            <div class="no-projects">
                <i class="fas fa-folder-open"></i>
                <h3>No Projects Yet</h3>
                <p>Start a new project to get things rolling!</p>
                <button class="action-btn" onclick="ProjectActions.create()">
                    <i class="fas fa-plus"></i> Create Project
                </button>
            </div>
        `;
    }

    static createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-header">
                <h3 class="project-title">${project.name}</h3>
                <div class="project-meta">
                    <span class="project-date">${project.created_at}</span>
                    <span class="project-status ${project.status}">${project.status}</span>
                </div>
            </div>
            <div class="project-card-actions">
                <a href="/projects/dev_environment/" class="project-card-action-btn">
                    <i class="fas fa-eye"></i> View
                </a>
                <a href="/projects/dev_environment/" class="project-card-action-btn">
                    <i class="fas fa-edit"></i> Edit
                </a>
                <button class="delete-project-btn" onclick="deleteProject('${project.id}')">
                    <i class="fas fa-trash"></i>
                    Delete Project
                    <div class="spinner"></div>
                </button>
            </div>
        `;
        return card;
    }
}