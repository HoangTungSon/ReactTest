import api from './api';

function insertItem(item) {
    if (item == null || item == undefined) {
        return;
    }
    let url = `http://localhost:3001/items`;
    let body = {
        name: item.name,
        hobby: item.hobby,
        job: item.job,
        country: item.country
    }

    return api(url, body, 'POST')
}


function updateItem(item) {
    if (item == null || item == undefined) {
        return;
    }
    let url = `http://localhost:3001/items/${encodeURIComponent(item.id)}`;
    let body = {
        name: item.name,
        hobby: item.hobby,
        job: item.job,
        country: item.country
    }

    api(url, body, 'PUT');
}

function deleteItem(id) {
    if (id == null || id == undefined) {
        return;
    }
    let url = `http://localhost:3001/items/${encodeURIComponent(id)}`;
    let body = {}

    api(url, body, 'DELETE');
}

export { insertItem, updateItem, deleteItem }

