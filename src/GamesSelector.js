import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function GamesSelector({ names, selectedNames, onCheckboxChange }) {
  const classes = useStyles();

  return <>
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">Games</FormLabel>
      <FormGroup row={true}>
        {names.map(name => (
          <FormControlLabel
            key={name}
            label={name}
            control={<Checkbox checked={selectedNames.has(name)} onChange={ev => onCheckboxChange && onCheckboxChange(ev.currentTarget)} name={name} />}
          />
        ))}
      </FormGroup>
    </FormControl>
  </>;
}
