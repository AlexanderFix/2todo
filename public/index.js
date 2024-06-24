

let tasks = document.querySelectorAll('.tasks')



function del (params) {
    fetch('/delete-item', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: params })
        })
            .then(response => response.text())
}
// document.getElementById('deleteButton').addEventListener('click', function () {
//     const itemId = prompt('Enter the ID of the item to delete:');
//     fetch('/delete-item', {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ id: itemId })
//     })
//         .then(response => response.text())
// });