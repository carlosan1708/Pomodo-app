import {
  TimerSharedState,
  TimerActionTypes,
} from '../actions/timer/TimerActionType';

import {
  PERSIST_RADIO_TIMER,
  TRIGGER_TIMER,
} from '../actions/timer/TimerActionTypeKeys';

const initialState: TimerSharedState = {
  timerRadioOption: 15,
  isTimerOn: false,
  status: 'Not_started',
};

export default (
  state = initialState,
  action: TimerActionTypes
): TimerSharedState => {
  switch (action.type) {
    case PERSIST_RADIO_TIMER:
      return {
        ...state,
        timerRadioOption: action.timerRadioOption,
      };
    case TRIGGER_TIMER:
      return {
        ...state,
        isTimerOn: action.payload.isTimerOn,
        status: action.payload.status,
      };
    default:
      return state;
  }
};
