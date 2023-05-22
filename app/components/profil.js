import React from "react";
import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import {Icon, FAB, Button, Tab} from 'react-native-elements';
import axios from "axios";
import { useState, useEffect } from 'react';

function Profil({navigation}){
  const [subreddits, setSubreddits] = useState([]);
  const [posts, setPosts] = useState([]);
  const [User, setUser] = useState({all: null});


  useEffect(() => {
    // Fetch the user's ic
    console.log(global.Token)
    axios.get(`https://oauth.reddit.com/api/v1/me`, {
      headers: {
        Authorization: 'Bearer ' + global.Token,
      }
    })
    .then(response => setUser({all: response.data}))
    .catch(error => console.log(error));
  }, []);

//   useEffect(() => {
//     // Fetch the user's subscribed subreddits
//     axios.get(`https://www.reddit.com/subreddits/mine/subscriber.json`)
//     .then(response => setSubreddits(response))
//     .catch(error => console.log(error));
//     console.log(subreddits)
// }, []);

  // useEffect(() => {
  //   axios.get('https://www.reddit.com/best')
  //     .then(response => setPosts(response.data))
  //     .catch(error => console.log(error));
  // }, []);

  
  return (
    <View>
      {!global.Token ? (
        <View style={{height: '100%'}}>
          <FAB
            title="Login"
            style={{height: '100%'}}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      ) : (
        <View>
          {!User.all ? (
            <View style={{height: '100%'}}>
              <ActivityIndicator
                style={{height: '100%'}}
                size="large"
              />
            </View>
          ) : (
            <View style={{height: '100%', backgroundColor: 'white'}}>
              <View style={styles.header}>
                <Image
                  style={styles.banner}
                  source={{uri: User.all.subreddit.banner_img.split('?')[0]}}
                />
              </View>
              <Image
                style={styles.avatar}
                source={{uri: User.all.icon_img.split('?')[0]}}
              />
              <View style={styles.body}>
                <View>
                  <Text style={styles.name}>{User.all.name}</Text>
                  <Text style={styles.description}>
                    {User.all.subreddit.display_name_prefixed} ○ {User.all.total_karma} karma
                  </Text>
                  <Text style={styles.description}>
                    {User.all.subreddit.public_description}
                  </Text>
                  <Text style={styles.followers}>
                    {User.all.subreddit.subscribers} followers
                  </Text>
                </View>
              </View>
              <FAB
                title="Settings"
                color="grey"
                placement="right"
                onPress={() => navigation.navigate('Settings')}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'grey',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'black',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  banner: {
    width: '100%',
    height: 200,
    alignSelf: 'center',
  },
  body: {
    marginTop: 70,
  },
  name: {
    fontSize: 28,
    color: 'black',
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  followers: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 30,
    textAlign: 'center',
  },
});

export default Profil;
