import React from 'react';
import { View, Modal } from 'react-native';
import { Spinner } from 'native-base';

const Loader = (visible) =>{
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
          >
            <View style={{ marginTop: 22 }}>
              <View>
                <Spinner color='blue' />
              </View>

            </View>
          </Modal>
    )
}

export default Loader