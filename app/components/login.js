import { authorize, refresh, revoke } from 'react-native-app-auth';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {useCallback, useState, useEffect} from 'react';

  function Login({navigation}) {

    const config = {
      clientId: 'nm3g1H4__kMr0GL7zwWJqg',
      redirectUrl: 'com.redditechcli://oauth2redirect/reddit',
      clientSecret: '',
      scopes: ['*'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
        tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
        revocationEndpoint: 'https://www.reddit.com/api/v1/revoke_token',
      },
    };
    
    const handleLogin = async () => {
      try {
        const result = await authorize(config);
        console.log(result);
        global.Token = result.accessToken
        console.log(global.Token)
        navigation.navigate("Home")
        // Do something with the access token
      } catch (error) {
        console.log('Authorization Error', error);
      }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login to Reddit</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login with Reddit</Text>
        </TouchableOpacity>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF4500',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default Login;