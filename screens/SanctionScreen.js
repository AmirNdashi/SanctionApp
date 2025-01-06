import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const SanctionScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [employees, setEmployees] = useState([]);
  const [sanctions, setSanctions] = useState([]);
  const [viewSanctions, setViewSanctions] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'employees'));
        const employeeList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEmployees(employeeList);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch employees.');
      }
    };

    const fetchSanctions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'sanctions'));
        const sanctionList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSanctions(sanctionList);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch sanctions.');
      }
    };

    fetchEmployees();
    fetchSanctions();
  }, []);

  const handleAddSanction = async () => {
    if (!title || !employeeName || !amount || !reason) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      await addDoc(collection(db, 'sanctions'), {
        title,
        employeeName,
        amount: parseFloat(amount),
        reason,
      });
      Alert.alert('Success', 'Sanction added successfully!');
      setTitle('');
      setEmployeeName('');
      setAmount('');
      setReason('');

      const fetchSanctions = async () => {
        const querySnapshot = await getDocs(collection(db, 'sanctions'));
        setSanctions(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      };
      fetchSanctions();
    } catch (error) {
      Alert.alert('Error', 'Failed to add sanction.');
    }
  };

  const handleDeleteSanction = async (id) => {
    try {
      await deleteDoc(doc(db, 'sanctions', id));
      setSanctions(sanctions.filter((sanction) => sanction.id !== id));
      Alert.alert('Success', 'Sanction deleted successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete sanction.');
    }
  };

  const renderSanctionItem = ({ item }) => (
    <View style={styles.sanctionItem}>
      <Text style={styles.sanctionText}>{item.title}</Text>
      <View style={styles.sanctionButtons}>
        <Button
          title="Edit"
          onPress={() => navigation.navigate('EditSanctionScreen', { sanction: item })}
        />
        <Button title="Delete" color="red" onPress={() => handleDeleteSanction(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Sanction</Text>
      <TextInput
        style={styles.input}
        placeholder="Sanction Title"
        value={title}
        onChangeText={setTitle}
      />
      <Picker
        selectedValue={employeeName}
        onValueChange={(itemValue) => setEmployeeName(itemValue)}
        style={{fontSize:24,}}
      >
        <Picker.Item label="Select Employee" value="" />
        {employees.map((employee) => (
          <Picker.Item key={employee.id} label={employee.name} value={employee.name} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Amount to Deduct"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Reason for Sanction"
        value={reason}
        onChangeText={setReason}
      />
      <TouchableOpacity
                    style={{padding: 7, borderRadius: 10, alignItems: 'center', justifyContent: 'center',}}
                    onPress={handleAddSanction}
                  >
                    <Text style={{fontSize: 22, color: '#111',}}>Submit</Text>
                  </TouchableOpacity>
      <TouchableOpacity
                    style={{backgroundColor: 'green', padding: 7, borderRadius: 10, alignItems: 'center', justifyContent: 'center',}}
                    onPress={() => setViewSanctions(!viewSanctions)}
                  >
                    <Text style={{fontSize: 22, color: '#fff', marginTop: 5,}}>View Sanctions</Text>
                  </TouchableOpacity>

      {viewSanctions && (
        <FlatList
          data={sanctions}
          renderItem={renderSanctionItem}
          keyExtractor={(item) => item.id}
          style={styles.sanctionList}
        />
      )}
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
    marginBottom: 20,
    padding: 14,
    fontSize: 17,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  sanctionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
  },
  sanctionText: {
    fontSize: 17,
  },
  sanctionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
  sanctionList: {
    marginTop: 20,
  },
});

export default SanctionScreen;
