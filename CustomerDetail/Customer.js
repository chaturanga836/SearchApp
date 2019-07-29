import React, { Component } from 'react';
import { Alert, Button, StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import {
    Content,
    Text,
    Picker,
    Spinner,
} from 'native-base';
import Loader from './../Component/Loader';

import axios from 'axios';

import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';


class Customer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formErrors: {
                title: '',
                district: '',
                city: '',
                description: '',
                Address: '',
                OwnerName: '',
                OwnerID: '',
                latitude: '',
                longitude: '',
                contact_no: '',
                price_id: ''
            },

            modalVisible: false,
            latitude: null,
            longtitude: null,
            category: undefined,
            subCategory: undefined,
            district: undefined,
            city: undefined,
            id: undefined,
            name: null,
            address: null,
            mobile1: null,
            owner: null,
            title: null,
            price: undefined,
            descript: null,
            categories: [],
            subCategories: [],
            districts: [],
            cities: [],
            prices: [],
        };
    }

    showAlert = (message) => {
        Alert.alert(
            message
        )
    }

    componentDidMount = () => {
        const { baseurl, api_token } = this.props;

        this.setState({ 'modalVisible': true });

        axios.get(baseurl + '/get-meta', {
            headers: {
                'Authorization': 'Bearer ' + api_token
            }
        })
            .then(response => {

                this.setState({
                    prices: response.data.data.prices,
                    categories: response.data.data.categories,
                    subCategories: response.data.data.subCategories,
                    districts: response.data.data.district,
                    cities: response.data.data.cities,
                    'modalVisible': false
                });

            })
            .catch(error => {
                this.setState({ 'modalVisible': false });
                if (error.response === undefined) {
                    this.showAlert("Network Error");
                } else {
                    if (error.response.status == 400) {
                        this.showAlert("invalid credentials");
                    } else if (error.response.status == 401) {
                        //this.showAlert("Authentication failed");
                        //navigate('Login');
                    } else {
                        this.showAlert("Something went wrong!");
                    }
                }
            });
    }

    onchangeSim = (value) => {
        this.setState({
            selected1: value
        });
    }

    onchangeSim2 = (value) => {
        this.setState({
            selected2: value
        });
    }



    addAvertiesment = () => {

        const { baseurl, api_token, setFormData } = this.props;
        const { city, district, address,
            category, mobile1, price,
            subCategory, owner, descript,
            title, longtitude, latitude
        } = this.state;


        let config = {
            headers: {
                'Authorization': 'Bearer ' + api_token
            }
        }


        let _formErrors = {
            'title': '',
            'district': '',
            'city': '',
            'description': '',
            'Address': '',
            'OwnerName': '',
            'OwnerID': '',
            'latitude': '',
            'longitude': '',
            'contact_no': '',
            'price_id': ''
        };



        const postData = {
            "id": "",
            "title": title,
            "district": district,
            "city": city,
            "description": descript,
            'categories': category,
            'sub_categories': subCategory,
            "Address": address,
            "OwnerName": owner,
            "OwnerID": "1",
            "latitude": latitude,
            "longitude": longtitude,
            "contact_no": mobile1,
            "price_id": price
        };

        this.setState({ 'modalVisible': true });


        axios.post(baseurl + '/add-advertisement', postData, config)
            .then(response => {
                this.setState({
                    'modalVisible': false,
                    'latitude': '',
                    'longtitude': '',
                    'category': undefined,
                    'subCategory': undefined,
                    'district': undefined,
                    'city': undefined,
                    'id': undefined,
                    'name': '',
                    'address': '',
                    'mobile1': '',
                    'owner': '',
                    'title': '',
                    'price': undefined,
                    'descript': '',
                    'modalVisible': false
                });
                this.showAlert("Successfully Added");
                setFormData({
                    'id': response.data.data.id,
                    'number_of_photos': response.data.data.number_of_photos,
                });

            })
            .catch(error => {
                this.setState({ 'modalVisible': false });
                if (error.response === undefined) {
                    this.showAlert("Network Error");
                } else {
                    if (error.response.status == 401) {
                        this.showAlert("unauthorised");
                    } else if (error.response.status == 400) {

                        for (var i in error.response.data.errors) {
                            _formErrors[i] = error.response.data.errors[i][0];
                        }

                        this.setState({ 'formErrors': _formErrors });
                        this.showAlert("invalid credentials");
                    } else {
                        this.showAlert("Internal Error!");
                    }
                }
            });

    }

    onchangeCategories = (value) => {
        this.setState({
            category: value
        });
    }

    onchangeSubCategories = (value) => {
        this.setState({
            subCategory: value
        });
    }

    onchangeDistrict = value => {
        this.setState({
            district: value
        });
    }

    onchangeCities = (value) => {
        this.setState({
            city: value
        });
    }

    onchangePrices = (value) => {
        this.setState({
            price: value
        });
    }

    viewImages = () => {
        const { navigate } = this.props.navigation;
        navigate('ImageUpload');

    }

    render() {
        const { category, city, subCategory,
            id, name, mobile1, address,
            district, price,
            owner, descript, modalVisible,
            title, longtitude, latitude,
            categories, formErrors,
            subCategories,
            districts,
            cities,
            prices,
        } = this.state;


        return (
            <Content style={styles.containerStyle}>
                <Loader visible={modalVisible} />
                <View style={styles.inputGroupStyle}>
                    <View style={styles.inputFiled}>

                        <Input
                            inputContainerStyle={styles.inputContainerStyle}
                            placeholder='Title'
                            value={title} onChangeText={title =>
                                this.setState({ 'title': title })}
                        />
                    </View>
                    <Text style={styles.errorFiles}>{formErrors.title}</Text>
                </View>

                <View style={styles.inputGroupStyle}>
                    <View style={styles.inputFiled}>
                        <Picker
                            mode="dropdown"
                            selectedValue={category}
                            placeholder="Categories" onValueChange={this.onchangeCategories}>
                            {subCategories.map(row => {
                                return (<Picker.Item key={row.id} label={row.name} value={row.id} />)
                            })}

                        </Picker>
                    </View>
                    <Text style={styles.errorFiles}>{formErrors.category}</Text>
                </View>

                <View style={styles.inputGroupStyle}>
                    <View style={styles.inputFiled}>
                        <Picker
                            mode="dropdown"
                            selectedValue={subCategory}
                            placeholder="Sub Categories" onValueChange={this.onchangeSubCategories}>
                            {categories.map(row => {
                                return (<Picker.Item key={row.id} label={row.name} value={row.id} />)
                            })}

                        </Picker>
                    </View>
                    <Text style={styles.errorFiles}>{formErrors.subCategory}</Text>
                </View>

                <View style={styles.inputGroupStyle}>
                    <View style={styles.inputFiled}>
                        <Picker
                            mode="dropdown"
                            placeholder="District"
                            selectedValue={district}
                            onValueChange={this.onchangeDistrict}>
                            {districts.map(row => {
                                return (<Picker.Item key={row.id} label={row.name} value={row.id} />)
                            })}

                        </Picker>
                    </View>
                    <Text style={styles.errorFiles}>{formErrors.district}</Text>
                </View>

                <View style={styles.inputGroupStyle}>
                    <View style={styles.inputFiled}>
                        <Picker
                            mode="dropdown"
                            placeholder="City"
                            selectedValue={city}
                            onValueChange={this.onchangeCities}>
                            {cities.map(row => {
                                return (<Picker.Item key={row.id} label={row.name} value={row.id} />)
                            })}
                        </Picker>
                    </View>
                    <Text style={styles.errorFiles}>{formErrors.city}</Text>
                </View>

                <View style={styles.inputGroupStyle}>
                    <View style={styles.inputFiled}>
                        <Picker
                            mode="dropdown"
                            placeholder="Price"
                            selectedValue={price}
                            onValueChange={this.onchangePrices}>
                            {prices.map(row => {
                                return (<Picker.Item key={row.id} label={row.price.toString()} value={row.id} />)
                            })}
                        </Picker>
                    </View>
                    <Text style={styles.errorFiles}>{formErrors.price}</Text>
                </View>

                <View style={styles.inputGroupStyle}>
                    <View style={styles.inputFiled}>
                        <Input
                            inputContainerStyle={styles.inputContainerStyle}
                            placeholder='NIC' value={id}
                        />
                    </View>
                    <Text style={styles.errorFiles}>{formErrors.OwnerID}</Text>
                </View>

                <View style={styles.inputGroupStyle}>
                    <View style={styles.inputFiled}>
                        <Input placeholder='Name'
                            inputContainerStyle={styles.inputContainerStyle}

                            value={name}
                            onChangeText={name =>
                                this.setState({ 'name': name })} />
                    </View>
                    <Text style={styles.errorFiles}>{formErrors.name}</Text>
                </View>

                <View style={styles.inputGroupStyle}>
                    <View style={styles.inputFiled}>
                        <Input
                            inputContainerStyle={styles.inputContainerStyle}
                            placeholder='Address'
                            value={address}
                            onChangeText={address => this.setState({ 'address': address })}
                        />
                    </View>
                    <Text style={styles.errorFiles}>{formErrors.address}</Text>
                </View>

                <View style={styles.inputGroupStyle}>
                    <View style={styles.inputFiled}>
                        <Input
                            inputContainerStyle={styles.inputContainerStyle}
                            placeholder='Mobile No'
                            value={mobile1}
                            keyboardType='phone-pad'
                            onChangeText={mobile1 => this.setState({ 'mobile1': mobile1 })} />
                    </View>
                    <Text style={styles.errorFiles}>{formErrors.contact_no}</Text>
                </View>

                <View style={styles.inputGroupStyle}>
                    <View style={styles.inputFiled}>

                        <Input
                            inputContainerStyle={styles.inputContainerStyle}
                            placeholder='Owner Name'
                            value={owner}
                            onChangeText={owner => this.setState({ 'owner': owner })} />
                    </View>
                    <Text style={styles.errorFiles}>{formErrors.OwnerName}</Text>
                </View>

                <View style={styles.inputGroupStyle}>
                    <View style={styles.inputFiled}>
                        <Input
                            inputContainerStyle={styles.inputContainerStyle}
                            placeholder='Description'
                            value={descript}
                            multiline={true}
                            onChangeText={descript => this.setState({ 'descript': descript })} />
                    </View>
                    <Text style={styles.errorFiles}>{formErrors.description}</Text>
                </View>

                <View style={styles.inputGroupStyle}>
                    <View style={styles.inputFiled}>
                        <Input
                            inputContainerStyle={styles.inputContainerStyle}
                            placeholder='Longtitude'
                            value={longtitude}
                            keyboardType='numeric'
                            onChangeText={longtitude => this.setState({ 'longtitude': longtitude })} />
                    </View>
                    <Text style={styles.errorFiles}>{formErrors.longitude}</Text>
                </View>

                <View style={styles.inputGroupStyle}>
                    <View style={styles.inputFiled}>
                        <Input
                            inputContainerStyle={styles.inputContainerStyle}
                            placeholder='Latitude'
                            keyboardType='numeric'
                            value={latitude}
                            onChangeText={latitude => this.setState({ 'latitude': latitude })} />
                    </View>
                    <Text style={styles.errorFiles}>{formErrors.latitude}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonsStyle}>
                        <TouchableOpacity onPress={() => this.addAvertiesment()}>
                            <Text style={styles.buttonTextStyle}>Add new</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonsStyle}>
                        <TouchableOpacity onPress={() => this.viewImages()}>
                            <Text style={styles.buttonTextStyle}>Images</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </Content>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle:{
        marginTop: 10
    },
    errorFiles: {
        marginTop: 10,
        marginLeft: 10,
        textAlign: 'left',
        fontSize: 12,
        color: '#FF4136',
    },

    inputGroupStyle: {
        marginBottom: 15
    },

    inputFiled: {
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#000080',
        marginLeft: 10,
        marginRight: 10,
    },

    inputContainerStyle: {
        borderBottomWidth: 0,
        height: 50,
    },

    buttonContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20
    },
    buttonsStyle: {
        height: 45,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#000080',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonTextStyle: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 18
    }

})

const mapStateToProps = state => ({
    baseurl: state.auth.base_url,
    api_token: state.auth.api_token
});

const EventAction = dispatch => ({
    setEventData: (data) => { dispatch({ type: 'SET_META', data }); },
    setFormData: (data) => { dispatch({ type: 'SET_FORMDATE', data }); },

});

export default connect(mapStateToProps, EventAction)(Customer);