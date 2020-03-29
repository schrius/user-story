import React from 'react';
import MaterialTable from 'material-table';
import './StoryList.css'

function StoryList(props) {
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