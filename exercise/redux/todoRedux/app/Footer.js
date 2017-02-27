import React from 'react';

class Footer extends React.Component{
    render() {
        return (
            <p>
                show: {' '}
                <a href="#" onClick={this.handleClick}>All</a> {' '}
                <a href="#" onClick={this.handleClick}>Completed</a> {' '}
                <a href="#" onClick={this.handleClick}>Active</a>
            </p>

        )


    }

    handleClick = (e) => {
        e.preventDefault();
        this.props.onFilterChange(this.props.filter);
    }
}

Footer.propTypes = {
    onFilterChange: React.PropTypes.func.isRequired,
    filter: React.PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired,
};

export default Footer;
