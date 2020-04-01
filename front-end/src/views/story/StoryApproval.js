import React from 'react';
import MaterialTable from 'material-table';
import StoryDialog from '../../components/StoryDialog';
import { connect } from 'react-redux';
import { StoryListRedux } from '../../redux/actions';

const { mapStateToProps, mapDispatchToProps } = StoryListRedux
class StoryApproval extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            target: {}
        }
        this.handleDialog = this.handleDialog.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleReject = this.handleReject.bind(this);
    }
    componentDidMount() {
        if (!this.props.story || this.props.story.storyList.length === 0){
            this.props.listStory()
        }
    }

    handleDialog(rowData) {
        this.setState({
            openDialog: !this.state.openDialog,
            target: rowData
        })
    }
    handleAccept() {
        this.props.acceptStory(this.state.target)
        this.setState({
            openDialog: !this.state.openDialog
        })
    }
    handleReject() {
        this.props.rejectStory(this.state.target)
        this.setState({
            openDialog: !this.state.openDialog
        })
    }

    render() {
        const {history} = this.props;
        return (
            <div className="container">
                <MaterialTable
                    title="Story List"
                    isLoading={this.props.story.loading}
                    columns={[
                        { title: 'Summary', field: 'summary' },
                        { title: 'Type', field: 'type' },
                        { title: 'Complexity', field: 'complexity' },
                        { title: 'Estimate Time', field: 'estimatedHrs' },
                        { title: 'Cost', field: 'cost', type: 'numeric' },
                        { title: 'Status', field: 'status', type: 'numeric' },
                    ]}
                    data={this.props.story.storyList || []}
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
                    options={{
                        rowStyle: rowData => ({
                            backgroundColor: (rowData.status === 'rejected' ? '#ff0000' : rowData.status === 'accepted' ? '#40ff00' : null)
                        })
                    }}
                    actions={[
                        rowData => ({
                            icon: 'done',
                            tooltip: 'Accept',
                            hidden: (rowData.status === 'accepted' || rowData.status === 'rejected') ? true : false,
                            onClick: () => {
                                rowData.status = 'accepted'
                                history.push('/story-approval')
                            }
                        }),
                        rowData => ({
                            icon: 'not_interested',
                            tooltip: 'Reject',
                            hidden: (rowData.status === 'accepted' || rowData.status === 'rejected') ? true : false,
                            onClick: () => {
                                rowData.status = 'rejected'
                                history.push('/story-approval')
                            }
                        }),

                    ]}
                    onRowClick={(event, rowData) => {
                        this.handleDialog(rowData)
                    }}
                />
                {this.state.openDialog ? 
                    <StoryDialog 
                        open={this.state.openDialog} 
                        data={this.state.target || {}} 
                        handleDialog={this.handleDialog}
                        handleReject={this.handleReject}   
                        handleAccept={this.handleAccept} 
                    /> : null }
            </div>

        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(StoryApproval);