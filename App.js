import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';

export default function App() {
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [userGuess, setUserGuess] = useState('');
  const [guessCount, setGuessCount] = useState(0);
  const inputRef = useRef();

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleGuess = () => {
    const guess = parseInt(userGuess);

    if (isNaN(guess) || guess < 1 || guess > 100) {
      Alert.alert('Invalid Input', 'Please enter a valid number between 1 and 100.');
      return;
    }

    setGuessCount((prevCount) => prevCount + 1);

    if (guess === targetNumber) {
      Alert.alert(
        'Congratulations!',
        `You guessed the number in ${guessCount} ${guessCount === 1 ? 'guess' : 'guesses'}.`,
        [{ text: 'OK', onPress: resetGame }]
      );
      setUserGuess('');
      inputRef.current.focus();
    } else if (guess < targetNumber) {
      Alert.alert('Too Low', 'Try a higher number.', [{ text: 'OK' }]);
    } else {
      
      Alert.alert('Too High', 'Try a lower number.', [{ text: 'OK' }]);
    }
  };

  const resetGame = () => {
    setTargetNumber(generateRandomNumber());
    setGuessCount(0);
    setUserGuess('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess the number</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Enter your guess'
        value={userGuess}
        onChangeText={(text) => setUserGuess(text)}
        ref={inputRef}
      />

      <View style={styles.button}>
      <Button title='Make guess' onPress={handleGuess} />
      </View>
      <Text style={styles.guessCount}>{`Guesses: ${guessCount}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
    textAlign: 'center',
  },
  guessCount: {
    marginTop: 20,
  },
  button: {
    marginVertical: 30,
    marginRight:40,
    marginLeft:40,
   marginTop:10,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:'#beceed',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  }
});
