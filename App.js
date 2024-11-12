import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
  
export default function App() {
  const { control, handleSubmit, formState: { errors }, setError, reset } = useForm();
  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = (data) => {
    let hasErrors = false;
  
    if (!data.name) {
      setError("name", { type: "manual", message: "Name is required" });
      hasErrors = true;
    }  else if (data.name.length < 3) {
      setError("name", { type: "manual", message: "Name must be at least 3 characters long" });
      hasErrors = true;
    }

    if (!data.email) {
      setError("email", { type: "manual", message: "Email is required" });
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      setError("email", { type: "manual", message: "Invalid email format" });
      hasErrors = true;
    }
    
    if (!data.password) {
      setError("password", { type: "manual", message: "Password is required" });
      hasErrors = true;
    } else if (data.password.length < 6) {
      setError("password", { type: "manual", message: "Password must be at least 6 characters" });
      hasErrors = true;
    }

    if (!hasErrors) {
      setSubmittedData(data);
      alert("Form submitted successfully!");
    }
  };

  const onReset = () => {
    reset();
    setSubmittedData(null); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      <Controller
        control={control}
        name="name"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
          </>
        )}
      />
      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
          </>
        )}
      />
      <Controller
        control={control}
        name="password"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
          </>
        )}
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      <View style={styles.resetButton}>
        <Button title="Reset" color="red" onPress={onReset} />
      </View>
      {submittedData && (
        <View style={styles.result}>
          <Text style={styles.resultText}>Submitted Data:</Text>
          <Text>Name: {submittedData.name}</Text>
          <Text>Email: {submittedData.email}</Text>
          <Text>Password: {submittedData.password}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  resetButton: {
    marginTop: 10,
  },
  result: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  resultText: {
    fontWeight: 'bold',
  },
});