import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
    paddingLeft: 10, 
    paddingRight: 10,
  },
  textMsG: {
    fontSize: 18,
  },
  userContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between', // Alinha os elementos dentro do userContainer
    alignItems: 'center', // Centraliza os elementos verticalmente
  },
  userTextContainer: {
    flex: 1,
  },
  userTextName: {
    fontSize: 20,
    color: '#ccc',
    fontWeight: 'bold',
  },
  userTextUserName: {
    fontSize: 18,
    color: '#ccc'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
  },
});