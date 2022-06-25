import { useState } from "react";
import TimeListScreen from "./src/components/TimeListScreen";
import TimeTrackerScreen from "./src/components/TimeTrackerScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  const [timeList, setTimeList] = useState([]);

  const onDeleteTime = id => setTimeList(prev => prev.filter(i => i.id !== id));

  const onAddTime = newTime => setTimeList(timeList.concat(newTime));

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Time List">
          {props => (
            <TimeListScreen
              {...props}
              timeList={timeList}
              onDeleteTime={onDeleteTime}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Time Tracker">
          {props => <TimeTrackerScreen {...props} onAddTime={onAddTime} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
