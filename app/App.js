import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/login';
import Home from './components/home'
import Profil from './components/profil';
import Settings from './components/settings';
import Thread from './components/thread';
import Search from './components/search';
import SubReddit from './components/subreddit';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Settings" component={Settings}/>
      <Stack.Screen name="Thread" component={Thread}/>
      <Stack.Screen name="Profil" component={Profil}/>
      <Stack.Screen name="Search" component={Search}/>
      <Stack.Screen name="SubReddit" component={SubReddit}/>
    </Stack.Navigator>
  );
}

export default function App() {

  global.Token = null;
  global.threadId = null;
  global.threadName = null;
  global.filter = 'best';

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" hidden={false} backgroundColor="#130f40" translucent={true}/>
      <MyStack />
    </NavigationContainer>
  );
}
