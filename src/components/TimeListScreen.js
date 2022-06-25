import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "@rneui/base";

export default function TimeListScreen({ navigation, timeList, onDeleteTime }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <Card>
          <Card.Title h2 className="title">
            Your tracked time
          </Card.Title>
          <Button
            buttonStyle={styles.button}
            onPress={() => navigation.navigate("Time Tracker")}
          >
            Track
          </Button>
        </Card>
      </View>
      <ScrollView>
        {timeList.length ? (
          timeList.map(
            ({ id, title, startTime, endTime, totalTime }, index) => (
              <Card key={id} containerStyle={styles.listItem}>
                <Card.Title h3>
                  {index + 1}) {title}
                </Card.Title>
                <Card.Divider />
                <Text style={styles.text}>
                  START: {startTime.toLocaleString()}
                </Text>
                <Text style={styles.text}>END: {endTime.toLocaleString()}</Text>
                <Text style={styles.text}>TOTAL(SEC): {totalTime}</Text>
                <Button
                  buttonStyle={styles.secondButton}
                  onPress={() => onDeleteTime(id)}
                >
                  Delete
                </Button>
              </Card>
            )
          )
        ) : (
          <Card key={"0"} style={{ borderRadius: "10px" }}>
            <Card.Title h3>Track your first time :)</Card.Title>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3E5F5",
    flex: 1
  },
  container2: {
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderColor: "#AB47BC",
    paddingBottom: 10
  },
  button: {
    backgroundColor: "#AB47BC"
  },
  secondButton: {
    backgroundColor: "#5E35B1",
    marginTop: 20
  },
  listItem: { borderRadius: 20 },
  text: { fontSize: 20 }
});
