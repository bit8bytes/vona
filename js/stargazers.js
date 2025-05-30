async function fetchStargazers() {
    const elements = document.querySelectorAll('[i-fetch-stargazers][data-repo]');
    
    if (elements.length === 0) return;
    
    elements.forEach(async (element) => {
        const repo = element.getAttribute('data-repo');
        
        if (!repo) return;
        const [owner, name] = repo.split('/');
        if (!owner || !name) return;
    
        const response = await fetch(`https://api.github.com/repos/${owner}/${name}`);    
        if (!response.ok) throw new Error(`Repository not found: ${response.status}`);
        
        const data = await response.json();
        element.textContent = data.stargazers_count.toLocaleString();           
    });
}

document.addEventListener('DOMContentLoaded', fetchStargazers);