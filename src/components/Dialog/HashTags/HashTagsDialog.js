import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import autobind from 'autobind-decorator';
import { HashTag } from '../../Forms/hashTag';
import { Chip, createMuiTheme, withStyles } from '@material-ui/core';

const styles = theme => ({
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
});

const theme = createMuiTheme({});

@withStyles(styles)
@connect(
  state => ({}),
  {},
)
export class HashTagsDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { tags } = this.props;

    if (tags.length !== nextProps.tags.length) {
      this.setState({
        tags: nextProps.tags,
      });
    }
  }

  @autobind
  onKeyPress(e) {
    if (e.hasOwnProperty('key')) {
      if (e.key === 'Enter') {
        const { tags } = this.state;
        let newTags = Object.assign([], tags);

        newTags.push(e.target.value);

        this.setState({
          tags: newTags,
        });

        e.target.value = '';

        this.props.updateTags(newTags);
      }
    }
  }

  @autobind
  handleDelete(e, tag) {
    e.stopPropagation();
    const { tags } = this.state;
    let newTags = tags.filter(item => item !== tag);

    this.setState({
      tags: newTags,
    });

    this.props.updateTags(newTags);
  }

  render() {
    const { dialogOpen, classes } = this.props;
    const { tags } = this.state;

    return (
      <div>
        <Dialog
          open={dialogOpen}
          onClose={this.props.dialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">해시태그 편집</DialogTitle>
          <DialogContent>
            <div>
              <div>
                {tags.map((item, idx) => {
                  return (
                    <Chip
                      key={idx}
                      label={`#${item}`}
                      onDelete={e => this.handleDelete(e, item)}
                    />
                  );
                })}
                <TextField
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      root: classes.bootstrapRoot,
                      input: classes.bootstrapInput,
                    },
                  }}
                  autoFocus
                  onKeyPress={e => this.onKeyPress(e)}
                />
              </div>
            </div>
            {/* <HashTag name={'hashTags'} label={'해시태그'} tags={tags} /> */}
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.props.dialogClose}
            >
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

HashTagsDialog.propTypes = {
  dialogOpen: PropTypes.bool,
  onDialogClose: PropTypes.func,
  tags: PropTypes.array,
  classes: PropTypes.object,
  dialogClose: PropTypes.func,
  updateTags: PropTypes.func,
};

export default HashTagsDialog;