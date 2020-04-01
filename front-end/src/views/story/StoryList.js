import React from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { StoryListRedux } from '../../redux/actions';

const { mapStateToProps, mapDispatchToProps} = StoryListRedux;
class StoryList extends React.Component {
    componentDidMount() {
        if (!this.props.story || this.props.story.storyList.length === 0){
            this.props.getStory(this.props.login.user)
        }
    }
    render() {
        return (
            <div className="container">
                <MaterialTable
                    isLoading={this.props.story.loading}
                    title="Story List"
                    columns={[
                        { title: 'Summary', field: 'summary' },
                        { title: 'Type', field: 'type' },
                        { title: 'Complexity', field: 'complexity' },
                        { title: 'Estimate Time', field: 'estimatedHrs' },
                        { title: 'Cost', field: 'cost', type: 'numeric' },
                    ]}
                    data={ this.props.story.storyList || []}
                    detailPanel={
                        rowData => {
                            return (
                                <div className="description">
                                    <h6>Description:</h6>
                                    <p>
                                        {rowData.description}
                                    </p>
                                </div>
                            )
                        }}
                    actions={[
                        {
                            icon: 'add',
                            tooltip: 'Add Story',
                            isFreeAction: true,
                            onClick: (event) => {
                                event.preventDefault();
                                this.props.history.push('/create-story')
                            }
                        }
                    ]}
                />
            </div>
        )
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryList);