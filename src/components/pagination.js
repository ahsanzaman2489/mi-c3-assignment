import React, {Component} from 'react';
import {Link} from 'react-router';

class Pagination extends Component {
    extractPages(props) {

        const {currentPage,totalPages} = props;
        const lists = [];
        for (let i = 1; i <= totalPages; i++) {
            lists.push(
                <li key={i} className={currentPage === i
                    ? 'active'
                    : ''}>
                    <Link to={`/page/${i}`}>{i}</Link>
                </li>
            )
        }

        return lists;
    }


    render() {
        const {currentPage, itemPerPage, totalItems, totalPages,currentItems} = this.props.options;

        return (
            <div>
                <ul className="pagination">
                    {currentPage > 1 && <li>
                        <Link to={`/page/${currentPage - 1}`} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </Link>
                    </li>}

                    {currentPage === 1 && <li className='disabled'>
                        <span aria-hidden="true">&laquo;</span>
                    </li>}

                    {this.extractPages(this.props.options)}

                    {currentPage < totalPages && <li>
                        <Link to={`/page/${currentPage + 1}`} aria-label="Previous">
                            <span aria-hidden="true">&raquo;</span>
                        </Link>
                    </li>}

                    {currentPage === totalPages && <li className='disabled'>
                        <span aria-hidden="true">&raquo;</span>
                    </li>}

                </ul>

                <span className="pagination-counter"> showing: {((currentPage - 1) * itemPerPage) + currentItems}
                    &nbsp;/ {totalItems}</span>
            </div>
        )
    }

}

export default Pagination;
