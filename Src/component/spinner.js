import React from 'react';
import {ActivityIndicator} from 'react-native';

export class Spinner extends React.Component {

  state = { paginationSpinner: this.props.paginationSpinner || false }

  render() {
    if (this.state.paginationSpinner) {
      return (
        <ActivityIndicator size="small" style={{ paddingVertical: 15 }} />
      )
    } else {
      return (
        <ActivityIndicator size="small" style={{ alignSelf: 'center', justifyContent: 'center', flex: 1 }} />
      )
    }
  }
}
