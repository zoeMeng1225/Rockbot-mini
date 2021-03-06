import React, {useEffect, useState}from 'react';
import ResultItem from './ResultItem';

import { StyleSheet, 
         View, 
         ScrollView, 
         Modal, 
         TouchableOpacity, 
         ImageBackground, 
         Alert, 
         ActivityIndicator} from 'react-native';
import { Text, Avatar, SearchBar, ListItem} from 'react-native-elements';
import {BASE_URL, API_KEY} from '../constance';
import Axios from 'axios';

import { AntDesign } from '@expo/vector-icons'; 



const SimpleIma = "https://i.pinimg.com/236x/f7/c8/e3/f7c8e3169d360dd096e3f79b772124e4.jpg";

const SearchPage = ({navigation}) => {
  const [aritst, setArtist] = useState([]);
  const [searchRes, setSearchres] = useState('');
  const [loading, setLoading] = useState(false);
  const [artiLoad, setArtiLoad] = useState(false);
  const [result, setResult] = useState([]);
  const [isModal, setIsmodal] = useState(false);
  const [modalResult, setModalresult] = useState([]);
  const [alert, setAlert] = useState(false);

  

   useEffect(() => {
    const TOP_URL = `${BASE_URL}/top_artists`;
    Axios.get(TOP_URL, {
      headers: {
        authorization: API_KEY
      }
    }).then(res => {
      setArtist(res?.data?.response.map(item => {
        return {
          ...item
        }
      }))
    }).catch(e => console.log(e))
  }, []);


  const getTopArtistData = id => {
    const ART_URL = `${BASE_URL}/request_artist?artist_id=${id}`;
    setArtiLoad(true)
    Axios.post(ART_URL, {}, {
      headers: {
        authorization: API_KEY
      }
    }).then(res => {
      const artist = res?.data?.response?.queue.find(item => item?.artist_id === id)
      if(artist !== undefined){
        setArtiLoad(false);
        navigation.navigate('AritstList', {artist})
      }else{
        setArtiLoad(false);
        createAlert();
      }
    }).catch(e => console.log(e.message));
  };



  const handleSearch = text => {
    setLoading(true)
    const SEARCH_URL = `${BASE_URL}/search_artists?query=${text}`;
    Axios.get(SEARCH_URL, {
      headers: {
        authorization: API_KEY
      }
    }).then(res => {
      setSearchres(text);
      setResult(res?.data?.response);
      setLoading(false);
    }).catch(e => console.log(e))
  }

  const closeModal = () => {
    setIsmodal(false);
  }


  const showModal = (id) => {
    setIsmodal(true);
    setModalresult(result.find(item => item?.artist_id === id));
  }

  const createAlert = () => {
    Alert.alert(
      "",
      "Sorry, we currently can not find the information; Please try again.",
      [{ text: "OK", onPress: () => closeAlert()}]
    );
}

  const closeAlert =  () => {
    setAlert(false);
  }


  return(
    <>
   <View>
        {
          modalResult.length !== 0 && 
          <Modal
            animationType= 'slide'
            visible={isModal}
            transparent= {true}
            onRequestClose= {() => closeModal()}
            overFullScreen
            style= {{backgroundColor:'#000'}}
         >
           
          <View style = {styles.modalContainer}>
            <ImageBackground 
              source = {modalResult?.artwork_large.includes("noimage") ? {uri: SimpleIma} : {uri: `${modalResult?.artwork_large}`}} 
              style = {styles.modalbg}>
                <View style = {styles.modalbg_child}>
                <TouchableOpacity onPress = {closeModal}>
                  <AntDesign name="close" size={24} color="black" style= {{textAlign:'right',marginRight: 10, marginTop:10}}/>
                </TouchableOpacity>
                  <Text h3 style = {{textAlign:'center', marginTop:10}}>{modalResult?.artist}</Text>
                  <Text style = {{marginTop:10, marginBottom:10, fontWeight:'800'}}>Top Songs</Text>
                  <ListItem containerStyle = {{backgroundColor:'transparent'}}>
                    <Avatar source = {modalResult?.artwork_small.includes("noimage") ? {uri: SimpleIma}: {uri: `${modalResult?.artwork_small}`}}/>
                    <ListItem.Content>
                    <ListItem.Title>{modalResult?.artist}</ListItem.Title>
                    <ListItem.Subtitle>{modalResult?.artist}</ListItem.Subtitle>
                  </ListItem.Content>
                  </ListItem>
                </View>
            </ImageBackground>
          </View>
        </Modal>
        }
          
      <View style = {styles.mainbody}>
        <SearchBar 
          containerStyle = {styles.searchBar}
          placeholder = "Search artists you like"
          placeholderTextColor = "gray" 
          lightTheme
          showLoading = {loading}
          round
          showCancel
          inputContainerStyle = {{backgroundColor: '#fff'}}
          focus
          value = {searchRes}
          onChangeText= {e => handleSearch(e)}
          />
        {
          searchRes.length === 0 && (
            <View style = {{padding: 20}}>  
            <Text style = {styles.title}>Top Artists</Text>
            <ScrollView 
                style = {styles.avatars}   
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
          {
            aritst?.length !== 0 && aritst.map(item => (
              <View style = {styles.scrollview} key = {item?.artist_id}>
                <TouchableOpacity onPress = {() => getTopArtistData(item?.artist_id)}>
                  <Avatar 
                    source = {{url:`${item?.artwork_large}`}} 
                    containerStyle = {{marginBottom : 10}} 
                    size={70} 
                    rounded 
                    key = {item?.artist_id} 
                  />
                </TouchableOpacity>
                <Text style = {{fontSize:15, textAlign: 'center'}}>{item?.artist}</Text>
              </View>
            ))}
        </ScrollView> 
        <ActivityIndicator 
          animating={artiLoad} 
          hidesWhenStopped={true}
          size="large"
          color="#2e91d9"
        />
        </View>
      )}
      <ResultItem result = {result}  showModal = {showModal}/>
    </View>
   </View>
   </>
  )}


const styles = StyleSheet.create({
  title:{
    textDecorationLine: 'underline',
    fontWeight: '700',
    fontSize: 18
  },

  avatars:{
    paddingVertical: 8
  },

  searchBar:{
    backgroundColor:'transparent',
    borderTopWidth:0,
    borderBottomWidth:0,
    marginBottom: 15
  },

  scrollview:{
    width:90,
    padding:10,
    textAlign:'center'
  },

  modalContainer:{
    flex: 1,
    flexDirection: "column",
    position:'relative',
    height:'100%',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },

  modalbg:{
    flex: 1,
    resizeMode:'cover',
    height:'100%',
    position:'absolute',
    bottom:-160,
    right:0,
    left:0,
  },

  modalbg_child:{
    padding:10,
    backgroundColor:'rgba(219,219,219,0.9)',
    position:'absolute',
    width:'100%',
    bottom:'10%',
    height:'60%',
  }

});

export default SearchPage;