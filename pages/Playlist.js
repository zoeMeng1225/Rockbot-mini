import React,{useEffect, useState} from 'react';
import { StyleSheet, 
         View, 
         TouchableOpacity, 
         ActivityIndicator, 
         Alert, 
         TouchableHighlight, 
         ScrollView} from 'react-native';
import { Header, Text, ListItem, Avatar, Image } from 'react-native-elements';
import Axios from 'axios';
import {BASE_URL, API_KEY} from '../constance';

import { Feather } from '@expo/vector-icons'; 

const SimpleIma = "https://i.pinimg.com/236x/f7/c8/e3/f7c8e3169d360dd096e3f79b772124e4.jpg";

const Playlist = () => {
  const [playnow, setPlaynow] = useState([]);
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const url = `${BASE_URL}/now_playing?queue=1`;

 
  const getData = () => {
    Axios.get(url, {
      headers: {
        authorization: API_KEY
      }
    }).then(res => {
      setQueue(res?.data?.response?.queue.map(item => {
        return{
          ...item
        }
      }));
      setPlaynow(res?.data?.response?.now_playing); 
    }).catch(e => console.log(e.message));
  } 

  useEffect(() => {
    getData()
    const interval = setInterval(() => {getData()}, 30000);
    return () => clearInterval(interval);
  }, []);


  const likehandler = (id) => {
    const VOTEUP_URL = `${BASE_URL}/vote_up?&pick_id=${id}`;
    setLoading(true)
     Axios.post(VOTEUP_URL, {}, {
      headers: {
        Authorization: API_KEY,
      }
    }).then(() => {
      getData();
      createLikeAlert();
      setLoading(false);
      console.log(`you have liked the song`)
    }).catch(e => console.log(e.message))
  }

  const unlikehandler = id => {
    const VOTEDOWN_URL = `${BASE_URL}/vote_down?&pick_id=${id}`;
    setLoading(true);
    Axios.post(VOTEDOWN_URL, {pick_id: id}, {
      headers: {
        Authorization: API_KEY,
      }
    }).then(() => {
      getData();
      createUnlikeAlert();
      setLoading(false);
      console.log(`you have disliked the song`);
    }).catch(e => console.log(e.message));
  } 

  const createLikeAlert = () => {
    Alert.alert(
      "",
      "You have liked the song",
      [{ text: "OK", onPress: () => closeAlert()}])
  }

  const createUnlikeAlert = () => {
    Alert.alert(
      "",
      "You have disliked the song",
      [{ text: "OK", onPress: () => closeAlert()}])
  }

  const closeAlert =  () => {
    setAlert(false);
  }


  return(
   <View>
     <Header
        centerComponent= {{text: 'Mini Rockbot', style: {fontWeight: '600', fontSize: 15, color: '#fff'}}}
    />
     

    <View style = {styles.mainBody}>
      {
        playnow?.length !== 0 ? (
        <View style = {styles.artistInfo}>
            <Image source={{ uri: `${playnow.artwork_large}` }} style = {styles.artistInfoImg}></Image> 
            <View style = {styles.artistInfoText}>
              <Text h4 style = {styles.bold} >{playnow.artist}</Text>
              <Text style = {{flexWrap: 'wrap', flexDirection:'row'}}>{playnow.song}</Text>
            </View>
          </View>
        ) : (
          <View style = {styles.artistInfo}>
          <Image source={{ uri: SimpleIma }} style = {styles.artistInfoImg}></Image> 
          <View style = {styles.artistInfoText}>
            <Text style = {{flexWrap: 'wrap', flexDirection:'row'}}>Failed to get information this time. Please try again.</Text>
          </View>
        </View>
        )
      }
     
      <View style = {styles.playlist}>
        <Text h5 style = {styles.title}>Coming Up</Text>
        <ActivityIndicator 
          animating={loading} 
          hidesWhenStopped={true}
          size="large"
          color="#2e91d9"
          style = {{position:'absolute', top: 150, zIndex:2, left:180}}
        />
       
        <ScrollView>
        {
          queue.length !== 0 && queue.map(item => (
            <TouchableHighlight key = {item.pick_id}>
              <ListItem bottomDivider >
                <Avatar source={{uri: `${item?.artwork_small}`}}/>
                <ListItem.Content>
                  <ListItem.Title>{item?.artist}</ListItem.Title>
                  <ListItem.Subtitle>{item?.song}</ListItem.Subtitle>    
                </ListItem.Content>
                <TouchableOpacity >
                  <Feather  name="thumbs-up" 
                            size={20} 
                            color="black" 
                            onPress = {() => {likehandler(item?.pick_id)}}/> 
                </TouchableOpacity>
                <Text>{item.likes}</Text>
                <TouchableOpacity >
                  <Feather name="thumbs-down" 
                           size={20} 
                           color="black" onPress = {() => {unlikehandler(item?.pick_id)}} />
                </TouchableOpacity>
                <Text>{item?.dislikes}</Text>
              </ListItem>
            </TouchableHighlight>
           ))
          }
      </ScrollView>
      </View>
    </View>
   </View>
  )
}


const styles = StyleSheet.create({
  artistInfo:{
    flexDirection: 'row',
    padding: 20,
  },


  artistInfoText:{
    marginLeft: 10,
    marginTop: 5
  },

  artistInfoImg:{
    width: 100, 
    height: 100,
    borderRadius:5
  },

  playlist:{
    marginTop: 20
  },

  title:{
    textDecorationLine: 'underline',
    fontWeight: '700',
    padding: 20,
  },
  
  bold: {
    fontWeight: '700', 
    flexWrap: 'wrap', 
    flexDirection:'row'
  }
});

export default Playlist;