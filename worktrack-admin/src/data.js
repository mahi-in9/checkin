export const employees = [
  { id: 1, name: "Rahul Sharma", dept: "Engineering", checkIn: "09:02 AM", checkOut: "06:10 PM", hours: "9h 08m", location: "Noida", ip: "192.168.1.24", status: "Checked In", color: "#0f766e" },
  { id: 2, name: "Priya Verma", dept: "Marketing", checkIn: "09:15 AM", checkOut: "06:05 PM", hours: "8h 50m", location: "Gurgaon", ip: "192.168.1.37", status: "Checked Out", color: "#9333ea" },
  { id: 3, name: "Amit Kumar", dept: "Sales", checkIn: "09:28 AM", checkOut: "-", hours: "-", location: "Delhi", ip: "192.168.1.52", status: "Absent", color: "#b45309" },
  { id: 4, name: "Sneha Gupta", dept: "HR", checkIn: "08:55 AM", checkOut: "05:45 PM", hours: "8h 50m", location: "Noida", ip: "192.168.1.18", status: "Checked Out", color: "#be185d" },
  { id: 5, name: "Vikram Singh", dept: "Product", checkIn: "09:10 AM", checkOut: "-", hours: "-", location: "Bangalore", ip: "192.168.1.73", status: "Checked In", color: "#1d4ed8" },
];

export const departments = ["All Departments", "Engineering", "Marketing", "Sales", "HR", "Product"];

export const stats = {
  total: 120,
  checkedIn: 96,
  checkedOut: 41,
  absent: 24,
};

export const initials = (name) =>
  name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
