import React, { useCallback, useState, useEffect } from 'react';
import { COLOR, Images, LAYOUT, ROOT } from "../../../constants";
import { ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, Menu, Pressable, useToast } from "native-base";
import Slider from 'rn-range-slider';
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Feather, FontAwesome } from "@expo/vector-icons"
import MapView from "react-native-maps";

// import CalendarPicker from 'react-native-calendar-picker';
// import { Calendar, CalendarList } from "react-native-calendars";
// import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarList from 'react-native-calendar-list';

import { useDispatch, useSelector } from 'react-redux'
import { BottomTab } from '../../../components';

import Thumb from './../Slider/Thumb';
import Rail from './../Slider/Rail';
import RailSelected from './../Slider/RailSelected';
import Notch from './../Slider/Notch';
import Label from './../Slider/Label';

import { useApi } from '../../../redux/services'
import { Logut } from '../../../redux/actions/authActions'
import { setCarInfo } from '../../../redux/actions/authActions';

import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'

const markStyle = { dayTextStyle: { color: 'white', fontSize: 14, fontWeight: 'bold' }, dayBackgroundColor: '#08a' };

const TellCarPage = ({ navigation }) => {
    const { user } = useSelector((store) => store.auth)
    const dispatch = useDispatch()
    const { width } = Dimensions.get('window')

    const Toast = useToast()
    const Api = useApi()
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState('')

    const [position, setPosition] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });

    const onIdentifyStart = () => {
        if (!address)
            return Toast.show({ title: "Enter the Adress", placement: 'top', status: 'success', w: 300 })
        else {
            let car = {
                address: address
            };
            dispatch(setCarInfo(car))
            return navigation.navigate("VinScanScreen");
        }
    }

    const onTellCarNext = () => {
        if (!address)
            return Toast.show({ title: "Enter the Adress", placement: 'top', status: 'success', w: 300 })
        else {
            let car = {
                address: address,
                px: position.latitude,
                py: position.longitude
            };
            dispatch(setCarInfo(car))
            return navigation.navigate("VecificationCarScreen");
        }
    }

    const changePosition = (mappos) => {
        setPosition({
            latitude: mappos?.latitude,
            longitude: mappos?.longitude,
            latitudeDelta: mappos?.latitudeDelta,
            longitudeDelta: mappos?.longitudeDelta
        })

        let request = new XMLHttpRequest();
        let method = 'GET';
        let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + mappos?.latitude + ',' + mappos?.longitude + '&key=' + ROOT.mapApiKey;
        let async = true;
        request.open(method, url, async);
        request.onreadystatechange = function (datas) {
            if (request.readyState == 4 && request.status == 200) {
                let data = JSON.parse(request.responseText);
                let address = data.results[0];
                setAddress(address?.formatted_address);
            }
        };
        request.send();
    }

    const showMap = () => {
        console.log("DDd");
    }

    const onClose = () => {
        return navigation.navigate("CarHomeScreen");
    }
    useEffect(() => {
        setLoading(false);
    }, [])
    return (
        <Box
            flex={1}
            bg={{
                linearGradient: {
                    colors: [COLOR.InputBlackWhiteBg, COLOR.InputBlackWhiteBg],
                    start: [0, 1],
                    end: [0, 0]
                }
            }}
            height={'100%'}
        >
            {loading && <Loading />}
            <BottomTab navigation={navigation} />
            <Box
                pt={10}
                pb={2}
                px={5}
                style={{
                    backgroundColor: COLOR.InputBlackWhiteBg,
                    width: '100%',
                    shadowColor: "#B1A9A9",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 24,
                    // elevation: 1,
                }}
            >
                <HStack justifyContent="space-between">
                    <TouchableOpacity onPress={onClose}>
                        <Icon color={COLOR.black} size="md" as={<AntDesign name="close" />} />
                    </TouchableOpacity>
                </HStack>
            </Box>

            <Box py={3} px={5}
                bg={COLOR.InputBlackWhiteBg}>
                <HStack justifyContent="space-between" pb={5}>
                    <VStack w="100%" space={1}>
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            style={{ fontSize: 18 }}
                        >
                            Tell us about your car
                        </Text>
                    </VStack>
                </HStack>
                <HStack justifyContent="space-between" pb={4}>
                    <VStack w="100%" space={1}>
                        <Text
                            color={COLOR.inPlaceholder}
                            fontWeight="medium"
                            fontSize="xs"
                        >
                            WHERE IS YOUR CAR LOCATED?
                        </Text>
                    </VStack>
                </HStack>

                <HStack justifyContent="space-between" pb={2}>
                    <VStack w="100%" space={1}>
                        <Text
                            color={COLOR.inPlaceholder}
                            fontWeight="medium"
                            fontSize="xs"
                        >
                            Enter address?
                        </Text>
                    </VStack>
                </HStack>

                <HStack justifyContent="flex-start" pb={4}>
                    <VStack w="full" space={1}>
                        <Input
                            w="full"
                            onChangeText={setAddress}
                            isDisabled={true}
                            value={address}
                            onFocus={showMap}
                            bg={COLOR.white}
                            p={2}
                            borderStyle="solid"
                            borderWidth={1}
                            borderColor={COLOR.inpBorderColor}
                            bgColor={COLOR.InputBlackWhiteBg}
                            color={COLOR.black}
                        />
                    </VStack>
                </HStack>

                <HStack justifyContent="space-between" pb={3}>
                    <VStack w="100%" space={1} >
                        <Text
                            color={COLOR.inPlaceholder}
                            fontWeight="medium"
                            fontSize="sm"
                        >
                            WHAT CAR DO YOU HAVE?
                        </Text>
                    </VStack>
                </HStack>
                <HStack justifyContent="space-between" >
                    <VStack w="85%" space={1} >
                        <Text
                            color={COLOR.inPlaceholder}
                            fontWeight="medium"
                            fontSize="xs"
                        >
                            Identify your car
                        </Text>
                    </VStack>
                    <VStack w="15%" space={1} >
                        <Text
                            color={COLOR.IBase}
                            fontWeight="medium"
                            fontSize="sm"
                            textAlign="center"
                            onPress={onIdentifyStart}
                        >
                            Start
                            <Text color={COLOR.black} mr={2} fontWeight="semibold" fontSize="sm">
                                &nbsp;{">"}
                            </Text>
                        </Text>
                    </VStack>
                </HStack>
            </Box>
            <Box mt={2} ml={5}>
                <Stack >
                    {/* <Image source={Images.Map} h="185" resizeMode="cover" alt="image" /> */}
                    <MapView
                        style={{ width: width - 40, height: 200 }}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                        onRegionChangeComplete={changePosition}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: position.latitude,
                                longitude: position.longitude,
                            }}
                            centerOffset={{ x: -18, y: -60 }}
                            anchor={{ x: 0.69, y: 1 }}
                        />
                    </MapView>

                </Stack>
            </Box>
            <Box position="absolute" bottom={50} w="full" px={5}>
                <TouchableOpacity onPress={onTellCarNext}>
                    <Box
                        style={{
                            width: '100%',
                            height: 45,
                            backgroundColor: COLOR.IBase,
                            borderRadius: 5,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        mt={5}
                        py={2}
                    >
                        <Text
                            color={COLOR.white}
                            fontWeight="bold"
                            fontSize="md"
                        >
                            Next
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>
        </Box>
    );
};
export default TellCarPage;