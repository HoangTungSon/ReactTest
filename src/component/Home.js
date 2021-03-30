import SearchBar from './SearchBar/SearchBar';
import { Component } from 'react';
import ItemResult from './ItemResult';
import Update from './update';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import api from '../api/api';
import { Container, Col, Row } from 'react-bootstrap';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: [],
            loading: false,
            page: 0,
            prevY: 0
        }
        this.refreshData = this.refreshData.bind(this);
    }

    handleSearchChange = event => {
        if (event == null)
            return;
        const id = event == null ? '' : event.target.value;
        this.refreshData(id);
    }

    handleLogOut() {
        localStorage.removeItem('accessToken');
    }

    refreshData(id) {
        api(`http://localhost:3001/items/${encodeURIComponent(id)}`, null, 'GET')
            .then(data => {
                if (data.length > 1) {
                    this.setState({
                        itemList: data,
                    });
                }
                else {
                    console.log(data);

                    this.setState({
                        itemList: [data],
                    });
                }
            })
            .catch(error => {
                console.log(error);

                this.setState({
                    itemList: [],
                });
            })
    }

    getPhotos(page) {

        let firstNumber = 0;
        let lastNumber = 10;
        if (page > 1) {
            firstNumber = 10 * page - 10;
            lastNumber = firstNumber + 10;
        }

        api(`http://localhost:3001/items?firstNumber=${encodeURIComponent(firstNumber)}&lastNumber=${encodeURIComponent(lastNumber)}`, null, 'GET')
            .then(data => {
                console.log("before: ", this.state.itemList);
                
                this.setState({
                    itemList: [...this.state.itemList, ...data],
                    loading: false,
                });

                console.log("after: ", this.state.itemList);
                
            })
            .catch(error => {
                console.log(error);

                this.setState({
                    itemList: [],
                });
            })
    }

    componentDidMount() {
        this.getPhotos(this.state.page);
        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };

        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
            let page = this.state.page + 1
            this.getPhotos(page);
            this.setState({ page: page});
        }
        this.setState({ prevY: y });
    }

    render() {
        // Additional css
        const loadingCSS = {
            height: "100px",
            margin: "30px"
        };

        // To change the loading icon behavior
        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light header-home">
                    <div className="container">
                        <Link className="navbar-brand" to={`/home`}>Home</Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to='/sign-in' onClick={this.handleLogOut}>Log Out</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Switch>
                    <Route path={`/home/:id`}>
                        <Update />
                    </Route>
                    <Route path={'/home'}>
                        <div>
                            <div>
                                <Link to="/home/0">Create New</Link>
                                <SearchBar textChange={this.handleSearchChange} />
                            </div>
                            <div>
                                {/* <ItemResult itemList={this.state.itemList != [] ? this.state.itemList : null} refreshData={this.refreshData} /> */}
                                <div className="container">
                                    <div style={{ minHeight: "800px" }}>
                                        {this.state.itemList.map(item => (
                                            <h2 key={item.id}>{item.name}</h2>
                                        ))}
                                    </div>
                                    <div
                                        ref={loadingRef => (this.loadingRef = loadingRef)}
                                        style={loadingCSS}
                                    >
                                        <span style={loadingTextCSS}>Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Route>
                </Switch>
            </div>
        )
    }
}