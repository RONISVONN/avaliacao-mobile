import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#303030',
    paddingLeft: 10, 
    paddingRight: 10,
    
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#ccc'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
    color: '#ccc', 
  },
  inputFocused: {
    borderColor: '#007BFF',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  error: {
    color: '#007BFF', 
    marginTop: 10,
    marginBottom: 10,
  },
  inputError: {
    color: '#007BFF',
    marginTop: 10,
    marginBottom: 10,
  }
});

export default styles;