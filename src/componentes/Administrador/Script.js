document.addEventListener('DOMContentLoaded', function () {
    const sidebarToggle = document.querySelector("#sidebar-toggle");
    sidebarToggle.addEventListener("click", function () {
        document.querySelector("#sidebar").classList.toggle("collapsed");
    });
});

document.querySelector(".theme-toggle").addEventListener("click", () => {
    toggleLacalStorage();
    toggleRootClass();
})

function toggleRootClass() {
    const current = document.documentElement.getAttribute('data-bstheme');
    const inverted = current == 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', inverted);
}

function toggleLacalStorage() {
    if (isLight()) {
        localStorage.removeItem("light");
    } else {
        localStorage.setItem("light", "set");
    }
}

function isLight() {
    return localStorage.getItem("light");
}

if (isLight()) {
    toggleRootClass();
}