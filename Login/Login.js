import React, { Component } from 'react';
import { Alert, 
  StyleSheet,
   View, 
   Button,
   Modal ,
   Text,
   TextInput,
   TouchableOpacity,

  } from 'react-native';

//import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
//import { AsyncStorage } from 'react-native';
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
      //await AsyncStorage.setItem('credentials', credentials);
    } catch (error) {
      // Error saving data
    }
  };


  render() {
    const { username, password, modalVisible} = this.state;

    return (
      
        <View style={styles.content}>

          <Loader visible={modalVisible}/>
          <View>

          </View>

          <View>
            <View>
              <TextInput style={styles.inputFilds} placeholder='username' value={username} onChangeText={username => this.setState({ 'username': username })} />
            </View>
            

            <View >
              <TextInput style={styles.inputFilds} placeholder='passoword' secureTextEntry={true} value={password} onChangeText={password => this.setState({ 'password': password })} />
            </View>
              
            <View>
              <TouchableOpacity style={styles.loginButton} onPress={() => this.login()} >
              <Button color="#841584" title="Login" />
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
    marginLeft:5,
    marginRight:5,
    position: 'relative',
    justifyContent: 'center',
  },

  inputFilds:{
    paddingHorizontal: 10,
    borderBottomWidth:1,
    marginLeft: 5,
    marginRight: 5,
    borderColor: '#ccc',
  },

  loginButton: {
    height: 20,
    marginTop:20,
  },

  lable: {
    marginTop:5,
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