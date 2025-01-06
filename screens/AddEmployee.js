// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import { db } from '../firebase';
// import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

// const AddEmployee = ({ route, navigation }) => {
//   const employee = route.params?.employee;
//   const [name, setName] = useState(employee?.name || '');
//   const [phone, setPhone] = useState(employee?.phone || '');
//   const [position, setPosition] = useState(employee?.position || '');

//   const handleSave = async () => {
//     if (name && phone && position) {
//       if (employee) {
//         const employeeDoc = doc(db, 'employees', employee.id);
//         await updateDoc(employeeDoc, { name, phone, position });
//         Alert.alert('Success', 'Employee updated successfully!');
//       } else {
//         const employeesCollection = collection(db, 'employees');
//         await addDoc(employeesCollection, { name, phone, position });
//         Alert.alert('Success', 'Employee added successfully!');
//       }
//       navigation.goBack();
//     } else {
//       Alert.alert('Error', 'Please fill out all fields.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{employee ? 'Edit Employee' : 'Add Employee'}</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Phone"
//         value={phone}
//         onChangeText={setPhone}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Position"
//         value={position}
//         onChangeText={setPosition}
//       />
//       <Button title="Save" onPress={handleSave} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginBottom: 20,
//   },
// });

// export default AddEmployee;




import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { db } from '../firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

const AddEmployee = ({ route, navigation }) => {
  const employee = route.params?.employee;

  const [name, setName] = useState(employee?.name || '');
  const [phone, setPhone] = useState(employee?.phone || '');
  const [position, setPosition] = useState(employee?.position || '');

  const handleSave = async () => {
    if (name && phone && position) {
      try {
        if (employee) {
          // Update existing employee
          await updateDoc(doc(db, 'employees', employee.id), {
            name,
            phone,
            position,
          });
          Alert.alert('Success', 'Employee updated successfully!');
        } else {
          // Add new employee
          await addDoc(collection(db, 'employees'), {
            name,
            phone,
            position,
          });
          Alert.alert('Success', 'Employee added successfully!');
        }
        navigation.goBack();
      } catch (error) {
        console.error('Error saving employee:', error);
        Alert.alert('Error', 'Could not save employee.');
      }
    } else {
      Alert.alert('Error', 'Please fill out all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{employee ? 'Edit Employee' : 'Add Employee'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Position"
        value={position}
        onChangeText={setPosition}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default AddEmployee;
