import React, { useContext, useCallback, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Close,
  DarkModeIcon,
  HelpIcon,
  Language,
  LeftIcon,
  LocationIcon,
  NotificationIcon,
  RightIcon,
  TimeIcon2,
} from '../../components/icons';

import { AuthContext, ThemeContext } from '../../context';

const SettingsView = ({ navigation }) => {
  const { mode, setDarkMode, darkMode } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const tabs = [
    {
      id: 'darkMode',
      title: 'Dark Mode',
      switch: true,
      icon: <DarkModeIcon width={24} color={mode.colors.icon} />,
      switchComp: (
        <Switch
          style={{ marginLeft: 'auto', width: 36, height: 24 }}
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{
            false: '#c4c4c4',
            true: mode.colors.primary,
          }}
          thumbColor={'#f4f3f4'}
        />
      ),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      switch: true,
      icon: <NotificationIcon width={24} color={mode.colors.icon} />,
      switchComp: (
        <Switch
          style={{ marginLeft: 'auto', width: 36, height: 24 }}
          onValueChange={toggleSwitch}
          value={isEnabled}
          trackColor={{ false: '#c4c4c4', true: mode.colors.primary }}
          thumbColor={'#f4f3f4'}
        />
      ),
    },
    {
      id: 'news',
      title: 'News by location',
      switch: true,
      icon: <LocationIcon width={24} color={mode.colors.icon} />,
      switchComp: (
        <Switch
          style={{ marginLeft: 'auto', width: 36, height: 24 }}
          // onValueChange={toggleSwitch}
          // value={isEnabled}
          trackColor={{ false: '#c4c4c4', true: mode.colors.primary }}
          thumbColor={'#f4f3f4'}
        />
      ),
    },
    {
      id: 'timeToRead',
      title: 'Time to read',
      switch: false,
      icon: <TimeIcon2 width={24} color={mode.colors.icon} />,
    },
    {
      id: 'language',
      title: 'Language',
      switch: false,
      icon: <Language width={24} color={mode.colors.icon} />,
    },
    {
      id: 'block',
      title: 'Block content and sources',
      switch: false,
      icon: <Close width={24} color={mode.colors.icon} />,
    },
    {
      id: 'help',
      title: 'Help',
      switch: false,
      icon: <HelpIcon width={24} color={mode.colors.icon} />,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      console.log(user);
      StatusBar.setBarStyle(darkMode ? 'light-content' : 'dark-content');
      // StatusBar.setTranslucent(false);
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(mode.colors.background);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [darkMode]),
  );

  const renderItem = ({ item }) => (
    <View style={styles.preferences}>
      <View style={styles.border}>{item.icon}</View>
      <Text
        style={{
          paddingLeft: 24,
          fontSize: 16,
          color: mode.colors.icon,
        }}
      >
        {item.title}
      </Text>
      {item.switch ? (
        item.switchComp
      ) : (
        <TouchableOpacity
          style={{ marginLeft: 'auto' }}
          // onPress={
          //   item.id === 'language'
          //     ? toggleBottomSheet
          //     : () => console.log('clicked')
          // }
        >
          <RightIcon width={24} color={mode.colors.icon} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View
      style={{
        backgroundColor: mode.colors.background,
        flex: 1,
        paddingVertical: 20,
      }}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.leftButton}>
          <LeftIcon width={24} color={mode.colors.icon} />
        </TouchableOpacity>
        <Text style={{ color: mode.colors.foreground, fontSize: 24 }}>
          Settings
        </Text>
      </View>

      {/* User Info */}
      <View style={{ padding: 20 }}>
        <View style={styles.userInfo}>
          <Image
            source={{
              uri:
                'https://images.unsplash.com/photo-1593642702909-dec73df255d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
            }}
            style={{ width: 64, height: 64, borderRadius: 9999 }}
          />
          <View style={styles.userInfoTextContainer}>
            <Text style={{ color: mode.colors.icon, marginTop: 6 }}>
              Enes Tatli
            </Text>
            <Text style={{ color: mode.colors.icon, marginTop: 6 }}>
              {user.email}
            </Text>
          </View>
          <View
            style={{
              marginLeft: 'auto',
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: mode.colors.primary,
                width: 60,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 6,
              }}
              onPress={() => logout()}
            >
              <Text style={{ color: 'white' }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Preferences */}
      <View style={{ flex: 1, marginHorizontal: 20, marginTop: 20 }}>
        <Text
          style={{ fontSize: 16, fontWeight: 'bold', color: mode.colors.icon }}
        >
          Prefrences
        </Text>
        <FlatList
          data={tabs}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      </View>
      {/* son */}
    </View>
  );
};

export default SettingsView;

const styles = StyleSheet.create({
  headerContainer: {
    height: 44,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButton: {
    position: 'absolute',
    left: 0,
    top: 10,
    paddingHorizontal: 20,
    height: '100%',
  },
  userInfoContainer: {
    padding: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoTextContainer: {
    marginLeft: 12,
  },
  preferences: {
    // height: 48,
    height: (Dimensions.get('screen').height - 44 - 84) / 14,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginTop: 12,
  },
  border: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#c4c4c4',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoText: {
    marginTop: 6,
  },
  languageButton: {
    // flex: 1,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: '100%',
    backgroundColor: '#f4f3f4',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#ffffff',
  },
});