import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import { useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Colors from "./contants/colors";
import GameOverScreen from "./screens/GameOverScreen";

const getScreen = (
  userNumber,
  onConfirmNumber,
  gameIsOver,
  goToGameOver,
  roundsNumber,
  onStartNewGame,
  handleAddRound
) => {
  if (gameIsOver) {
    return (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={roundsNumber}
        onStartNewGame={onStartNewGame}
      />
    );
  }
  if (userNumber) {
    return (
      <GameScreen
        userNumber={userNumber}
        goToGameOver={goToGameOver}
        onAddRound={handleAddRound}
      />
    );
  }
  return <StartGameScreen onConfirmNumber={onConfirmNumber} />;
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(false);
  const [roundsNumber, setRoundsNumber] = useState(1);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
  }

  function handleStartNewGame() {
    setUserNumber(0);
    setGameIsOver(false);
  }

  function handleAddRound() {
    setRoundsNumber((prevRound) => prevRound + 1);
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>
          {getScreen(
            userNumber,
            pickedNumberHandler,
            gameIsOver,
            () => setGameIsOver(true),
            roundsNumber,
            handleStartNewGame,
            handleAddRound
          )}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
