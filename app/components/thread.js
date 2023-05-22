import React from "react";
import { View,ScrollView, RefreshControl, StyleSheet, Image, Text,} from 'react-native';
import {Icon, FAB, Button, Tab, SearchBar} from 'react-native-elements';
import axios from "axios";
import { useState, useEffect } from 'react';

function Thread({navigation}){

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`https:/reddit.com/`+ global.threadName+ `/comments/` +global.threadId+`.json`, {
          headers: {
            Authorization: 'Bearer ' + global.Token,
          }
        })
        .then(response => {
          const prevState = []
          setPosts(...prevState, response.data[0].data.children.children)
          console.log(posts)
        })
        .catch(error => console.log(error));
    }, []);

  return (
    <View>
        <View>
        <Text>{global.threadId}</Text>
        </View>
        <View>
            <Text>Comments</Text>
        </View>
    </View>
  );

};

export default Thread;