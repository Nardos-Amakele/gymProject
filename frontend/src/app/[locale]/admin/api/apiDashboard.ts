import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getDashboardAttendanceData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/dashboard/attendanceData`);
      return response.data;
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      throw error;
    }
  };
  