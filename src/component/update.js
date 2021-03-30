import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { updateItem, insertItem } from "../api/apiItem";
import api from "../api/api";

export default function Update(props) {
    const [item, setItem] = useState({
        item: {
            id: 0,
            name: "",
            hobby: "",
            job: "",
            country: "",
        }
    })

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (id == 0) {
            return;
        }
        api(`http://localhost:3001/items/${encodeURIComponent(id)}`, null, "GET")
            .then(data => setItem(data))
            .catch(error => console.log(error))
    }, [])

    const handleSubmit = event => {
        if (id == 0) {
            insertItem(item);
        } else
            updateItem(item);
        history.push('/home');
    }

    const handleTextChange = event => {
        setItem(state => ({ ...state, [event.target.name]: event.target.value }));
    }

    const goBack = () =>{
        history.goBack();
    }

    return (
        <Container fluid>
            <div>
                <Button onClick={goBack}>Back</Button>
            </div>
            <form onSubmit={handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name='name' className="form-control" value={item.name} onChange={handleTextChange} />
                </div>

                <div className="form-group">
                    <label>hobby</label>
                    <input type="text" name='hobby' className="form-control" value={item.hobby} onChange={handleTextChange} />
                </div>

                <div className="form-group">
                    <label>job</label>
                    <input type="text" name='job' className="form-control" value={item.job} onChange={handleTextChange} />
                </div>

                <div className="form-group">
                    <label>country</label>
                    <input type="text" name='country' className="form-control" value={item.country} onChange={handleTextChange} />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        </Container>
    )
}