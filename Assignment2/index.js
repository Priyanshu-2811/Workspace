document.getElementById('fetch-post').addEventListener('click', fetchPosts);

function fetchPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then(users => {
                    const postContainer = document.getElementById('post-container');
                    postContainer.innerHTML = ''; 
                    posts.forEach(post => {
                        const user = users.find(user => user.id === post.userId);
                        const postElement = document.createElement('div');
                        postElement.classList.add('post');
                        postElement.innerHTML = `
                            <h2>${post.title}</h2>
                            <p>${post.body}</p>
                            <p><strong>User:</strong> ${user.name}</p>
                            <p><strong>Email:</strong> ${user.email}</p>
                        `;
                        postContainer.appendChild(postElement);
                    });
                });
        })
        .catch(error => console.error('Error fetching posts:', error));
}