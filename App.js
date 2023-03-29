import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import { useState } from "react";
import Colors from "./contants/colors";
import GameOverScreen from "./screens/GameOverScreen";

const getScreen = (userNumber, onConfirmNumber, gameIsOver, goToGameOver) => {
  if (gameIsOver) {
    return <GameOverScreen />;
  }
  if (userNumber) {
    return <GameScreen userNumber={userNumber} goToGameOver={goToGameOver} />;
  }
  return <StartGameScreen onConfirmNumber={onConfirmNumber} />;
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(false);

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/images/background-image.jpg")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>
          {getScreen(userNumber, pickedNumberHandler, gameIsOver, () =>
            setGameIsOver(true)
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
