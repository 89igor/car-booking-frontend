import React, { useCallback, useState } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue, Modal } from "native-base";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome, SimpleLineIcons } from "@expo/vector-icons"

import { COLOR, Images, LAYOUT } from "../../../constants";

const ChangePhonePage = ({ navigation }) => {

    return (
        <Box flex={1}>
            <Box
                px={5}
                pb={3}
                pt={5}
                bg={COLOR.white}
                w="full"
                style={{
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
                <Stack direction="row" alignItems="center">

                    <View style={{ position: 'absolute' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon color={COLOR.black} size="md" as={<Ionicons name="arrow-back" />} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text
                            color={COLOR.black}
                            fontWeight="semibold"
                            fontSize="md"
                        >Change Mobile Number</Text>
                    </View>
                </Stack>

            </Box>

            <Box w="full" px={5} py={3} pb={10}>
                <VStack>
                    <Box py={3}>
                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">
                            We ask for your number to contact you about your trip and to connect hosts with guests.
                        </Text>
                    </Box>
                    <Box py={3} borderStyle="solid" borderTopWidth={1} borderColor={COLOR.inpBorderColor}>
                        <HStack justifyContent="space-between" alignItems="center">
                            <Text fontWeight="medium" fontSize="sm">Select Country</Text>
                            <HStack space={1} alignItems="center">
                                <Text fontWeight="semibold" fontSize="2xs">Egypt +20</Text>
                                <Icon color={COLOR.black} size="xs" as={<AntDesign name="right" />} />
                            </HStack>
                        </HStack>
                    </Box>
                    <Box py={3} borderStyle="solid" borderTopWidth={1} borderColor={COLOR.inpBorderColor}>
                        <VStack space={1}>
                            <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Email</Text>
                            <Text fontWeight="semibold" fontSize="xs">johnsmith@example.com</Text>
                        </VStack>
                    </Box>
                </VStack>
            </Box>

            <Box position="absolute" bottom={35} w="full" px={5}>
                <TouchableOpacity>
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
                            Save
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>
        </Box>
    )
}

export default ChangePhonePage;