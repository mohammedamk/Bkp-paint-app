import React from 'react'
import { View, BackHandler, Alert,Text } from 'react-native'
import { Spinner } from '../component/spinner'
import { messages } from './language'

const renderPaginationFooter = (component) => {
    if(component.state.emptyList === false){
      if(component.state.isRefreshing === false){
        if (component.state.endOfResults === false) {
          return (
            <Spinner paginationSpinner={true}/>
          )
        } else {
          return (
            <View style={{alignItems: 'center', paddingVertical: 15 }}>
              <Text style={{ }}>{messages.paginationEndOfResults}</Text>
            </View>
          )
        }
      }
    }
  }

  export { renderPaginationFooter }