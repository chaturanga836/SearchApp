import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,

} from 'react-native';


//import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements'
import axios from 'axios';
import Loader from './../Component/Loader';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      username: '',
      password: '',
    }


  }

  componentDidMount = () => {
    //this.retrieveData();
  }

  showAlert = (message) => {
    Alert.alert(
      message
    )
  }

  retrieveData = async () => {

    const { navigate } = this.props.navigation;

    try {
      //const value = await AsyncStorage.getItem('credentials');
      //if (value !== null) {
      // We have data!!
      navigate('Customer')

      //}
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
          //this.storeData()
          this.setState({ 'modalVisible': false });
          navigate('Customer');
        }
      })
      .catch(error => {
        if (error.response === undefined) {
          this.showAlert("Network Error");
        } else {
          if (error.response.status == 400) {
            this.showAlert("invalid credentials");
          } else {
            this.showAlert("Something went wrong!");
          }
        }

        this.setState({ 'modalVisible': false });

      });
    //
  }

  storeData = async () => {
    try {

      const { username, password } = this.state;
      const credentials = {
        username, password
      }
      //await AsyncStorage.setItem('credentials', credentials);
    } catch (error) {
      // Error saving data
    }
  };


  render() {
    const { username, password, modalVisible } = this.state;

    return (

      <View style={styles.content}>
          
        <View>
        <Loader visible={modalVisible} />
          <View style={styles.inputFiled}>
            <Input
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputFieldPassword}
              placeholder='email'
              keyboardType='email-address'
              value={username}
              textAlign={'left'}
              onChangeText={username => this.setState({ 'username': username })}
              leftIcon={
                <View style={styles.iconContainerStyle}>
                  <Icon
                    name='envelope'
                    size={24}
                    color='#000080'
                  /></View>}
            />
          </View>


          <View style={styles.inputFiled}>
            <Input
              inputContainerStyle={styles.inputContainerStyle}
              inputContaininputStyleerStyle={styles.inputFieldPassword}
              placeholder='passoword'
              textAlign={'left'}
              secureTextEntry={true}
              value={password}
              onChangeText={password => this.setState({ 'password': password })}
              leftIcon={
                <View style={styles.iconContainerStyle}>
                  <Icon
                    name='lock'
                    size={24}
                    color='#000080'
                  />
                </View>}
            />
          </View>

          <View style={styles.loginButtonContainer}>
            <TouchableOpacity onPress={() => this.login()}>
              <Text style={styles.loginButtonText}> Login</Text>
            </TouchableOpacity>
          </View>


        </View>

      </View>

    )
  }
}



const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    position: 'relative',
    justifyContent: 'center',
  },

  iconContainerStyle: {
    width: 40,

  },
  inputFiled: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#000080',
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
  },

  inputContainerStyle: {
    borderBottomWidth: 0,
    height: 50,
  },
  inputFieldsUsername: {
    marginLeft: 10,
    marginRight: 10,
  },


  inputFieldPassword: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,

  },

  loginButtonContainer: {
    height: 45,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#000080',
    justifyContent: 'center',
    alignItems: 'center'
  },

  loginButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18
  },

  lable: {
    marginTop: 5,
    color: '#AAAAAA',
  },
  errorFiles: {
    marginTop: 10,
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