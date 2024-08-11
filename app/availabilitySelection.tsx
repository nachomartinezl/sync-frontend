import React, { useState } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { useRouter, useGlobalSearchParams } from "expo-router";
import { Day, TimeSlot } from "../types";
import { acceptMatchAndSendAvailability } from "../api/api";
import DayCircle from "../components/DayCircle";
import ToggleButton from "../components/ToggleButton";
import SubmitButton from "../components/SubmitButton";

const daysOfWeek: { label: string; value: Day }[] = [
  { label: "M", value: "Monday" },
  { label: "T", value: "Tuesday" },
  { label: "W", value: "Wednesday" },
  { label: "T", value: "Thursday" },
  { label: "F", value: "Friday" },
  { label: "S", value: "Saturday" },
  { label: "S", value: "Sunday" },
];

const timeSlots: TimeSlot[] = ["Morning", "Afternoon", "Evening", "Night"];

export default function AvailabilitySelectionScreen() {
  const router = useRouter();
  const { matchId } = useGlobalSearchParams();
  const [selectedDays, setSelectedDays] = useState<Day[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<Record<Day, TimeSlot[]>>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  const toggleDay = (dayValue: Day) => {
    setSelectedDays((prev) => {
      if (prev.includes(dayValue)) {
        const updatedTimes = { ...selectedTimes };
        delete updatedTimes[dayValue];
        setSelectedTimes(updatedTimes);
        return prev.filter((day) => day !== dayValue);
      } else {
        return [...prev, dayValue];
      }
    });
  };

  const toggleTime = (dayValue: Day, time: TimeSlot) => {
    setSelectedTimes((prev) => ({
      ...prev,
      [dayValue]: prev[dayValue]?.includes(time)
        ? prev[dayValue]?.filter((t) => t !== time)
        : [...(prev[dayValue] || []), time],
    }));
  };

  const handleSubmit = async () => {
    const availability = selectedDays.reduce((acc, day) => {
      if (selectedTimes[day] && selectedTimes[day]?.length > 0) {
        acc[day] = selectedTimes[day];
      }
      return acc;
    }, {} as Record<Day, TimeSlot[]>);

    if (Object.keys(availability).length === 0) {
      Alert.alert(
        "Incomplete Selection",
        "Please select both days and time slots."
      );
      return;
    }

    try {
      await acceptMatchAndSendAvailability(matchId as string, availability);
      Alert.alert("Availability Saved", `Your availability has been saved.`);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving availability:", error);
      Alert.alert(
        "Error",
        "There was a problem saving your availability. Please try again."
      );
    }
  };

  return (
    <Container>
      <Title>Edit Your Schedule</Title>

      <SectionTitle>Days Active</SectionTitle>
      <DaysContainer>
        {daysOfWeek.map((day, index) => (
          <DayCircle
            key={index}
            label={day.label}
            selected={selectedDays.includes(day.value)}
            onPress={() => toggleDay(day.value)}
          />
        ))}
      </DaysContainer>

      {selectedDays.map((day, index) => (
        <React.Fragment key={index}>
          <SectionTitle>{day} - Time of the Day</SectionTitle>
          <SelectionContainer>
            {timeSlots.map((time) => (
              <ToggleButton
                key={time}
                label={time}
                selected={selectedTimes[day]?.includes(time)}
                onPress={() => toggleTime(day, time)}
              />
            ))}
          </SelectionContainer>
        </React.Fragment>
      ))}

      <SubmitButton onPress={handleSubmit} label="Submit" />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 20px;
  text-align: center;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin-top: 20px;
  margin-bottom: 10px;
`;

const DaysContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const SelectionContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
`;
