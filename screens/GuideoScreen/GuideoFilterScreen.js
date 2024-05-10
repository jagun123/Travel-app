import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import GuideoQuestionScreen from './GuideoQuestionScreen';

const FilterScreen = ({ data }) => {
  const [selectedPlace, setSelectedPlace] = useState({ id: 'all', title: 'All' });
  const [selectedPriority, setSelectedPriority] = useState({ id: 'all', title: 'All' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
  };

  const handlePrioritySelect = (priority) => {
    setSelectedPriority(priority);
  };

  const places = [
    { id: "1", title: "Food" },
    { id: "2", title: "Hotel" },
    { id: "3", title: "Cafe" },
    { id: "4", title: "Resorts" },
    { id: "5", title: "Tourist spot" },
  ];

  const priority = [
    { id: "1", title: "High", backgroundColor: '#FF8787' },
    { id: "2", title: "Medium", backgroundColor: '#FFE071' },
    { id: "3", title: "Low", backgroundColor: '#7AFFB8' },
  ];

  const filteredData = data.filter(item => {
    if (selectedPlace.id !== 'all' && item.category.title !== selectedPlace.title) {
      return false;
    }
    if (selectedPriority.id !== 'all' && item.priority !== selectedPriority.title) {
      return false;
    }
    return true;
  });
  

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.filter}>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>Explore Questions</Text>
        <View>
          <TouchableOpacity onPress={handleFilterToggle}>
            <Ionicons name="filter" size={18} color="white" style={{ marginTop: 20 }} />
          </TouchableOpacity>
        </View>
      </View>
      {isFilterOpen && (
        <View style={styles.filterdata1}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            <View style={styles.filterdata}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={[{ id: 'all', title: 'All' }, ...places]}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handlePlaceSelect(item)}>
                    <Text style={[styles.title, { backgroundColor: selectedPlace.id === item.id ? "#FFD385" : "#FFF1D840", color: selectedPlace.id === item.id ? "#fff" : "#D7D7D7" }]}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          </ScrollView>
          <View style={styles.view13}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[{ id: 'all', title: 'All' }, ...priority]}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePrioritySelect(item)}>
                  <Text style={[styles.text3, { backgroundColor: selectedPriority.id === item.id ? "#FFD385" : item.backgroundColor }]}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      )}
      <View style={{
        backgroundColor:'#191919',
        flex:1,
        marginTop:10,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        height:736
       }}>
      <GuideoQuestionScreen data={filteredData} />
      </View>
    </View>
  );
}
 
export default FilterScreen;


const styles = StyleSheet.create({
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  filterdata1: {
    paddingVertical: 10,
  },

  filterdata: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
  },
  title: {
    color:"#fff",
    fontSize:14,
    fontWeight:"bold",
    textAlign:"center",
    paddingHorizontal:25,
    borderRadius:50,
    backgroundColor:"#3E3E3E",
    lineHeight:16,
    padding:9,
    marginHorizontal: 5,
    opacity: 0.7,
  },
  view13: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    marginHorizontal: 20,
  },
  text3: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
    borderRadius: 50,
    lineHeight: 15,
    padding: 9,
    marginHorizontal: 5,
    opacity: 0.7,
  },
});
