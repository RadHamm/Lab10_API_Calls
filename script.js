document.getElementById('fetchWithFetch').addEventListener('click', function() {
    
document.getElementById('dataContainer').innerHTML = '';
document.getElementById('errorMessage').style.display = 'none'; 

    fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        displayData(data);
    })

    .catch(error => console.error('Error fetching data:', error.message));
});

function displayData(data) {
    const dataContainer = document.getElementById('dataContainer');
    const dataHTML = 
    `
    <h3>Title: ${data.title}</h3>
    <p>Body: ${data.body}</p>
    `;
    dataContainer.innerHTML = dataHTML;
}
document.getElementById('XMLHttpRequest').addEventListener('click', function() {
    document.getElementById('dataContainer').innerHTML = '';
    document.getElementById('errorMessage').style.display = 'none';


const xhr = new XMLHttpRequest();

xhr.open('GET','https://jsonplaceholder.typicode.com/posts/2', true);

xhr.onload = function() {
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
        displayData(data);
    } else {
        handleError(`Error: ${xhr.statusText}`);
    }
};
xhr.onerror = function() {
    handleError('Network Error', 'Network Error');
};
xhr.send();
});

document.getElementById('apiForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

if (title.trim() === '' || body.trim() === '') {
    handleError('Input Error', 'Title and body must have text');
    return;
}


    document.getElementById('responseMessage').innerHTML = '';
    document.getElementById('errorMessage').style.display = 'none';

const postData = {
    title: title,
    body: body,
    userId: 1
};

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
})
.then(response => {
    if(!response.ok) {
        throw new Error ('Server Error: ' + response.statusText);
    }
    return response.json();
})
.then(data => {
    document.getElementById('responseMessage').innerHTML = 
    `
    <h3>Post Created Successfully</h3>
    <p>Title: ${data.title}</p>
    <p>Body: ${data.body}</p>
    `;
})
.catch(error => {
    handleError('Server Error', error.message);
});
});

document.getElementById('putButton').addEventListener('click', function() {
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const postId = document.getElementById('postId').value;

    

    document.getElementById('responseMessage').innerHTML = '';
    document.getElementById('errorMessage').style.display = 'none';

    const putData = {
        title: title,
        body: body,
        userId: 1
    };

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${postId}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);

            document.getElementById('responseMessage').innerHTML = `
                <h3>Post Updated Successfully</h3>
                <p>Title: ${responseData.title}</p>
                <p>Body: ${responseData.body}</p>
            `;
        } else {
            
            handleError('Server Error', `Error updating data: ${xhr.statusText}`);

        }
    };

    xhr.onerror = function() {
        handleError('Network Error', 'Network error occured');
    };

    xhr.send(JSON.stringify(putData));
});

document.getElementById('deleteButton').addEventListener('click', function() {
    const postId = 1; 


    document.getElementById('responseMessage').innerHTML = '';
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('deleteButton').disabled = true;

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete the post');
        }

        document.getElementById('responseMessage').innerHTML = `
            <h3>Post Deleted Successfully</h3>
            <p>Post with ID ${postId} has been deleted.</p>
        `;
    })
    .catch(error => {
        handleError('Server Error', error.message);
    })
    .finally(() => {
        document.getElementById('deleteButton').disabled = false;
    });
});



function handleError(type, message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.style.display = 'block';
    errorMessage.classList.remove('server-error', 'network-error', 'input-error');

    if (type === 'Input Error') {
        errorMessage.classList.add('input-error');
        errorMessage.textContent = message;
    } else if (type === 'Network Error') {
        errorMessage.classList.add('network-error');
        errorMessage.textContent = message;
    } else if (type === 'Server Error') {
        errorMessage.classList.add('server-error');
        errorMessage.textContent = message;
    } 
}