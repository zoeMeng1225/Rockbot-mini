import React, {useEffect, useState}from 'react';
import ResultItem from './ResultItem';

import { StyleSheet, View, ScrollView } from 'react-native';
import { Header, Text, Avatar, SearchBar } from 'react-native-elements';
import {BASE_URL, API_KEY} from '../constance';
import Axios from 'axios';


const SearchPage = () => {
  const [aritst, setArtist] = useState([]);
  const [searchRes, setSearchres] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([])
 


   useEffect(() => {
    const TOP_URL = `${BASE_URL}/top_artists`;
    Axios.get(TOP_URL, {
      headers: {
        authorization: API_KEY
      }
    }).then(res => {
      setArtist(res.data.response.map(item => {
        return {
          ...item
        }
      }))
    })
  }, [])

  const handleSearch = text => {
    const SEARCH_URL = `${BASE_URL}/search_artists?query=${text}`;
    Axios.get(SEARCH_URL, {
      headers: {
        authorization: API_KEY
      }
    }).then(res => {
      setSearchres(text)
      setResult(res.data.response)
    })
  }




  return(
   <View>
      <Header
        centerComponent= {{text: 'Mini Rockbot', style: {fontWeight: '600', fontSize: 15, color: '#fff'}}}
      />

    <View style = {styles.mainbody}>
      <SearchBar 
        containerStyle = {styles.searchBar}
        placeholder = "Search artists you like"
        placeholderTextColor = "gray" 
        lightTheme
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
        aritst.length !== 0 && aritst.map(item => (
          <View style = {styles.scrollview} key = {item.artist_id}>
            <Avatar source = {{url:`${item.artwork_large}`}} containerStyle = {{marginBottom : 10}} size={70} rounded key = {item.artist_id}/>
            <Text style = {{fontSize:15, textAlign: 'center'}}>{item.artist}</Text>
          </View>
        ))
      }
      </ScrollView> 
      </View>
      )
    }
      
      <ResultItem result = {result} />
    </View>
   </View>
  )
}


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
  }



});

export default SearchPage;