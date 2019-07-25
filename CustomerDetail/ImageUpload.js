import React, { Component } from 'react';
import { View,StyleSheet, FlatList } from 'react-native'
import axios from 'axios';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

class ImageUpload extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <FlatList
                data={this.state.dataSource}
                renderItem={({ item }) => (
                  <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                    <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
                  </View>
                )}
                numColumns={3}
                keyExtractor={(item, index) => index}
                >

                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
      justifyContent: 'center',
      flex: 1,
      paddingTop: 30,
    },
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
    },
  });

  export default ImageUpload