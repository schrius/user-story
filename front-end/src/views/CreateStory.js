import React from 'react';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import './CreateStory.css'

class CreateStory extends React.Component {
    handleCreateTicket = event => {
        event.preventDefault();
        this.props.history.push('/')
    }
    render() {
        return (
            <div className="container create-story">
                <div className="row justify-content-center">
                    <form className="create-story" onSubmit="">
                        <h3><ContactSupportOutlinedIcon />Create Ticket</h3>
                        <div className="form-row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="control-label" htmlFor="summary">Summary:</label>
                                    <input type="text" className="form-control" id="summary" placeholder="summary" name="summary" />
                                </div>
                                </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label className="control-label" htmlFor="type">Type:</label>
                                    <select className="form-control" id="type" name="type">
                                        <option>enhancement</option>
                                        <option>bugfix</option>
                                        <option>development</option>
                                        <option>QA</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label className="control-label" htmlFor="complexity">Complexity:</label>
                                    <select className="form-control" id="complexity" name="complexity">
                                        <option>Low</option>
                                        <option>Mid</option>
                                        <option>High</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label className="control-label" htmlFor="time">Estimated time:</label>
                                    <input type="text" className="form-control" id="time" placeholder="Estimated time" name="time" />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group">
                                <label className="control-label" htmlFor="cost">Cost:</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">$</span>
                                    </div>
                                    <input type="number" className="form-control" id="cost" placeholder="Cost" name="cost" />
                                </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="control-label" htmlFor="description">Description:</label>
                                    <textarea className="form-control" id="description" rows="5" placeholder="description..." name="description"></textarea>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateStory;