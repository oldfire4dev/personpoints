import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {
    Avatar,
} from 'react-native-paper';


import styles from './styles';
import Loading from '../Loading';


export default function PickCartoonImage({ setProfilePic, cartoons }) {
    const [isLoading, setIsLoading] = useState(true);
    const [selected, setSelected] = useState();
    const [selectedImage, setSelectedImage] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 400)
    }, [cartoons])

    function chosedImageHandle(profilePic) {
        setProfilePic(profilePic);
        setSelected(profilePic);
        setSelectedImage(true);
    }

    function changeImageHandle() {
        setSelectedImage(false);
        setProfilePic(null);
        setSelected(null);
    }

    return (
        <>
            <View style={{ marginTop: 15, }}>
                <Text>Escolha uma imagem de perfil: </Text>
            </View>
            {
                isLoading && <Loading loadingContentStyle={{ marginTop: 20, }}/>
            }
            {
                selectedImage ? 
                <View style={styles.selectedImageArea}>
                    <TouchableOpacity style={styles.selectedImage} onPress={() => changeImageHandle()}>
                        <Avatar.Image size={92} source={{ uri: selected }} />
                        <Text style={{ fontSize: 12, color: '#474747', alignSelf: 'center', }}>mudar imagem</Text>
                    </TouchableOpacity>
                </View>

                :
                <>
                    <View style={styles.cartoonPicker}>
                        <ScrollView 
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {
                                !!cartoons && cartoons.map((cartoon, index) => {
                                    if(cartoon.genre == 'guy'){
                                        return(
                                            <View key={index} >
                                                <TouchableOpacity style={styles.cartoonImg} onPress={() => chosedImageHandle(cartoon.profilePic)}>
                                                    <Avatar.Image source={{ uri: cartoon.profilePic }} />
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    }
                                })
                            }
                        </ScrollView>
                    </View>
                    <View style={styles.cartoonPicker}>
                        <ScrollView 
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {
                                !!cartoons && cartoons.map((cartoon, index) => {
                                    if(cartoon.genre == 'girl'){
                                        return(
                                            <View key={index}>
                                                <TouchableOpacity style={styles.cartoonImg} key={index} onPress={() => chosedImageHandle(cartoon.profilePic)}>
                                                    <Avatar.Image source={{ uri: cartoon.profilePic }} />
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    }
                                })
                            }
                        </ScrollView>
                    </View>
                </>
            }
        </>
    );
}