import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, Fragment} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Text,
  View,
  Platform,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const emojis = [
  '😀',
  '😁',
  '😂',
  '🤣',
  '😃',
  '😄',
  '😅',
  '😆',
  '😇',
  '😉',
  '😊',
  '🙂',
  '🙃',
  '😋',
  '😌',
  '😍',
  '👀',
];

const windowHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('screen').width;

interface MainProps {
  navigation: any;
}

const Main = ({navigation}: MainProps) => {
  const [uid, setUid] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);

  async function checkLoginStatus() {
    const storedUserCredentials = await AsyncStorage.getItem('userCredentials');
    if (storedUserCredentials) {
      const userCredentials = JSON.parse(storedUserCredentials);
      const uid = userCredentials.currentUser?.uid;
      setUid(uid);
    }
  }

  console.log('UID:', uid);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const shuffledEmojis = shuffle(emojis.concat(emojis));
    const initialCards = shuffledEmojis.map((emoji: string, index: number) => ({
      id: index,
      emoji: emoji,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(initialCards);
    setSelectedCards([]);
    setScore(0);
  }, []);

  const shuffle = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const flipCard = (id: number) => {
    const newCards = [...cards];
    const selectedCard = newCards.find(card => card.id === id);

    if (selectedCard?.isMatched || selectedCards.length === 2) {
      return;
    }

    if (selectedCard) {
      selectedCard.isFlipped = true;
      setSelectedCards([...selectedCards, selectedCard]);

      if (selectedCards.length === 1) {
        if (selectedCard.emoji === selectedCards[0].emoji) {
          selectedCard.isMatched = true;
          selectedCards[0].isMatched = true;
          setScore(score => score + 2);
        } else {
          setTimeout(() => {
            selectedCard.isFlipped = false;
            selectedCards[0].isFlipped = false;
            setScore(score => score - 1);
          }, 300);
        }
        setSelectedCards([]);
      }
      setCards(newCards);
    }
  };

  const resetGame = () => {
    const shuffledEmojis = shuffle(emojis.concat(emojis));
    const initialCards = shuffledEmojis.map((emoji: string, index: number) => ({
      id: index,
      emoji: emoji,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(initialCards);
    setSelectedCards([]);
    setScore(0);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userCredentials');
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.area}>
      <ScrollView
        style={{backgroundColor: 'black'}}
        scrollEnabled={Platform.OS === 'ios' ? false : true}>
        <Fragment>
          <View style={styles.container}>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}>
                <Text style={{color: 'white'}}>Logout</Text>
              </TouchableOpacity>
              <Text style={styles.scoreText}>Score: {score}</Text>
              <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.gameBoard}>
              {cards.map(card => (
                <TouchableOpacity
                  key={card.id}
                  style={[
                    styles.card,
                    card.isFlipped ? styles.cardFlipped : null,
                    card.isMatched ? styles.cardMatched : null,
                  ]}
                  onPress={() => flipCard(card.id)}
                  disabled={
                    card.isFlipped ||
                    card.isMatched ||
                    selectedCards.length === 2
                  }>
                  {card.isFlipped && !card.isMatched && (
                    <Text key={card.id} style={styles.cardText}>
                      {card.emoji}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Fragment>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    backgroundColor: 'black',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: windowWidth,
  },
  container: {
    height: windowHeight,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  gameBoard: {
    marginTop: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#eee',
    borderRadius: 5,
    width: 60,
    height: 60,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 40,
  },
  cardFlipped: {
    backgroundColor: '#fff',
  },
  cardMatched: {
    backgroundColor: '#8cff66',
  },
  resetButton: {
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'silver',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logoutButton: {
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'silver',
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default Main;
