import React from 'react';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import './CreateStory.css'
import { connect } from 'react-redux';
import { StoryListRedux } from '../../redux/actions';

const { mapStateToProps, mapDispatchToProps} = StoryListRedux;

class CreateStory extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCreateStory = event => {
        event.preventDefault();
        this.props.onCreateStory({
            summary: this.state.summary,
            type: this.state.type || 'enhancement',
            complexity: this.state.complexity || 'Low',
            estimatedHrs: this.state.estimatedHrs,
            cost: this.state.cost,
            description: this.state.description
        })
    }
    render() {
        return (
            <div className="container create-story">
                <div className="row justify-content-center">
                    <form className="create-story" onSubmit={this.handleCreateStory}>
                        <h3><ContactSupportOutlinedIcon />Create Story</h3>
                        <div className="form-row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="control-label" htmlFor="summary">Summary:</label>
                                    <input type="text" className="form-control" id="summary" placeholder="summary" name="summary" onChange={this.handleChange} required/>
                                </div>
                                </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label className="control-label" htmlFor="type">Type:</label>
                                    <select className="form-control" id="type" name="type" defaultValue="enhancement" onChange={this.handleChange}>
                                        <option value="enhancement" >enhancement</option>
                                        <option value="bugfix">bugfix</option>
                                        <option value="development">development</option>
                                        <option value="QA">QA</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label className="control-label" htmlFor="complexity">Complexity:</label>
                                    <select className="form-control" id="complexity" name="complexity" defaultValue="Low" onChange={this.handleChange}>
                                        <option value="Low" >Low</option>
                                        <option value="Mid">Mid</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label className="control-label" htmlFor="estimatetime">Estimated time:</label>
                                    <input type="text" className="form-control" id="estimatetime" placeholder="Estimated hours" name="estimatedHrs" onChange={this.handleChange} required/>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group">
                                <label className="control-label" htmlFor="cost">Cost:</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">$</span>
                                    </div>
                                    <input type="number" className="form-control" id="cost" placeholder="Cost" name="cost" onChange={this.handleChange} required/>
                                </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="control-label" htmlFor="description">Description:</label>
                                    <textarea className="form-control" id="description" rows="5" placeholder="description..." name="description" onChange={this.handleChange} required></textarea>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateStory);