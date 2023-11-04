
import React from 'react';
import { TouchableOpacity,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileIcon = () => {
  const navigation = useNavigation();

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <TouchableOpacity onPress={handleProfilePress}>
      <Image
        source={{uri:'https://i.postimg.cc/DwRGTcqT/profile.png'}}
        style={{ width: 30, height: 30, borderRadius: 15 }}
      />
    </TouchableOpacity>
  );
};

export default ProfileIcon;
