import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "stretch",
    justifyContent: "flex-start",
    fontWeight: "bold",
    padding: 25,
  },
  playerList: {
    width: "100%",
  },
  overlayContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  overlay: {
    width: "85%",
    height: "90%",
  },
  title: {
    alignSelf: "flex-start",
    color: "#283744",
    paddingBottom: 15,
    paddingTop: 15,
  },
});
