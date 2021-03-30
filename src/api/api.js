export default async function api(url, body, method) {
    return new Promise((resolve, reject) => {
        if (url == null || url == undefined) {
            return;
        }
        const requestOptions = {
            method: method,
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
            },
            body: body != null ? JSON.stringify(body): null
        }
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
                console.log(error);
            })
    })

}