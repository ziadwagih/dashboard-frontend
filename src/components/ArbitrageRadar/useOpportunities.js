import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

export const useOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [missedProfit, setMissedProfit] = useState(0);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const getToken = () => {
    try {
      const stored = localStorage.getItem("token");
      const parsed = JSON.parse(stored); // { token: "..." }
      return parsed?.token;
    } catch (e) {
      return null;
    }
  };

  const fetchWithAuth = async (url) => {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.get(url, { headers });
  };

  const processData = (data) => {
    if (!Array.isArray(data)) {
      console.warn("⚠️ Invalid data format:", data);
      return [];
    }
    return data;
  };

  const fetchOpportunities = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchWithAuth(`${API_URL}/api/arbitrage`);
      const cleaned = processData(res.data);
      setOpportunities(cleaned);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("❌ Error fetching arbitrage data:", err.response?.data || err.message);
      setOpportunities([]);
      setError("Failed to load arbitrage data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    const socket = io(API_URL, {
      auth: {
        token: token ? `Bearer ${token}` : null,
      },
    });

    fetchOpportunities();

    socket.on("newArbitrage", (newOpportunity) => {
      if (!newOpportunity) return;
      setOpportunities((prev) => [newOpportunity, ...prev.slice(0, 19)]);
      setMissedProfit((prev) => prev + parseFloat(newOpportunity.profit || 0));
      setLastUpdated(new Date());
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });

    return () => socket.disconnect();
  }, []);

  const refreshManually = async () => {
    try {
      const res = await fetchWithAuth(`${API_URL}/api/arbitrage`);
      const cleaned = processData(res.data);
      setOpportunities(cleaned);
      setMissedProfit(0);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("❌ Manual refresh failed:", err.message);
      setOpportunities([]);
      setError("Manual refresh error");
    }
  };

  return {
    opportunities,
    loading,
    error,
    missedProfit,
    lastUpdated,
    refreshManually,
  };
};
