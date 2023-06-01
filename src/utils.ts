import PropTypes from 'prop-types'
import moment from 'moment'

import { IMessage } from './Models'

export const StylePropType = PropTypes.oneOfType([
  PropTypes.array,
  PropTypes.object,
  PropTypes.number,
  PropTypes.bool,
])

export function isSameDay(  currentMessage: IMessage,
  diffMessage: IMessage | null | undefined,) {
  if (!diffMessage || !diffMessage.createdAt) {
      return false;
  }

  const currentCreatedAt = moment(currentMessage.createdAt);
  const diffCreatedAt = moment(diffMessage.createdAt);

  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
      return false;
  }

  if(currentCreatedAt.isSame(diffCreatedAt, 'day')) {
      return true;
  }

  const differenceInMinutes = currentCreatedAt.diff(diffCreatedAt, 'minutes');
  if(Math.abs(differenceInMinutes) <= 10) {
      return true;
  }

  return false;
}

export function isSameUser(
  currentMessage: IMessage,
  diffMessage: IMessage | null | undefined,
) {
  return !!(
    diffMessage &&
    diffMessage.user &&
    currentMessage.user &&
    diffMessage.user._id === currentMessage.user._id
  )
}
