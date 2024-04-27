import React from "react";
import firestore from '@react-native-firebase/firestore';
import { View, ScrollView, Text, FlatList } from "react-native";
import { Appbar, TextInput, Button } from 'react-native-paper';
import Todo from './component/todo'

function App(){
  const [todo, setTodo] = React.useState('');
  const ref = firestore().collection('todos');
  const [ loading, setLoading ] = React.useState(true);
  const [ todos, setTodos ] = React.useState([]);
  async function addTodo(){
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo('');
  }
  React.useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {title, complete} = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });
      setTodos(list);
      if (loading){
        setLoading(false);
      }
    });
  });
  if (loading) {
    return null;
  }

  return (
    <View style={{flex:1}}>
      <Appbar>
        <Appbar.Content title={'TODOs List'} />
      </Appbar>
      <FlatList
        style={{flex: 1}}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Todo {...item} />}
        />
      <TextInput label= {'New Todo'} value={todo} onChangeText={(text) => setTodo(text)} />
      <Button onPress = {addTodo}>Add TODO</Button>
    </View>
  );
}

export default App;