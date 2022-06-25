import { Alert, SafeAreaView, StyleSheet } from "react-native";
import { Button, Card, Input } from "@rneui/base";
import { useStopwatch } from "react-timer-hook";
import { useState } from "react";

export default function TimeTrackerScreen({ navigation, onAddTime }) {
  const [status, setStatus] = useState("READY");
  const [inputValue, setInputValue] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const { seconds, minutes, hours, days, start, pause, reset } = useStopwatch({
    autoStart: false,
    offsetTimestamp: new Date()
  });

  const onStart = () => {
    start();
    setStatus("WORKING");
    setStartTime(new Date());
  };

  const onPause = () => {
    setStatus("PAUSED");
    pause();
  };

  const onResume = () => {
    setStatus("WORKING");
    start();
  };

  const onStop = () => {
    setStatus("STOPPED");
    pause();
    setEndTime(new Date());
  };

  const onReset = () => {
    reset(new Date(), false);
    setStatus("READY");
    setStartTime(null);
    setEndTime(null);
    setInputValue("");
  };

  const onSubmit = () => {
    const newTime = {
      id: Date.now(),
      title: inputValue,
      startTime,
      endTime,
      totalTime: seconds + minutes * 60 + hours * 60 * 60 + days * 60 * 60 * 24
    };
    Alert.alert(JSON.stringify(newTime));

    onAddTime(newTime);

    navigation.navigate("Time List");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Card containerStyle={styles.tracker}>
          <Card.Title h1>Time Tracker</Card.Title>
          <Card.Title style={styles.text}>
            {days}:{hours}:{minutes}:{seconds}
          </Card.Title>
          {status === "STOPPED" && (
            <Input
              value={inputValue}
              onChangeText={text => setInputValue(text)}
            ></Input>
          )}
        </Card>
        <Card.Divider />

        {status === "READY" && (
          <Button buttonStyle={styles.button} onPress={onStart}>
            Start
          </Button>
        )}
        {["WORKING", "PAUSED"].includes(status) && (
          <Button buttonStyle={styles.button} onPress={onStop}>
            Stop
          </Button>
        )}
        {status === "WORKING" && (
          <Button buttonStyle={styles.thirdButton} onPress={onPause}>
            Pause
          </Button>
        )}
        {status === "PAUSED" && (
          <Button buttonStyle={styles.thirdButton} onPress={onResume}>
            Resume
          </Button>
        )}
        {status === "STOPPED" && (
          <Button
            buttonStyle={styles.button}
            onPress={onSubmit}
            disabled={!inputValue}
          >
            Save
          </Button>
        )}
        <Button buttonStyle={styles.secondButton} onPress={onReset}>
          Reset
        </Button>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    backgroundColor: "#F3E5F5",
    flex: 1
  },
  button: {
    backgroundColor: "#AB47BC"
  },
  secondButton: {
    backgroundColor: "#5E35B1"
  },
  thirdButton: {
    backgroundColor: "#B39DDB"
  },
  tracker: {
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: "#F3E5F5"
  }
});
