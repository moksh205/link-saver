document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const cards = document.querySelectorAll('.link-card');
    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(query) ? 'block' : 'none';
    });
});

document.getElementById('addLinkButton').addEventListener('click', function() {
    const title = document.getElementById('linkTitle').value.trim();
    const url = document.getElementById('linkURL').value.trim();
    const description = document.getElementById('linkDescription').value.trim();

    if (title && url && description) {
        const linkGrid = document.getElementById('linkGrid');
        const linkCard = document.createElement('div');
        linkCard.className = 'link-card';

        linkCard.innerHTML = `
            <span class="remove-link" onclick="removeLink(event)">&#10005;</span>
            <a href="${url}" target="_blank">${title}</a>
            <p>${description}</p>
        `;

        linkGrid.appendChild(linkCard);

        const storedLinks = JSON.parse(localStorage.getItem('links')) || [];
        storedLinks.push({ title, url, description });
        localStorage.setItem('links', JSON.stringify(storedLinks));

        document.getElementById('linkTitle').value = '';
        document.getElementById('linkURL').value = '';
        document.getElementById('linkDescription').value = '';
    } else {
        alert('Please enter a title, URL, and description.');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const storedLinks = JSON.parse(localStorage.getItem('links')) || [];
    const linkGrid = document.getElementById('linkGrid');

    storedLinks.forEach(link => {
        const linkCard = document.createElement('div');
        linkCard.className = 'link-card';

        linkCard.innerHTML = `
            <span class="remove-link" onclick="removeLink(event)">&#10005;</span>
            <a href="${link.url}" target="_blank">${link.title}</a>
            <p>${link.description}</p>
        `;

        linkGrid.appendChild(linkCard);
    });
});

function removeLink(event) {
    const linkCard = event.target.closest('.link-card');
    linkCard.remove();

    // Remove the link from localStorage after deletion
    const storedLinks = JSON.parse(localStorage.getItem('links')) || [];
    const updatedLinks = storedLinks.filter(link => link.url !== event.target.closest('.link-card').querySelector('a').href);
    localStorage.setItem('links', JSON.stringify(updatedLinks));
}
