import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const TaskScreen = ({ navigation }) => {
  const [taskName, setTaskName] = useState('');
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [viewTasks, setViewTasks] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'employees'));
        const employeeList = querySnapshot.docs.map((doc) => ({
          label: doc.data().name,
          value: doc.id,
        }));
        setEmployees(employeeList);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch employees.');
      }
    };

    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tasks'));
        const taskList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(taskList);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch tasks.');
      }
    };

    fetchEmployees();
    fetchTasks();
  }, []);

  const handleAssignTask = async () => {
    if (!taskName || selectedEmployees.length === 0) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'tasks'), {
        taskName,
        assignedTo: selectedEmployees,
      });
      Alert.alert('Success', 'Task assigned successfully!');
      setTaskName('');
      setSelectedEmployees([]);
      const fetchTasks = async () => {
        const querySnapshot = await getDocs(collection(db, 'tasks'));
        setTasks(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      };
      fetchTasks();
    } catch (error) {
      Alert.alert('Error', 'Failed to assign task.');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      setTasks(tasks.filter((task) => task.id !== id));
      Alert.alert('Success', 'Task deleted successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete task.');
    }
  };

  const renderTaskItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.taskName}</Text>
      <View style={styles.taskButtons}>
        <Button
          title="Edit"
          onPress={() => navigation.navigate('EditTaskScreen', { task: item })}
        />
        <Button title="Delete" color="red" onPress={() => handleDeleteTask(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assign Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={taskName}
        onChangeText={setTaskName}
      />
      <DropDownPicker
        open={open}
        value={selectedEmployees}
        items={employees}
        setOpen={setOpen}
        setValue={setSelectedEmployees}
        setItems={setEmployees}
        multiple={true}
        mode="BADGE"
        placeholder="Select Employees"
        min={0}
        badgeStyle={styles.badgeStyle}
        badgeTextStyle={styles.badgeTextStyle}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />
      <Button title="Assign Task" onPress={handleAssignTask} style={{padding: 10,}} />
      <View style={{padding:10,}}></View>
      <Button 
        title="View Tasks"
        onPress={() => setViewTasks(!viewTasks)}
        color="blue"
        style={{ marginTop: 50, marginBottom: 20, }}
      />

      {viewTasks && (
        <FlatList
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id}
          style={styles.taskList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  AssignButton: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dropdown: {
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdownContainer: {
    borderColor: '#ccc',
  },
  badgeStyle: {
    backgroundColor: '#e3e3e3',
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 2,
  },
  badgeTextStyle: {
    color: '#333',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
  },
  taskText: {
    fontSize: 16,
  },
  taskButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
  taskList: {
    marginTop: 20,
  },
});

export default TaskScreen;
