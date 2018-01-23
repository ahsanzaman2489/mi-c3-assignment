import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
import Actions from '../actions';
import {connect} from 'react-redux';
import Row from './row';
import Pagination from './pagination';
import Modal from './modal';


class Table extends Component {

    constructor() {
        super();
        this.state = {
           showModal:false,
           sortedIndex : 0
        }
    }

    showModalHandler = (api)=>{
        this.setState({
            ...this.setState,
            showModal:true,
            currentApiCall:api
        });

        if(this.state.currentApiCall !== api){
            this.props.actions.planet.START_FETCHING_PLANET({isLoading:true});
                fetch(api).then((response => {
                    return response.json()
                })).then(data => {
                    this.props.actions.planet.FETCH_PLANET({data,isLoading:false});
            });
         }
    }

    hideModalHandler = ()=>{
        this.setState({
            ...this.setState,
            showModal:false
        });
    }

    renderUnits = (value , unit) => {
        if(value === 'unknown') return '';
        else { return unit}
    }

    componentDidMount = () => {
       
        this.listen = this.props.history.listen((location, action) => {
            this.setState({
                currentSort:null,
            })

            this.props.actions.users.START_FETCHING_USERS({isLoading:true});

            
            fetch('https://swapi.co/api/people/?page=' + action.params.page + '').then((response => {
                return response.json()
            })).then(usersData => {
                const pagination = {
                    itemPerPage: 10,
                    currentPage: parseInt(this.props.params.page,10),
                    totalItems: usersData.count,
                    totalPages: this.getTotalPages(usersData.count, 10),
                    currentItems: usersData.results.length,
                };
                
                this.props.actions.users.FETCH_USERS({usersData,pagination});
            });
        });
    }


    componentWillUnmount() {
        this.listen();
    }

    getTotalPages(totalItems, itemPerPage) {
        if (totalItems % itemPerPage === 0) {
            return totalItems / itemPerPage;
        } else {
            return parseInt(totalItems / itemPerPage,10) + 1;
        }
    }

    sortFunction = (filter)=>{
        switch(filter){
            case "name":
               return (a,b)=>{
                if(a[filter] === 'unknown'){
                    return 1;
                }
                else if(b[filter] === 'unknown'){
                        return -1;
                }
                if(b[filter] < a[filter]) return -1;
                if(b[filter] > a[filter]) return 1;
                return 0;    
               }  
               
            case "height":
            case "mass":
            
                return (a,b)=>{
                        if(a[filter] === 'unknown'){
                            return 1;
                        }
                        else if(b[filter] === 'unknown'){
                             return -1;
                        }
                    return b[filter] - a[filter];
                }

            case "created":
            case "edited":
            return (a,b)=>{
                if(a[filter] === 'unknown'){
                    return 1;
                }
                else if(b[filter] === 'unknown'){
                        return -1;
                }
                const date1 = Date.parse(a[filter]);
                const date2 = Date.parse(b[filter]);
                return date2 - date1;
            }

            default:
            return;
        } 
    }

    sort=(event)=>{
        event.preventDefault();
        const $el = $(event.currentTarget).closest('th');
        const filter = $el.attr('name');
        const indicator = $(event.currentTarget);
        const sortDirection = indicator.attr('class');
        const array = this.props.data.usersData.results;
        
        if(indicator.hasClass('desc')){
            indicator.removeClass('desc').addClass('asc');
        }else{
            indicator.removeClass('asc').addClass('desc');
        }

        this.setState({
            currentSort:filter,
        })

        if(this.state.currentSort === filter){
            array.reverse();
        }else{
            array.sort(this.sortFunction(filter));
           if(sortDirection === 'asc'){
             array.reverse();
           }
        }
       
    }
    render() {
        const {data,planet} = this.props;
        const users = data.usersData;
        const pagination = data.pagination;
        const isLoading = data.isLoading;
        

        return (
            <div>
                {isLoading && <div className="screen-loader"><img src="./assets/spinner.gif" alt="loading"/></div>}
                <h1>Users</h1>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th name='name'>Name <i className='desc' onClick={this.sort}></i></th>
                        <th name='height'>Height <i className='desc' onClick={this.sort}></i></th>
                        <th name='mass'>Mass <i className='desc' onClick={this.sort}></i></th>
                        <th name='created'>Created <i className='desc' onClick={this.sort}></i></th>
                        <th name='edited'>Edited <i className='desc' onClick={this.sort}></i></th>
                        <th>Planet</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users!== undefined && users.results.map((item, index) => {
                        return (<Row key={index} user={item} showHandler={this.showModalHandler} renderUnits={this.renderUnits}/>)
                    })}
                    </tbody>
                </table>
                {pagination!== undefined && <Pagination options={pagination}  history={this.props.history}/>}
                {this.state.showModal && planet && <Modal planetDetails={planet} hideHandler={this.hideModalHandler} renderUnits={this.renderUnits}/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {data: state.users,planet:state.planet};
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            users: bindActionCreators(Actions.users, dispatch),
            planet:bindActionCreators(Actions.planet, dispatch)
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
