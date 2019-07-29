import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { Spinner } from 'native-base';


const Loader = ({visible}) => {

  const { loaderContainerStyle } = styles;

  return (
    <React.Fragment>
      {visible &&
        <View style={loaderContainerStyle}>

          <Spinner color='blue' />

        </View >
      }
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  loaderContainerStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    zIndex: 1000,
    top: 0, 
    bottom: 0, 
    left: 0, 
    right: 0
  }
})

export default Loader