import React from 'react';
import MaterialTable from 'material-table';
import StoryDialog from '../../components/StoryDialog';
import { connect } from 'react-redux';

class StoryApproval extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false
        }
        this.handleDialog = this.handleDialog.bind(this)
    }
    handleDialog() {
        this.setState({
            openDialog: !this.state.openDialog
        })
    }
    handlAccept() {
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
                    columns={[
                        { title: 'Summary', field: 'summary' },
                        { title: 'Type', field: 'type' },
                        { title: 'Complexity', field: 'complexity' },
                        { title: 'Estimate Time', field: 'time' },
                        { title: 'Cost', field: 'cost', type: 'numeric' },
                        { title: 'Status', field: 'status', type: 'numeric' },
                    ]}
                    data={stories}
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
                            tooltip: 'Approve',
                            hidden: (rowData.status === 'accepted' || rowData.status === 'rejected') ? true : false,
                            onClick: () => {
                                history.push('/story-approval')
                            }
                        }),
                        rowData => ({
                            icon: 'not_interested',
                            tooltip: 'Reject',
                            hidden: (rowData.status === 'accepted' || rowData.status === 'rejected') ? true : false,
                            onClick: () => {
                                history.push('/story-approval')
                            }
                        }),

                    ]}
                    onRowClick={(event, rowData) => {
                        this.handleDialog()
                    }}
                />
                {this.state.openDialog ? 
                    <StoryDialog 
                        open={this.state.openDialog} 
                        data={stories[0]} 
                        handleDialog={this.handleDialog}   
                        handlAccept={this.handlAccept} 
                    /> : null }
            </div>

        )
    }

}

const stories = [
    {
        summary: "test",
        type: "test",
        complexity: "test",
        time: "test",
        cost: "12312",
        description: "test",
        status: "pending"
    },
    {
        summary: "test",
        type: "test",
        complexity: "test",
        time: "test",
        cost: "12313",
        description: "test",
        status: "rejected"
    },
    {
        summary: "test",
        type: "test",
        complexity: "test",
        time: "test",
        cost: "12313",
        description: "test",
        status: "accepted"
    }
]

export default StoryApproval;