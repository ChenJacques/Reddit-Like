import React from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Image,
  Text,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {Icon, Card, FAB, Button, Tab, SearchBar} from 'react-native-elements';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Filter from './filter';

const GetSubRedditIcon = props => {
  const [SubReddit, setSubReddit] = useState({all: null});

  const options = {
    method: 'GET',
    url: 'https://www.reddit.com/r/' + props.subreddit + '/about.json',
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (res) {
        setSubReddit({
          all: res.data,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
    // console.log(SubReddit.all);
  }, []);
  return (
    <View>
      {!SubReddit.all ? (
        <></>
      ) : (
        <Image
          style={styles.avatar}
          source={{uri: SubReddit.all.data.icon_img}}
        />
      )}
    </View>
  );
};

function Home({navigation}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const redirect = (id, name) => {
    global.threadId = id;
    global.threadName = name;
    navigation.navigate('Thread');
  };

  useEffect(() => {
    axios
      .get(`https:/reddit.com/` + global.filter + `.json`, {
        headers: {
          Authorization: 'Bearer ' + global.Token,
        },
      })
      .then(response => {
        const prevState = [];
        setPosts(...prevState, response.data.data.children);
      })
      .catch(error => console.log(error));

    navigation.setOptions(
      {
        title: 'Redditech',
        headerRight: () => (
          <View style={{flexDirection: 'row', marginRight: 7}}>
            <Icon
              name="search"
              color="black"
              size={30}
              onPress={() => navigation.navigate('Search')}
            />
            <Icon
              name="person"
              color="black"
              size={30}
              onPress={() => navigation.navigate('Profil')}
            />
          </View>
        ),
      },
      [navigation],
    );
  },[]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <ActivityIndicator style={{height: '100%'}} size="large" />
      ) : (
        <View>
          <Text>{global.filter}</Text>
          <ScrollView>
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
                            {/* <GetSubRedditIcon subreddit={post.data.subreddit} /> */}
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
                            <Icon
                              name="arrow-circle-down"
                              color="#000000"
                              size={20}
                            />
                          </View>
                        </View>
                      </Pressable>
                    </View>
                  </Card>
                </View>
              ))}
            </View>
          </ScrollView>
          <Filter page="Home"/>
        </View>
      )}
    </SafeAreaView>
  );
}

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

export default Home;
