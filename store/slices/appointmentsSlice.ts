import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { getDashboard } from '../../api/api.js'; // Assuming this path is correct

// Define a type for a single appointment
// Note: The actual structure of Appointment might need to align with what getDashboard returns.
// For now, we'll keep the existing Appointment interface.
interface Appointment {
  id: string; // Ensure the API provides an ID or generate one.
  date: string; 
  time: string;
  description: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'; 
  // Potentially add more fields based on API: partnerName, location, type, etc.
  partnerName?: string; 
  partnerImage?: string;
}

// Expected structure from getDashboard (simplified)
interface DashboardData {
  current_date?: Appointment; // A single current appointment
  upcoming_dates?: Appointment[]; // An array of upcoming appointments
  // other dashboard data like matches, etc.
}

interface AppointmentsState {
  appointments: Appointment[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AppointmentsState = {
  appointments: [],
  loading: 'idle',
  error: null,
};

// Async thunk for fetching appointments from the dashboard endpoint
export const fetchAppointments = createAsyncThunk<
  Appointment[], // Return type of the thunk's payload
  void,           // Argument type (void for no argument)
  { rejectValue: string } // Type for rejectWithValue
>(
  'appointments/fetchAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDashboard();
      const data: DashboardData = response.data; // Assuming response.data is DashboardData
      
      let fetchedAppointments: Appointment[] = [];
      if (data.current_date) {
        // Ensure current_date has an id, or generate one if not provided by API
        const currentAppointment = { ...data.current_date, id: data.current_date.id || `current-${Date.now()}` };
        fetchedAppointments.push(currentAppointment);
      }
      if (data.upcoming_dates && Array.isArray(data.upcoming_dates)) {
        // Ensure upcoming_dates have ids
        const upcomingWithIds = data.upcoming_dates.map((appt, index) => ({
          ...appt,
          id: appt.id || `upcoming-${Date.now()}-${index}`,
        }));
        fetchedAppointments = [...fetchedAppointments, ...upcomingWithIds];
      }
      return fetchedAppointments;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch appointments');
    }
  }
);

export const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    // addAppointment and updateAppointmentStatus can remain for synchronous updates
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      // Ensure the new appointment has an ID
      const newAppointment = { ...action.payload, id: action.payload.id || `manual-${Date.now()}`};
      state.appointments.push(newAppointment);
    },
    updateAppointmentStatus: (state, action: PayloadAction<{ id: string; status: Appointment['status'] }>) => {
      const index = state.appointments.findIndex(appt => appt.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index].status = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
        state.loading = 'succeeded';
        state.appointments = action.payload; // Replace with fetched appointments
        state.error = null;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload ?? 'Failed to fetch appointments';
      });
  },
});

export const { 
  addAppointment, 
  updateAppointmentStatus, 
  // setLoading, setError, setAppointments are removed as thunk handles this
} = appointmentsSlice.actions;

// Selector to get the appointments state
export const selectAppointments = (state: RootState) => state.appointments.appointments;
export const selectAppointmentsLoading = (state: RootState) => state.appointments.loading;
export const selectAppointmentsError = (state: RootState) => state.appointments.error;

export default appointmentsSlice.reducer;
