import React from "react";
import { View,ScrollView, RefreshControl, StyleSheet, Image, Text, Pressable, SafeAreaView} from 'react-native';
import {Icon,Card, FAB, Button, Tab, SearchBar} from 'react-native-elements';
import axios from "axios";
import { useState, useEffect } from 'react';
import Filter from './filter';

function SubReddit({navigation}){

    const [posts, setPosts] = useState([]);
    const [sub, setSub] = useState([]);
    const [status, setStatus] = useState();
    const [subredditFullName, setSubRedditFullName]= useState();

    useEffect(() => {
      axios.get(`https:///oauth.reddit.com`+global.threadName+`about.json`, {
        headers: {
          Authorization: 'Bearer ' + global.Token,
        }
      })
      .then(response => {x
        const prevState = []
        setSub(...prevState, response.data.data)
        setStatus(response.data.data.user_is_subscriber);
        setSubRedditFullName(response.data.data.name);
      })
      .catch(error => console.log(error));
  }, [status]);

    useEffect(() => {
        axios.get(`https://reddit.com`+global.threadName+global.filter+`.json`, {
          headers: {
            Authorization: 'Bearer ' + global.Token,
          }
        })
        .then(response => {
          const prevState = []
          setPosts(...prevState, response.data.data.children)
        })
        .catch(error => console.log(error));
    }, [status]);

    const redirect = (id, name) => {
      global.threadId = id;
      global.threadName = name;
      navigation.navigate('Thread');
    };

    const subscribe = () => {
      let subscribeAction = '';

      if (status == false) {
        subscribeAction = 'sub'
        setStatus(true)
      } else {
        subscribeAction = 'unsub'
        setStatus(false)
      }

      const headers = {
        'Authorization': `Bearer ${global.Token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      // set the API endpoint url
      const url = 'https://oauth.reddit.com/api/subscribe';

      // set the request body parameters
      const data = {
        action: subscribeAction,
        sr: subredditFullName,
      };

      // make the POST request to subscribe to the subreddit
      axios.post(url, data, { headers })
        .then((response) => {
          // console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

  return (
    <SafeAreaView style={{flex: 1}}>
        <View>
          <ScrollView>
        <View style={{backgroundColor: 'white'}}>
            <View style={styles.header}>
              <Image
                style={styles.banner}
                source={{uri: sub.header_img}}
              />
            </View>
            <Image
              style={styles.avatar}
              source={{uri: sub.icon_img}}
            />
            <View style={styles.body}>
              <View>
                <Text style={styles.name}>
                  {sub.display_name_prefixed}
                </Text>
                <Text style={styles.detail}>
                  {sub.subscribers} subscribers ○{' '}
                  {sub.active_user_count} online
                </Text>
                <Text style={styles.description}>
                  {sub.public_description}
                </Text>
              </View>
            </View>
          </View>
            <View>
              {status == false ? (<Button title="Subscribe" onPress={subscribe}/>
              ) : (
                  <Button title="Unsubscribe" onPress={subscribe}/>
              )}
            </View>
            <View>
              {posts.map(post => (
                <View style={{zIndex: 0}}>
                  <Card>
                    <View style={{position: 'relative'}}>
                      <Pressable
                        onPress={() =>
                          redirect(
                            post.data.id,
                            post.data.subreddit_name_prefixed,
                          )
                        }>
                        <View style={{flexDirection: 'row'}}>
                          <View>
                          </View>
                          <View style={{flexDirection: 'column'}}>
                            <Text style={styles.title}>
                              {post.data.subreddit_name_prefixed}
                            </Text>
                            <Text style={styles.second}>
                              {post.data.author}
                              {post.data.created}
                            </Text>
                          </View>
                        </View>
                        <View style={{alignItems: 'center'}}>
                          <Text style={styles.third}>{post.data.title}</Text>
                          <Image
                            style={{
                              width: post.data.thumbnail_width * 2,
                              height: post.data.thumbnail_height * 2,
                              marginVertical: 10,
                            }}
                            resizeMode="cover"
                            source={{uri: post.data.thumbnail}}
                          />
                          <View style={{flexDirection: 'row'}}>
                            <Icon
                              name="arrow-circle-up"
                              color="#000000"
                              size={20}
                            />
                            <Text style={styles.fourth}>{post.data.score}</Text>
                          </View>
                        </View>
                      </Pressable>
                    </View>
                  </Card>
                </View>
              ))}
            </View>
          </ScrollView>
          <Filter page="SubReddit"/>
        </View>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  second: {
    color: 'black',
    alignItems: 'center',
  },
  third: {
    color: 'black',
    alignItems: 'center',
    marginTop: 10,
  },
  fourth: {
    color: 'black',
    marginLeft: 5,
    marginRight: 5,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 63,
    borderWidth: 1,
    borderColor: 'black',
    margin: 5,
  },
  header: {
    backgroundColor: '#ffa31a',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    position: 'absolute',
    marginTop: 130,
  },
  banner: {
    width: '100%',
    height: 200,
    alignSelf: 'center',
  },
  body: {
    marginLeft: 15,
    marginTop: 60,
  },
  name: {
    fontSize: 28,
    color: 'black',
    fontWeight: '600',
    textAlign: 'left',
  },
  detail: {
    fontSize: 16,
    color: '#696969',
    marginTop: 1,
    textAlign: 'left',
  },
  description: {
    fontSize: 18,
    color: 'black',
    marginTop: 15,
    marginRight: 5,
    textAlign: 'left',
    padding:20,
  },
});

export default SubReddit;