

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const employeeData = [
  {
    id: 1,
    name: "John Doe",
    position: "Software Engineer",
    department: "Engineering",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Graphic Designer",
    department: "Design",
    email: "jane.smith@example.com",
  },
  {
    id: 3,
    name: "John Doe",
    position: "Software Engineer",
    department: "Engineering",
    email: "john.doe@example.com",
  },
  {
    id: 4,
    name: "Jane Smith",
    position: "Graphic Designer",
    department: "Design",
    email: "jane.smith@example.com",
  },
  // Add more employee objects as needed
];

const InfoCard =()=> {
  return (
    <>
      {employeeData.map((employee) => (
        <Card key={employee.id} sx={{ width:'23%' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {employee.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {employee.position}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Department: {employee.department}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {employee.email}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default InfoCard;

