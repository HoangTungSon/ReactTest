import { Container, Button, Row, Col, Tab, ListGroup } from "react-bootstrap";
import { updateItem, deleteItem } from "../api/apiItem";
import { useHistory } from "react-router-dom";
import api from "../api/api";

export default function ItemResult(props) {
    const history = useHistory();

    const handleUpdate = (id) => {
        history.push('/home/' + id);
    }

    const handleDelete = (id) => {
        deleteItem(id);
        props.refreshData("");
    }
    
    return (
        <Container fluid>
            <Tab.Container>
                {props.itemList.map(item => (
                    <Row key={item.id} className='row-item'>
                        <Col sm={8} className='col-name'>
                            <ListGroup>
                                <ListGroup.Item action>
                                    {item.name}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col sm={4}>
                            <Button variant="success" className='btn-update' onClick={() => handleUpdate(item.id)}>Update</Button>
                            <Button variant="danger" className='btn-delete' onClick={() => handleDelete(item.id)}>Delete</Button>
                        </Col>
                    </Row>
                ))}
            </Tab.Container>
        </Container>

    );
}