import React, { useState } from "react";
import { Modal, TouchableOpacity, TextInput, View, Text, StyleSheet } from "react-native";
import StyledButton from "../components/StyledButton";

interface BioModalProps {
  isVisible: boolean;
  bio: string;
  onClose: () => void;
  onSave: (bio: string) => void;
}

const BioModal: React.FC<BioModalProps> = ({ isVisible, bio, onClose, onSave }) => {
  const [tempBio, setTempBio] = useState(bio);

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Bio</Text>
          <TextInput
            style={styles.textInput}
            value={tempBio}
            onChangeText={setTempBio}
            multiline
            numberOfLines={6}
            placeholder="Write something about yourself..."
          />
          <View style={styles.buttonContainer}>
            <StyledButton onPress={() => { onSave(tempBio); onClose(); }} title="Save" />
            <StyledButton onPress={onClose} title="Cancel" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  textInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default BioModal;
