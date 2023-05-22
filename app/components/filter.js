import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Icon, SpeedDial} from 'react-native-elements';
import {FloatingAction} from 'react-native-floating-action';
import { useNavigation } from '@react-navigation/native';
const actions = [
  {
    text: 'Best',
    icon: <Icon name="emoji-events" size={23} color="white" />,
    name: 'best',
    position: 1,
    color: 'grey',
  },
  {
    text: 'Hot',
    icon: <Icon name="local-fire-department" size={23} color="white" />,
    name: 'hot',
    position: 2,
    color: 'grey',
  },
  {
    text: 'New',
    icon: <Icon name="new-releases" size={23} color="white" />,
    name: 'new',
    position: 3,
    color: 'grey',
  },
  {
    text: 'Top',
    icon: <Icon name="grade" size={23} color="white" />,
    name: 'top',
    position: 4,
    color: 'grey',
  },
];

function Filter({page}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FloatingAction
        color='grey'
        actions={actions}
        onPressItem={name => {
          console.log(`selected button: ${name}`);
          global.filter = name;
          navigation.replace(`${page}`);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Filter;