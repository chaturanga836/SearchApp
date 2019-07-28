import React, { Component } from 'react';
import { Alert, StyleSheet, View, Modal } from 'react-native';
import {
    Form,
    Content,
    Input,
    Item as FormItem,
    Button,
    Label,
    Text,
    Picker,
    Textarea,
    Spinner,
} from 'native-base';
import Loader from './../Component/Loader';

import axios from 'axios';

import { connect } from 'react-redux';



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
                        this.showAlert("Authentication failed");
                        navigate('Login');
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
            <Content>
                <Loader visible={modalVisible} />

                <Form>
                    <FormItem floatingLabel>
                        <Label>Title</Label>
                        <Input placeholder='' value={title} onChangeText={title => this.setState({ 'title': title })} />
                    </FormItem>
                    <Text style={styles.errorFiles}>{formErrors.title}</Text>

                    <FormItem picker>
                        <Picker
                            mode="dropdown"
                            selectedValue={category}
                            placeholder="Categories" onValueChange={this.onchangeCategories}>
                            {subCategories.map(row => {
                                return (<Picker.Item key={row.id} label={row.name} value={row.id} />)
                            })}

                        </Picker>
                    </FormItem>
                    <Text style={styles.errorFiles}>{formErrors.category}</Text>

                    <FormItem picker>
                        <Picker
                            mode="dropdown"
                            selectedValue={subCategory}
                            placeholder="Sub Categories" onValueChange={this.onchangeSubCategories}>
                            {categories.map(row => {
                                return (<Picker.Item key={row.id} label={row.name} value={row.id} />)
                            })}

                        </Picker>
                    </FormItem>
                    <Text style={styles.errorFiles}>{formErrors.subCategory}</Text>

                    <FormItem picker>
                        <Picker
                            mode="dropdown"
                            placeholder="District"
                            selectedValue={district}
                            onValueChange={this.onchangeDistrict}>
                            {districts.map(row => {
                                return (<Picker.Item key={row.id} label={row.name} value={row.id} />)
                            })}

                        </Picker>
                    </FormItem>
                    <Text style={styles.errorFiles}>{formErrors.district}</Text>

                    <FormItem picker>
                        <Picker
                            mode="dropdown"
                            placeholder="City"
                            selectedValue={city}
                            onValueChange={this.onchangeCities}>
                            {cities.map(row => {
                                return (<Picker.Item key={row.id} label={row.name} value={row.id} />)
                            })}
                        </Picker>
                    </FormItem>
                    <Text style={styles.errorFiles}>{formErrors.city}</Text>

                    <FormItem picker>
                        <Picker
                            mode="dropdown"
                            placeholder="Price"
                            selectedValue={price}
                            onValueChange={this.onchangePrices}>
                            {prices.map(row => {
                                return (<Picker.Item key={row.id} label={row.price.toString()} value={row.id} />)
                            })}
                        </Picker>
                    </FormItem>
                    <Text style={styles.errorFiles}>{formErrors.price}</Text>

                    <View style={{ flexDirection: 'row' }} f>
                        <Input disabled placeholder='ID' value={id} />
                        <Button block dark><Text> Generate</Text></Button>
                    </View>
                    <Text style={styles.errorFiles}>{formErrors.OwnerID}</Text>

                    <FormItem floatingLabel>
                        <Label>Name</Label>
                        <Input placeholder='' value={name} onChangeText={name => this.setState({ 'name': name })} />
                    </FormItem>
                    <Text style={styles.errorFiles}>{formErrors.name}</Text>


                    <FormItem floatingLabel>
                        <Label>Address </Label>
                        <Input placeholder='' value={address} onChangeText={address => this.setState({ 'address': address })} />
                    </FormItem>
                    <Text style={styles.errorFiles}>{formErrors.address}</Text>

                    <FormItem floatingLabel>
                        <Label>Mobile No </Label>
                        <Input placeholder='' value={mobile1} onChangeText={mobile1 => this.setState({ 'mobile1': mobile1 })} />
                    </FormItem>
                    <Text style={styles.errorFiles}>{formErrors.contact_no}</Text>

                    <FormItem floatingLabel>
                        <Label>Owner Name</Label>
                        <Input placeholder='' value={owner} onChangeText={owner => this.setState({ 'owner': owner })} />
                    </FormItem>
                    <Text style={styles.errorFiles}>{formErrors.OwnerName}</Text>

                    <FormItem floatingLabel>
                        <Label>Description</Label>
                        <Input placeholder='' value={descript} onChangeText={descript => this.setState({ 'descript': descript })} />
                    </FormItem>
                    <Text style={styles.errorFiles}>{formErrors.description}</Text>


                    <FormItem floatingLabel>
                        <Label>Longtitude</Label>
                        <Input placeholder='' value={longtitude} onChangeText={longtitude => this.setState({ 'longtitude': longtitude })} />
                    </FormItem>
                    <Text style={styles.errorFiles}>{formErrors.longitude}</Text>

                    <FormItem floatingLabel>
                        <Label>Latitude</Label>
                        <Input placeholder='' value={latitude} onChangeText={latitude => this.setState({ 'latitude': latitude })} />
                    </FormItem>
                    <Text style={styles.errorFiles}>{formErrors.latitude}</Text>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', }}>
                        <Button primary onPress={() => this.addAvertiesment()}><Text> Submit </Text></Button>
                        <Button primary onPress={() => this.viewImages()}><Text>Images</Text></Button>

                    </View>


                </Form>
            </Content>
        )
    }
}

const styles = StyleSheet.create({
    errorFiles: {
        marginTop: 10,
        marginLeft: 10,
        textAlign: 'left',
        fontSize: 12,
        color: '#FF4136',
    },
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