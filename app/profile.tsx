import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ScrollView, Text, View } from "react-native";
import { ProfileData } from "../types";
import { getProfile } from "../api/api";
import ProfileImage from "../components/ProfileImage";
import ProfileDetailItem from "../components/ProfileDetailItem";
import InterestList from "../components/InterestList";
import GraphItem from "../components/GraphItem";
import AstrologicalItem from "../components/AstrologicalItem";

export default function ProfileSummaryScreen() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getProfile();
        console.log("Fetched Profile Data:", data);
        setProfileData(data);  // Temporarily set the whole data to state
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!profileData) {
    return <Text>No profile data available.</Text>;
  }

  const {
    name = "N/A",
    surname = "N/A",
    bio = "No bio available",
    country = "Unknown",
    dob = "Unknown",
    gender = "Unknown",
    height = "Unknown",
    job = "Unknown",
    study = "Unknown",
    mainPicture,
    additionalPictures = [],
    interests = {},
    personalityProfile = {
      openness: 0,
      conscientiousness: 0,
      extraversion: 0,
      agreeableness: 0,
      neuroticism: 0,
    },
    astrologicalProfile = {
      sunSign: "Unknown",
      moonSign: "Unknown",
      ascendant: "Unknown",
      venusPosition: "Unknown",
      marsPosition: "Unknown",
      birthTime: "Unknown",
      latitude: 0,
      longitude: 0,
    },
  } = profileData || {};

  return (
    <Container>
      <ScrollView>
        <ProfileCard>
          <ProfileImage
            uri={mainPicture || "https://via.placeholder.com/150"}
            size={150}
          />
          <ProfileDetails>
            <ProfileDetailItem label="Name" value={`${name} ${surname}`} />
            <ProfileDetailItem label="Height" value={height} />
            <ProfileDetailItem label="Job" value={job} />
            <ProfileDetailItem label="Study" value={study} />
            <ProfileDetailItem label="Bio" value={bio} />
            <ProfileDetailItem label="Country" value={country} />
            <ProfileDetailItem label="Gender" value={gender} />
            <ProfileDetailItem label="Date of Birth" value={dob} />
          </ProfileDetails>
          <AdditionalPictures>
            {additionalPictures.map((picture, index) => (
              <ProfileImage
                key={index}
                uri={picture || "https://via.placeholder.com/100"}
                size={100}
              />
            ))}
          </AdditionalPictures>
          <SectionTitle>Interests</SectionTitle>
          <InterestList interests={interests} />
          <SectionTitle>Personality Profile</SectionTitle>
          <PersonalityGraph>
            <GraphItem label="Openness" value={personalityProfile.openness || 0} />
            <GraphItem
              label="Conscientiousness"
              value={personalityProfile.conscientiousness || 0}
            />
            <GraphItem
              label="Extraversion"
              value={personalityProfile.extraversion || 0}
            />
            <GraphItem
              label="Agreeableness"
              value={personalityProfile.agreeableness || 0}
            />
            <GraphItem
              label="Neuroticism"
              value={personalityProfile.neuroticism || 0}
            />
          </PersonalityGraph>
          <SectionTitle>Astrological Profile</SectionTitle>
          <AstrologicalDetails>
            <AstrologicalItem
              label="Sun Sign"
              value={astrologicalProfile.sunSign || "Unknown"}
            />
            <AstrologicalItem
              label="Moon Sign"
              value={astrologicalProfile.moonSign || "Unknown"}
            />
            <AstrologicalItem
              label="Ascendant"
              value={astrologicalProfile.ascendant || "Unknown"}
            />
            <AstrologicalItem
              label="Venus Position"
              value={astrologicalProfile.venusPosition || "Unknown"}
            />
            <AstrologicalItem
              label="Mars Position"
              value={astrologicalProfile.marsPosition || "Unknown"}
            />
            <AstrologicalItem
              label="Birth Time"
              value={astrologicalProfile.birthTime || "Unknown"}
            />
            <AstrologicalItem
              label="Latitude"
              value={astrologicalProfile.latitude?.toString() || "Unknown"}
            />
            <AstrologicalItem
              label="Longitude"
              value={astrologicalProfile.longitude?.toString() || "Unknown"}
            />
          </AstrologicalDetails>
        </ProfileCard>
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
`;

const ProfileCard = styled.View`
  background-color: ${(props) => props.theme.colors.cardBackground};
  border-radius: 10px;
  padding: 20px;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileDetails = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

const AdditionalPictures = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin: 20px 0 10px;
  align-self: flex-start;
`;

const PersonalityGraph = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

const AstrologicalDetails = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;
