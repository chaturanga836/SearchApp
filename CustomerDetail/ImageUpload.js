import React, { Component } from 'react';
import { Alert,View, StyleSheet, FlatList, Image } from 'react-native';
import {
    Button,
    Text,
} from 'native-base';
import axios from 'axios';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import FormData from 'form-data'
import { isArray } from 'lodash';
import Loader from './../Component/Loader'

const options = {
    noData: true
};

class ImageUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            'dataSource': []
        };

    }

    showAlert = (message) => {
        Alert.alert(
          message
        )
      }

    uploadImages = () =>{
        const { baseurl, api_token, formdata } = this.props;
        const { dataSource } = this.state;

  
            
        let config = {
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + api_token,
            }
        }

        if(!isArray(dataSource) ) {
            this.showAlert('images must be an array'); 
            return;
        }

        if(dataSource.length > formdata.number_of_photos){
            this.showAlert('maximum image count '+formdata.number_of_photos); 
            return;
        }

        const data = new FormData();
    
        for(let i in dataSource){
            data.append("photoes[]",{
                name: dataSource[i].fileName,
                type: dataSource[i].type,
                uri:dataSource[i].uri
              });
   
        }

        
        data.append("advertisement_id",formdata.id );

        this.setState({ 'modalVisible': true });

        axios.post(baseurl+'/upload-ad-images',data ,config)
           .then( response => {
                this.setState({ 'modalVisible': false, dataSource:[]});
               this.showAlert('images uploaded successfully');
                
           })
           .catch(error =>{

            if(error.response === undefined){
                this.showAlert("Network Error");
              }else{
                if(error.response.status == 400){
                  this.showAlert("invalid credentials");
                }else if(error.response.status == 401){
                    this.showAlert("Authentication failed");
                    navigate('Login');
                }else{
                  this.showAlert("Something went wrong!");
                }
              }
              this.setState({ 'modalVisible': false });
           });
    }

    openGallery = () => {

        const { dataSource, modalVisible } = this.state;

        ImagePicker.launchImageLibrary(options, (response) => {
            // Same code as in above section!

            if (response.uri) {
                dataSource.push(response);
                this.setState({ 'dataSource': dataSource });
            }
        });
    }

    render() {
        const { dataSource, modalVisible } = this.state;
       console.log(modalVisible);
        return (
            <View>
                <Loader visible={modalVisible}/>
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
    formdata: state.auth.formdata,
});

export default connect(mapStateToProps)(ImageUpload);