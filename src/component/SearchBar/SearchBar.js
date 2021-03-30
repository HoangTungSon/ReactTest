import React, { Component } from "react";

export default class SearchBar extends Component {
    handleChange = event => {
        this.props.textChange(event);
    };

    render() {
        return (
            <div className='component-search-input'>
                <div>
                    <input onChange={this.handleChange} />
                </div>
            </div>
        )
    }
}