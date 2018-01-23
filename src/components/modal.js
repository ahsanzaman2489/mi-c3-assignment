import React, {Component} from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import 'bootstrap';


class Modal extends Component {
    componentDidMount(){
        $(ReactDom.findDOMNode(this)).modal('show');
        $(ReactDom.findDOMNode(this)).on('hidden.bs.modal',  this.props.hideHandler);
    }
    render() {    
        const {planetDetails,renderUnits} = this.props;
        const planet = planetDetails.data;
        return (
            <div className="modal fade" id="planetModal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">Planet Details</h4>
                        </div>
                        <div className="modal-body">
                            {planetDetails.isLoading ? (
                                    '...Loading'
                                ) : (
                                    <ul>
                                        <li>Name : {planet.name}</li>
                                        <li>Diameter : {planet.diameter} {renderUnits(planet.diameter,'km')}</li>
                                        <li>Climate : {planet.climate}</li>
                                        <li>Population : {planet.population.length} residents</li>
                                    </ul>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Modal;
