import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { getProfile, updateProfile } from '../../api/api.js'; // Assuming this path is correct

// Define a type for the profile data returned by the API
interface ApiProfileData {
  name?: string;
  bio?: string;
  preference?: string;
  mainPicture?: string;
  // Add other fields that your API returns for a profile
}

interface UserProfileState {
  name: string | null;
  bio: string | null;
  preference: string | null;
  mainPicture: string | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserProfileState = {
  name: null,
  bio: null,
  preference: null,
  mainPicture: null,
  loading: 'idle',
  error: null,
};

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk<ApiProfileData, void, { rejectValue: string }>(
  'userProfile/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfile();
      return response.data; // Assuming API returns data in response.data
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch profile');
    }
  }
);

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk<ApiProfileData, Partial<ApiProfileData>, { rejectValue: string }>(
  'userProfile/updateUserProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await updateProfile(profileData);
      return response.data; // Assuming API returns data in response.data
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update profile');
    }
  }
);

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<Partial<UserProfileState>>) => {
      Object.assign(state, action.payload);
    },
    // setLoading and setError can be removed if only managed by thunks, or kept for synchronous updates
    // For this example, let's assume thunks will primarily manage loading/error states for async operations
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<ApiProfileData>) => {
        state.loading = 'succeeded';
        // Assuming action.payload directly contains the profile fields
        state.name = action.payload.name ?? state.name;
        state.bio = action.payload.bio ?? state.bio;
        state.preference = action.payload.preference ?? state.preference;
        state.mainPicture = action.payload.mainPicture ?? state.mainPicture;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload ?? 'Failed to fetch profile';
      })
      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<ApiProfileData>) => {
        state.loading = 'succeeded';
        // Assuming action.payload contains the updated profile fields
        state.name = action.payload.name ?? state.name;
        state.bio = action.payload.bio ?? state.bio;
        state.preference = action.payload.preference ?? state.preference;
        state.mainPicture = action.payload.mainPicture ?? state.mainPicture;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload ?? 'Failed to update profile';
      });
  },
});

export const { setProfileData } = userProfileSlice.actions; // Removed setLoading, setError if thunks manage them

// Selector to get the user profile state
export const selectUserProfile = (state: RootState) => state.userProfile;

export default userProfileSlice.reducer;
