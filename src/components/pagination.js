import React, {Component} from 'react';
import {Link} from 'react-router';

class Pagination extends Component {
    extractPages(props) {
        const {currentPage, totalPages, totalItems, itemPerPage} = props;
        const lists = [];
        if (itemPerPage >= totalItems) return;
        for (let i = 1; i <= totalPages; i++) {

            lists.push(
                <li key={i} className={currentPage === i
                    ? 'active'
                    : ''}>
                    {currentPage === i ? <a href="javascript:void(0)">{i}</a> :
                        <Link to={this.createQuery(i)}>{i}</Link>}
                </li>
            )
        }

        return lists;
    }

    createQuery = (page) => {

        const search = this.props.location.query.search ? "&search=" + this.props.location.query.search : "";
        const pages = "/?page=" + page;

        return "/users" + pages + search;
    }

    render() {
        const {currentPage, itemPerPage, totalItems, totalPages, currentItems} = this.props.options;

        return (
            <div>
                {currentItems !== 0 ? < ul className="pagination">
                    {currentPage > 1 && <li>
                        <Link to={this.createQuery(currentPage - 1)} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </Link>
                    </li>}

                    {currentPage === 1 || totalItems < itemPerPage && <li className='disabled'>
                        <span aria-hidden="true">&laquo;</span>
                    </li>}

                    {this.extractPages(this.props.options)}

                    {currentPage < totalPages && <li>
                        <Link to={this.createQuery(currentPage + 1)} aria-label="Previous">
                            <span aria-hidden="true">&raquo;</span>
                        </Link>
                    </li>}

                    {currentPage === totalPages || totalItems < itemPerPage && <li className='disabled'>
                        <span aria-hidden="true">&raquo;</span>
                    </li>}
                </ul> : "No Data"}

                {currentItems !== 0 &&
                <span className="pagination-counter"> showing: {((currentPage - 1) * itemPerPage) + currentItems}
                    &nbsp;/ {totalItems}</span>}
            </div>
        )
    }

}

export default Pagination;
