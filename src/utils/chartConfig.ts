import {
  Chart as ChartJS,
  ArcElement,   // ✅ REQUIRED for Pie
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  ArcElement,   // ✅ add this
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);