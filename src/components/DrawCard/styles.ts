import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  Card: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  TypeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  PlayerName: {
    fontSize: 16,
  },
  typeName: {
    fontSize: 16,
    minWidth: "30%",
    marginLeft: 10,
  },
  TypeIcon: {
    width: 50,
    height: 50,
    //marginRight: 10,
  },
});
