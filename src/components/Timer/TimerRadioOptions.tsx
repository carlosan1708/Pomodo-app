import React from 'react';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core';

type TimerRadioOptionsProps = {
  onChangeRadioTimer: (minutes: number) => void;
  timerVal: number;
  isDisable: boolean;
};

const options = ['1', '5', '15', '25', '35', '45'];

const TimerRadioOptions = (props: TimerRadioOptionsProps) => {
  const handleTimeRadioChange = (event: any) => {
    props.onChangeRadioTimer(event.target.value);
  };

  return (
    <FormControl component="fieldset" disabled={props.isDisable}>
      <FormLabel component="legend">Quantity of Minutes</FormLabel>
      <RadioGroup
        aria-label="Quantity of Minutes"
        value={props.timerVal.toString()}
        onChange={handleTimeRadioChange}
      >
        {options.map((element, index) => {
          return (
            <FormControlLabel
              key={`${element} + TimeRadio`}
              value={element}
              control={<Radio />}
              label={`${element} minutes`}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default TimerRadioOptions;
