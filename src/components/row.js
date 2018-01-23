/**
 * Created by ahsan.zaman on 06/11/2017.
 */
import React, {Component} from 'react';


export default class Row extends Component {
    renderDate = (ISO) =>{
        const timeStr = ISO;
        const date = new Date(timeStr);
        const day = date.getDate();
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const dateString = month+"/"+day+"/"+year;
        return dateString;

    }
    render() {
        const {user,showHandler,renderUnits} = this.props;

        return (
            <tr>
                <td>{user.name}</td>
                <td>{user.height} {renderUnits(user.height,'cm')}</td>
                <td>{user.mass} {renderUnits(user.mass,'kg')}</td>
                <td>{this.renderDate(user.created)}</td>
                <td>{this.renderDate(user.edited)}</td>
                <td><button className='btn btn-success' data-toggle="modal" data-target="#planetModal" onClick={()=>showHandler(user.homeworld)}>view</button></td>
            </tr>
        )
    }
}
