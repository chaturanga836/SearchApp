import React, { Platform,Component } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import {
    Button,
    Text,
} from 'native-base';
import axios from 'axios';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

const options = {
    noData: true
};

class ImageUpload extends Component {
    state = {
        'dataSource': []
    };
    constructor(props) {
        super(props);


    }

    uploadImages = () =>{
        const { baseurl, api_token, formdata } = this.props;
        const { dataSource } = this.state;
            
        let config = {
            headers: {
                'Authorization': 'Bearer ' + api_token,
                'Content-Type':'application/json'
            }
        }

        const data = new FormData();

        for(let i in dataSource){
            data.append("photoes", {
                name: dataSource[i].fileName,
                type: dataSource[i].type,
                uri:
                  Platform.OS === "android" ? dataSource[i].uri : dataSource[i].uri.replace("file://", "")
              });
        }


        const postData = {
            'advertisement_id': formdata.id,
            'photoes':[]
        };
        axios.post(baseurl+'/add-advertisement',postData ,config)
           .then( response => {})
           .catch(error =>{

           })
    }

    openGallery = () => {

        const { dataSource } = this.state;

        ImagePicker.launchImageLibrary(options, (response) => {
            // Same code as in above section!

            if (response.uri) {
                dataSource.push(response);
                this.setState({ 'dataSource': dataSource });
            }
        });
    }

    render() {
        const { dataSource } = this.state;
       
        return (
            <View>
                {dataSource.map( (row, index) =>{
                    return (<Image key={index} style={styles.imageThumbnail} source={{ uri: row.uri }} />);
                })}
   
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Button primary onPress={() => this.openGallery()}><Text> Open Gallary</Text></Button>
                    <Button primary onPress={() => this.uploadImages()}><Text> Upload</Text></Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    imageThumbnail: {
        height: 100,
        width: 100,
        flexDirection: 'row', 
        justifyContent: 'space-around'
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16
      },
});

const mapStateToProps = state => ({
    baseurl: state.auth.base_url,
    api_token: state.auth.api_token,
    formdata: state.formdata,
});

export default connect(mapStateToProps)(ImageUpload);