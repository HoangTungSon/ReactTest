import React, { Component, useState, useEffect } from 'react';

export default function Users() {
    const [contacts, setContacts] = useState([]);
    const controller = new AbortController();

    useEffect(() => {
        fetch('http://localhost:3001/items')
            .then(res => res.json())
            .then((data) => {
                setContacts(data);
            })
            .catch(console.log);

        return function cleanup() {
            controller.abort();
        }
    }, [])

    return (
        <div>
            <center><h1>Contact List</h1></center>
            {contacts.map((contact) => (
                <div className="card" key={contact.id}>
                    <div className="card-body">
                        <h5 className="card-title">{contact.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{contact.hobby}</h6>
                        <p className="card-text">{contact.job}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
