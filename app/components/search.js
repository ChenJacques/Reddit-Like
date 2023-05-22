import React from "react";
import { View,ScrollView, RefreshControl, StyleSheet, Image, Text, Pressable,SafeAreaView} from 'react-native';
import {Icon,Card, FAB, Button, Tab, SearchBar} from 'react-native-elements';
import axios from "axios";
import { useState, useEffect } from 'react';

function Search({navigation}){
    const [search, setSearch] = useState("");
    const [redditSearch, setRedditSearch] = useState([]);

    const redirect = (name) => {
        global.threadName = name;
        navigation.navigate("SubReddit")
      };

    const updateSearch = (search) => {
        setSearch(search);
      };

      useEffect(() => {
        axios.get(`https://oauth.reddit.com/subreddits/search`, {
          params: {
            q: search,
            sort: 'relevance',
          },
          headers: {
            Authorization: 'Bearer ' + global.Token,
          }
        })
        .then(response => {
          const prevState = []
          setRedditSearch(...prevState, response.data.data.children)
          // console.log(response.data.data.children[0].data)
        })
        .catch(error => console.log(error));
    }, [search]);

  // return (
  //   <View>
  //       <View>
  //           <SearchBar placeholder="Type Here..." onChangeText={updateSearch} value={search}/>
  //       </View>
  //       <ScrollView>
  //           {redditSearch.map(search => (
  //           <Pressable onPress={() => redirect(search.data.url)}>
  //               <View>
  //                   <Text>sub : {search.data.url}</Text>
  //                   <Text>subscribers : {search.data.subscribers}</Text>
  //                   <Text>{search.data.public_description}</Text>
  //               </View>
  //           </Pressable>
  //       ))}
  //       </ScrollView>
  //   </View>
  // );
  return (
    <SafeAreaView style={{flex: 1}}>
        <View>
        <View>
             <SearchBar placeholder="Type Here..." onChangeText={updateSearch} value={search}/>
         </View>
          <ScrollView>
            <View>
              {redditSearch.map(search => (
                <View style={{zIndex: 0}}>
                  <Card>
                    <View style={{position: 'relative'}}>
                      <Pressable
                        onPress={() =>
                          redirect(
                            search.data.url,
                          )
                        }>
                        <View style={{flexDirection: 'row'}}>
                          <View>
                            {/* <GetSubRedditIcon subreddit={post.data.subreddit} /> */}
                          </View>
                          <View style={{flexDirection: 'column'}}>
                            <Text style={styles.title}>
                              {search.data.url}
                            </Text>
                            <Text style={styles.second}>
                              {search.data.subscribers}
                            </Text>
                            <Text style={styles.third}>
                              {search.data.public_description}
                            </Text>
                          </View>
                        </View>
                      </Pressable>
                    </View>
                  </Card>
                </View>
              ))}
            </View>
          </ScrollView>
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
});

export default Search;