import React from 'react';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import './CreateStory.css'
import { CREATE_STORY} from '../../constants/actionTypes';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
    onCreateStory: (story) => dispatch({type: CREATE_STORY, payload: story})
})

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
        this.props.history.push('/story-list')
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
                                    <input type="text" className="form-control" id="summary" placeholder="summary" name="summary" onChange={this.handleChange}/>
                                </div>
                                </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label className="control-label" htmlFor="type">Type:</label>
                                    <select className="form-control" id="type" name="type" onChange={this.handleChange}>
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
                                    <select className="form-control" id="complexity" name="complexity" onChange={this.handleChange}>
                                        <option>Low</option>
                                        <option>Mid</option>
                                        <option>High</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label className="control-label" htmlFor="time">Estimated time:</label>
                                    <input type="text" className="form-control" id="time" placeholder="Estimated time" name="time" onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group">
                                <label className="control-label" htmlFor="cost">Cost:</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">$</span>
                                    </div>
                                    <input type="number" className="form-control" id="cost" placeholder="Cost" name="cost" onChange={this.handleChange}/>
                                </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="control-label" htmlFor="description">Description:</label>
                                    <textarea className="form-control" id="description" rows="5" placeholder="description..." name="description" onChange={this.handleChange}></textarea>
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

export default connect(null, mapDispatchToProps)(CreateStory);