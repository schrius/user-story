import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';

function StoryDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleDialog}
            aria-labelledby="story-dialog-summary"
            aria-describedby="story-dialog-description"
            maxWidth='xs'
        >
            <DialogTitle id="story-dialog-summary">{props.data.summary}</DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={6} lg={6}>
                        <TextField
                            id="story-dialog-complexity"
                            label="Complexity"
                            size='small'
                            defaultValue={props.data.complexity}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6} lg={6}>
                        <TextField
                            id="story-dialog-time"
                            label="Estimate Time"
                            size='small'
                            defaultValue={props.data.estimatedHrs}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6} lg={6}>
                        <TextField
                            id="story-dialog-cost"
                            label="Cost"
                            size='small'
                            defaultValue={props.data.cost}
                            InputProps={{
                                readOnly: true,
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6} lg={6}>
                        <TextField
                            id="story-dialog-status"
                            label="Status"
                            size='small'
                            defaultValue={props.data.status}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        <DialogContentText id="story-dialog-description">
                            {props.data.description}
                        </DialogContentText>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleReject} variant="contained" color="secondary" >
                    Reject
                    </Button>
                <Button onClick={props.handleAccept} variant="contained" color="primary" autoFocus>
                    Accept
                    </Button>
            </DialogActions>
        </Dialog>
    )
}

export default StoryDialog;