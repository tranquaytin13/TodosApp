import React from "react";
import fireStore from '@react-native-firebase/firestore';
import { List } from 'react-native-paper';

function Todo({ id, title, complete}) {
    async function toggleComplete(){
        await fireStore()
        .collection('todos')
        .doc(id)
        .update({
            complete: !complete,
        });
    }
    return (
        <List.Item
            title={title}
            onPress={() => toggleComplete()}
            left={props => (
                <List.Icon {...props} icon={complete ? 'check' : 'cancel'} />
            )}
        />
    );
}

export default Todo;