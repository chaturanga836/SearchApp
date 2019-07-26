import React, { Component } from 'react';
import { Alert, StyleSheet, View, Modal } from 'react-native';
import {
  Form,
  Container,
  Content,
  Input,
  Item as FormItem,
  Button,
  Label,
  Text,
  Spinner,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import Loader from './../Component/Loader';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      username: 'searchapp001@gmail.com',
      password: 'redrose2009',
    }


  }

  componentDidMount = () => {
    this.retrieveData();
  }

  showAlert = (message) => {
    Alert.alert(
      message
    )
  }

  retrieveData = async () => {

    const { navigate } = this.props.navigation;

    try {
      const value = await AsyncStorage.getItem('credentials');
      if (value !== null) {
        // We have data!!
        navigate('Customer')

      }
    } catch (error) {
      // Error retrieving data
    }
  };

  login = () => {
    const { navigate } = this.props.navigation;
    const { baseurl } = this.props;

    const { username, password } = this.state;
    const { setEventData } = this.props;
    this.setState({ 'modalVisible': true });

    axios.post(baseurl + '/user/login', {
      'email': username,
      'password': password
    })
      .then(response => {

        if (response === undefined) {
          this.showAlert("Network Error");
        } else {
          setEventData({
            'username': username,
            'password': password,
            'api_token': response.data.data.api_token
          });
            this.storeData()
          this.setState({ 'modalVisible': false });
          navigate('Customer');
        }
      })
      .catch(error => {
        if(error.response === undefined){
          this.showAlert("Network Error");
        }else{
          if(error.response.status == 400){
            this.showAlert("invalid credentials");
          }else{
            this.showAlert("Something went wrong!");
          }
        }
       
        this.setState({ 'modalVisible': false});

      });
    //
  }

  storeData = async () => {
    try {

      const { username, password } = this.state;
      const credentials = {
        username, password
      }
      await AsyncStorage.setItem('credentials', credentials);
    } catch (error) {
      // Error saving data
    }
  };


  render() {
    const { username, password, modalVisible} = this.state;

    return (
      <LinearGradient colors={['#e5e5e5', '#e5e5e5']} style={styles.linearGradient}>
        <View style={styles.content}>

          <Loader visible={modalVisible}/>

          <Form>
            <FormItem floatingLabel>
              <Label style={styles.lable}>username</Label>
              <Input placeholder='' value={username} onChangeText={username => this.setState({ 'username': username })} />
            </FormItem>
            <Text style={styles.errorFiles}></Text>

            <FormItem floatingLabel >
              <Label style={styles.lable}>password</Label>
              <Input placeholder='' secureTextEntry={true} value={password} onChangeText={password => this.setState({ 'password': password })} />
            </FormItem>

            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around',}}>
              <Button block dark onPress={() => this.login()}><Text> Login</Text></Button>
            </View>


          </Form>
        </View>
      </LinearGradient>
    )
  }
}



const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  content: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  loginButton: {
    marginTop: 100,
  },

  lable: {
    color: '#AAAAAA',
  },
  errorFiles: {
    marginTop: 10,
    marginLeft: 10,
    textAlign: 'left',
    fontSize: 12,
    color: '#FF4136',
  },
});

const mapStateToProps = state => ({
  baseurl: state.auth.base_url
});

const EventAction = dispatch => ({
  setEventData: (data) => { dispatch({ type: 'SET_CREDENTIALS', data }); },
});

export default connect(mapStateToProps, EventAction)(Login);