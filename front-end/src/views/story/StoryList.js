import React from 'react';
import MaterialTable from 'material-table';

function StoryList(props) {
    const { history } = props
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
                actions={[
                    {
                        icon: 'add',
                        tooltip: 'Add Story',
                        isFreeAction: true,
                        onClick: (event) => {
                            event.preventDefault();
                            history.push('create-story')
                        }
                    }
                ]}
            />
        </div>

    )
}

const stories = [
    {
        summary: "test",
        type: "test",
        complexity: "test",
        time: "test",
        cost: "12312",
        description: "test",
    },
    {
        summary: "test",
        type: "test",
        complexity: "test",
        time: "test",
        cost: "12313",
        description: "test",
    }
]

export default StoryList;